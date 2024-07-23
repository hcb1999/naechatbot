import React from 'react';
import {View, Dimensions, Linking} from 'react-native';
import {WebView} from 'react-native-webview';

const KakaoMap = ({kakaoCoords, toggleValue}) => {
  const kakaoApiKey = '59dbf603dc1c860679e7431a0b7b938d'; // 실제 카카오 API 키로 교체하세요
  console.log(kakaoCoords);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Kakao Map</title>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services&autoload=false"></script>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        #map {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      </style>
    </head>
    <body>
      <div id="map" style="width:100%;height:100%;"></div>
      <script>
        function log(message) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'log', message }));
        }

        function openLink(url) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'openLink', url }));
        }

        document.addEventListener("DOMContentLoaded", function() {
          log('DOMContentLoaded event fired');
          kakao.maps.load(function() {
            log('Kakao maps loaded');
            var mapContainer = document.getElementById('map');
            var mapOption = { 
              center: new kakao.maps.LatLng(${kakaoCoords[0].lat}, ${
    kakaoCoords[0].lng
  }),
              level: 3 
            };
            var map = new kakao.maps.Map(mapContainer, mapOption);
            var bounds = new kakao.maps.LatLngBounds();

            ${kakaoCoords
              .map(
                (coord, index) => `
              var position = new kakao.maps.LatLng(${coord.lat}, ${coord.lng});
              var markerImage = new kakao.maps.MarkerImage(
                '${
                  toggleValue
                    ? 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
                    : 'https://t1.daumcdn.net/mapjsapi/images/marker.png'
                }',
                new kakao.maps.Size(50, 70),
                new kakao.maps.Point(60, 160)
              );
              var marker = new kakao.maps.Marker({
                map: map,
                position: position,
                image: markerImage
              });

              var naverLink = '${coord.link}';
              var content = '<div onclick="openLink(\\"' + naverLink + '\\")" style="padding:10px; background-color: white; border: 1px solid black; border-radius: 50px; font-size: 20px; cursor: pointer;">${
                index + 1
              }</div>';
              var overlay = new kakao.maps.CustomOverlay({
                content: content,
                position: position,
                yAnchor: 1.4
              });
              overlay.setMap(map);

              bounds.extend(position);
            `,
              )
              .join('')}
            
            map.setBounds(bounds);
            log('Map initialized');
          });
        });
      </script>
    </body>
    </html>
  `;

  const onMessage = event => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'openLink' && message.url) {
        Linking.openURL(message.url);
      }
    } catch (error) {
      console.error('Failed to parse message from WebView:', error);
    }
  };

  return (
    <View style={{height: 350, borderRadius: 30, overflow: 'hidden'}}>
      <WebView
        originWhitelist={['*']}
        source={{html: htmlContent}}
        javaScriptEnabled={true}
        onMessage={onMessage}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
      />
    </View>
  );
};

export default KakaoMap;

import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';
import Markdown from 'react-native-markdown-display';
import KakaoMap from '../components/KakaoMap';

const {width} = Dimensions.get('window');

const GeminiCustomMessage = props => {
  const {currentMessage, user} = props;
  const {text, map} = currentMessage;
  const toggleValue = false;
  let pCheck = true;

  const parseLocationLink = text => {
    const naverRegex = /\(https:\/\/map\.naver\.com\/p\/entry\/place\/(\d+)\)/g;
    const kakaoRegex =
      /https:\/\/map\.kakao\.com\/link\/to\/([^,]+),(\d+\.\d+),(\d+\.\d+)/g;
    let match;
    let newText = text;
    const kakaoCoords = [];

    while ((match = naverRegex.exec(text)) !== null) {
      const placeId = match[1];
      const giftLink = pCheck
        ? '[선물하기](https://shopuser-dev.naegift.com/41)'
        : '';
      pCheck = false;
      const naverMapLink = `(https://map.naver.com/p/entry/place/${placeId})`;
      newText = newText.replace(match[0], `${naverMapLink} ${giftLink}`);
    }

    while ((match = kakaoRegex.exec(text)) !== null) {
      const placeName = match[1];
      const lat = parseFloat(match[2]);
      const lng = parseFloat(match[3]);
      const link = `https://map.kakao.com/link/to/${placeName},${lat},${lng}`;
      kakaoCoords.push({lat, lng, link});
    }

    return {newText, kakaoCoords};
  };

  const {newText, kakaoCoords} = parseLocationLink(text);

  if (currentMessage.user._id === 1) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084ff',
            padding: 10,
            marginRight: 10,
            borderTopRightRadius: 0,
            borderRadius: 30,
          },
        }}
        textStyle={{right: styles.fontFamilyStyle}} // 폰트 패밀리 스타일 적용
      />
    );
  }

  return (
    <View style={styles.container}>
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 5,
            width: width - 20,
            marginLeft: 10,
            color: '#fff',
          },
        }}
        textStyle={{
          left: {
            color: '#fff',
          },
        }}
        renderMessageText={() => (
          <View style={styles.messageTextContainer}>
            <Markdown
              style={{
                body: {color: '#000'},
                link: {color: 'blue'},
                text: {fontSize: 16},
              }}>
              {newText}
            </Markdown>
            {map && kakaoCoords.length > 0 && (
              <View
                style={{
                  height: 350,
                  marginTop: 10,
                  marginBottom: 15,
                }}>
                <KakaoMap kakaoCoords={kakaoCoords} toggleValue={toggleValue} />
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    width: width,
  },
  messageTextContainer: {
    width: '100%',
    fontSize: 18,
  },
  fontFamilyStyle: {
    fontFamily: 'MinSans-Regular', // 원하는 폰트 패밀리로 수정
  },
});

export default GeminiCustomMessage;

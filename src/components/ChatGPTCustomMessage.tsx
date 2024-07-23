import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';
import Markdown from 'react-native-markdown-display';
import KakaoMap from './KakaoMap';

const CustomMessage = props => {
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

  return (
    <View style={styles.container}>
      {currentMessage.user._id !== user._id && (
        <Image source={currentMessage.user.avatar} style={styles.avatar} />
      )}
      <View style={styles.bubbleContainer}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#808080',
            },
            left: {
              backgroundColor: '#000',
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
            left: {
              color: '#fff',
            },
          }}
          renderMessageText={() => (
            <>
              <Markdown style={{body: {color: 'white'}, link: {color: 'blue'}}}>
                {newText}
              </Markdown>
              {map && kakaoCoords.length > 0 && (
                <View style={{height: 350, marginTop: 10, marginBottom: 10}}>
                  <KakaoMap
                    kakaoCoords={kakaoCoords}
                    toggleValue={toggleValue}
                  />
                </View>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 5,
    marginLeft: 20,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  bubbleContainer: {
    flex: 1,
    marginLeft: 10, // 왼쪽 여백
  },
});

export default CustomMessage;

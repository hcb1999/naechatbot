import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';

interface TypingTextProps {
  text: string;
  speed?: number;
}

const TypingText: React.FC<TypingTextProps> = ({text, speed = 50}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(prev => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <View>
      <Image
        source={require('../../public/naegift_ko_logo.png')}
        //style={styles.icon}
      />
      <Text style={styles.text}>{displayedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    // marginRight: 8, // 아이콘과 텍스트 사이의 여백
  },
  text: {
    paddingHorizontal: 12, // 좌우 패딩 추가
  },
});

export default TypingText;

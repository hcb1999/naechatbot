import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
  Dimensions,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import {getLocation} from './src/utils/getGeolocation';
//리액트 네이티브 언어로 웹 플랫폼에서 실행
const TypingBubble = props => {
  const {text, user} = props.currentMessage;

  // 링크를 포함한 텍스트를 파싱하여 반환하는 함수
  const parseLocationLink = text => {
    const regex =
      /\[지도 보기\]\(https:\/\/www\.google\.com\/maps\?q=([\d.]+),([\d.]+)&z=15\)/g;
    let match;
    let elements = [];

    let lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      const beforeText = text.slice(lastIndex, match.index);
      if (beforeText) {
        elements.push(<Text key={`text-${lastIndex}`}>{beforeText}</Text>);
      }

      const latitude = match[1];
      const longitude = match[2];
      const title = props.currentMessage.user.name; // 가게 이름을 여기서 사용
      const naverMapLink = `https://map.naver.com?lng=${longitude}&lat=${latitude}&title=${title}`;

      elements.push(
        <TouchableOpacity
          key={`link-${match.index}`}
          onPress={() => Linking.openURL(naverMapLink)}>
          <Text style={{color: 'blue'}}>네이버 지도 보기</Text>
        </TouchableOpacity>,
        <TouchableOpacity
          key={`link-${match.index}`}
          onPress={() =>
            Linking.openURL('https://shopuser-dev.naegift.com/41')
          }>
          <Text style={{color: 'blue'}}>내기프트 </Text>
        </TouchableOpacity>,
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(
        <Text key={`text-${lastIndex}`}>{text.slice(lastIndex)}</Text>,
      );
    }

    return elements;
  };
  //유저 아이디가 나 자신(1)일떄 아닐떄 구분
  if (user._id === 1) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084ff',
          },
        }}
      />
    );
  }

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        },
      }}
      renderMessageText={() => <Text>{parseLocationLink(text)}</Text>}
    />
  );
};

export function App() {
  const [messages, setMessages] = useState([]);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '안녕하세요? 어떤 도움이 필요하신가요?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support Bot',
        },
      },
    ]);
  }, []);
  //스트림 데이터를 기존에 채팅 메시지에 갱신시키는 함수
  const updatePartialOutput = (messageId, newText) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg._id === messageId ? {...msg, text: msg.text + newText} : msg,
      ),
    );
  };
  //GiftedChat라이브러리 질문할떄 쓰는 이벤트 핸들러
  const onSend = useCallback(async (newMessages = []) => {
    if (newMessages.length > 0) {
      const newMessage = newMessages[0];
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      try {
        const response = await fetch(
          'https://chat-dev.naegift.com/chat/receive-stream',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              input_text: newMessage.text,
              lat: 37.4996,
              lon: 126.885,
            }),
          },
        );
        console.log(response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = '';

        const newStreamMessageId = Math.random().toString(36).substring(7);
        const initialMessage = {
          _id: newStreamMessageId,
          text: '',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Support Bot',
          },
        };

        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, [initialMessage]),
        );

        function readStream() {
          reader.read().then(({done, value}) => {
            if (done) {
              return;
            }

            const textChunk = decoder.decode(value, {stream: true});
            updatePartialOutput(newStreamMessageId, textChunk);

            readStream();
          });
        }

        readStream();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <View style={[styles.container, {width, height}]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={props => <TypingBubble {...props} />}
        renderInputToolbar={props => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
});

export default App;

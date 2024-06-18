import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Text,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';
import axios from 'axios';
import {getLocation} from '../utils/getGeolocation';
import TypingText from '../components/TypingText';

const TypingBubble = (props: any) => {
  const {text, user} = props.currentMessage;

  // 내가 보낸 메시지일 경우 일반 텍스트로 표시
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

  // 상대방이 보낸 메시지일 경우 타이핑 효과 적용
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        },
      }}
      renderMessageText={() => <TypingText text={text} />}
    />
  );
};

export function TestScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const [location, setLocation] = useState<any>(null); // 기본 위치 설정
  const [output, setOutput] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '안녕하세요? 어떤 도움이 필요하신가요?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support Bot',
          //avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://chat-dev.naegift.com/chat/receive-stream',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              input_text: '고양시에 있는 카페 알려줘',
              lat: 37.4996,
              lon: 126.885,
            }),
          },
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('응답', response);

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          setOutput(reader.result as string);
        };
        reader.readAsText(blob);
      } catch (error) {
        console.log('에러:', error);
        setOutput('Error: ' + error.message);
      }
    };
    fetchData();
  }, []);
  const onSend = useCallback(
    async (newMessages = []) => {
      if (newMessages.length > 0) {
        const newMessage = newMessages[0];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );
        /*
        try {
          const response = await axios.post(
            'http://chat-dev.naegift.com/chat/receive-text',
            {
              input_text: newMessage.text,
              lat: location.latitude,
              lon: location.longitude,
            },
          );

          const receivedMessage = {
            _id: Math.random().toString(36).substring(7),
            text: response.data.output_text, // 서버에서 받은 응답 텍스트
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Support Bot',
              avatar: 'https://placeimg.com/140/140/any',
            },
          };

          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, receivedMessage),
          );
        } catch (error) {
          console.error('Error sending message:', error);
        }
        */
      }
    },
    [location],
  );

  return (
    <View style={styles.container}>
      <Text>테스트:{output}</Text>
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

export default TestScreen;

/**  <GiftedChat
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
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />} */

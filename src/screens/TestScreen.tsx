import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
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
    const fetchLocation = async () => {
      try {
        const loc = await getLocation();
        if (loc) {
          setLocation(loc);
        }
      } catch (error) {
        console.error('Failed to fetch location:', error);
        Alert.alert('Error', 'Failed to fetch location.');
      }
    };

    fetchLocation();
  }, []);

  const onSend = useCallback(
    async (newMessages = []) => {
      if (newMessages.length > 0) {
        const newMessage = newMessages[0];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );

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
      }
    },
    [location],
  );

  return (
    <View style={styles.container}>
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

export default TestScreen;

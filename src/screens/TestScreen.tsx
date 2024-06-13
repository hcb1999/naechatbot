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

interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: string | number;
    name: string;
    avatar?: string;
  };
}

interface ILocation {
  latitude: number;
  longitude: number;
}

export function TestScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [location, setLocation] = useState<ILocation | null>(null);

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
    async (newMessages: IMessage[] = []) => {
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
              lat: location?.latitude,
              lon: location?.longitude,
            },
          );

          const receivedMessage: IMessage = {
            _id: Math.random().toString(36).substring(7),
            text: response.data.output_text,
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
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#0084ff',
              },
            }}
          />
        )}
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

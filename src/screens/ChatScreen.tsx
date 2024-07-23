import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {getLocation} from '../utils/getGeolocation';
import ChatGPTCustomMessage from '../components/ChatGPTCustomMessage';
import GeminiCustomMessage from '../components/GeminiCustomMessage';
import Navbar from '../components/NavBar';
import CustomInputToolbar from '../components/CustomInputToolbar';

export const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const {width, height} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /*setMessages([
      {
        _id: 1,
        text: '안녕하세요 저는 경기챗이라고 합니다 경기지역화폐가 가능한 카페들을 소개해주고있어요 원하시는 카페 이름을 말해주세요!',
        user: {
          _id: 2,
          name: 'Support Bot',
          avatar: require('../../assets/chatgpt.png'), // 상대방 아바타 설정
        },
      },
    ]);
    */
  }, []);

  const updatePartialOutput = (messageId: string, newText: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg._id === messageId ? {...msg, text: msg.text + newText} : msg,
      ),
    );
  };

  const onSend = useCallback(async (newMessages = []) => {
    if (newMessages.length > 0) {
      const newMessage = newMessages[0];
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );
      const loc = await getLocation();
      console.log('위경도 데이터 받아오기:', loc);

      try {
        setIsLoading(true);

        const newStreamMessageId = Math.random().toString(36).substring(7);
        const initialMessage = {
          _id: newStreamMessageId,
          text: '',
          user: {
            _id: 2,
            name: 'Support Bot',
            avatar: require('../../assets/chatgpt.png'), // 상대방 아바타 설정
          },
          map: false,
        };

        setMessages(prevMessages =>
          GiftedChat.append(prevMessages, [initialMessage]),
        );

        const xhr = new XMLHttpRequest();
        xhr.open(
          'POST',
          'https://chat-test2.naegift.com/chat/receive-stream',
          true,
        );
        xhr.setRequestHeader('Content-Type', 'application/json');

        let previousTextLength = 0;
        let bufferedText = '';

        xhr.onprogress = () => {
          const newText = xhr.responseText.substring(previousTextLength);
          previousTextLength = xhr.responseText.length;
          bufferedText += newText;

          // 4글자씩 잘라서 처리
          while (bufferedText.length >= 4) {
            const chunk = bufferedText.substring(0, 4);
            bufferedText = bufferedText.substring(4);
            updatePartialOutput(newStreamMessageId, chunk);
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            // 남아있는 텍스트 처리
            if (bufferedText.length > 0) {
              updatePartialOutput(newStreamMessageId, bufferedText);
            }
            setIsLoading(false);

            // 스트리밍 완료 후 메시지의 map 플래그를 true로 설정
            setMessages(prevMessages =>
              prevMessages.map(msg =>
                msg._id === newStreamMessageId ? {...msg, map: true} : msg,
              ),
            );
          }
        };

        xhr.onerror = () => {
          console.error('XMLHttpRequest error');
          setIsLoading(false);
        };

        xhr.send(
          JSON.stringify({
            input_text: newMessage.text,
            lat: loc.latitude,
            lon: loc.longitude,
          }),
        );
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        onMenuPress={() => console.log('Menu pressed')}
        onSettingsPress={() => console.log('Settings pressed')}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderMessage={props => <GeminiCustomMessage {...props} />}
        renderInputToolbar={props =>
          !isLoading && (
            <CustomInputToolbar
              {...props}
              onSend={onSend}
              setMessages={setMessages}
              setIsLoading={setIsLoading}
              updatePartialOutput={updatePartialOutput}
            />
          )
        }
        listViewProps={{
          style: {
            flex: 1,
          },
          contentContainerStyle: {
            flexGrow: 1,
            justifyContent: 'flex-end',
          },
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 전체적인 배경색 검정색
  },
  inputToolbar: {
    borderTopWidth: 2,
    borderTopColor: '#e8e8e8',
  },
});

export default ChatScreen;

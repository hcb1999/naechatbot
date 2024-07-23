import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {getLocation} from '../utils/getGeolocation';

const CustomInputToolbar = ({
  onSend,
  setMessages,
  setIsLoading,
  isLoading,
  updatePartialOutput,
}) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
  const silenceTimeoutRef = useRef(null); // 무음 타이머를 참조하는 Ref

  useEffect(() => {
    setIsLoading(false);

    if (Platform.OS === 'android') {
      requestMicrophonePermission();
    }

    return () => {
      audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
    };
  }, []);

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleSend = () => {
    if (text.trim().length > 0) {
      const newStreamMessageId = Math.random().toString(36).substring(7);
      onSend([
        {
          _id: newStreamMessageId,
          text: text.trim(),
          user: {_id: 1},
          createdAt: new Date(),
        },
      ]);
      setText('');
    }
  };

  const startRecording = async () => {
    console.log('녹음 시작');
    setIsRecording(true);
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      silenceTimeoutRef.current = setTimeout(() => {
        stopRecording(); // 1초 동안 무음이면 녹음 중지
      }, 1000);
      return;
    });
  };

  const stopRecording = async () => {
    console.log('녹음 중지');
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current); // 무음 타이머 클리어
    }
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setIsRecording(false);
    processAudioMessage(result);
  };

  // 오디오 메시지 전송 및 처리 함수
  const processAudioMessage = async audioFilePath => {
    setIsLoading(true); // 녹음 시작 시 인풋창 숨기기
    const newStreamMessageId = Math.random().toString(36).substring(7);
    const newBotMessageId = Math.random().toString(36).substring(7); // 챗봇 메시지 ID 추가

    try {
      const location = await getLocation();
      if (!location) {
        throw new Error('Failed to get location');
      }

      const {latitude, longitude} = location;

      // 오디오 파일을 서버로 전송
      const formData = new FormData();
      formData.append('audio', {
        uri: 'file://' + audioFilePath,
        type: 'audio/wav',
        name: `audio_${new Date().toISOString()}.wav`,
      });
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const sttResponse = await fetch(
        'https://chat-test2.naegift.com/chat/stt',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!sttResponse.ok) {
        throw new Error('STT request failed');
      }

      const sttData = await sttResponse.json();
      const outputText =
        sttData.output_text || '음성 텍스트 데이터를 가져오지 못했습니다';

      // 음성 인식 결과를 사용자 메시지로 추가 (사용자 메시지와 챗봇 메시지를 모두 추가)
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: newStreamMessageId,
            text: outputText,
            createdAt: new Date(),
            user: {_id: 1},
          },
        ]),
      );

      // 챗봇 메시지를 사용자 메시지 밑에 추가
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: newBotMessageId, // 챗봇 메시지 추가
            text: '',
            user: {
              _id: 2,
              name: 'Support Bot',
              avatar:
                'https://play-lh.googleusercontent.com/vc6gUy1Ef7v6ExzpLCZYalRZf0e6W_tHwO_XJmb-IToN0Er6jAZ5bC1z3tQrhrvKRHV9=w240-h480-rw',
            },
          },
        ]),
      );

      // 음성 인식 결과를 바탕으로 채팅 서버로 요청 전송
      const chatFormData = new FormData();
      chatFormData.append('audio', {
        uri: 'file://' + audioFilePath,
        type: 'audio/wav',
        name: `audio_${new Date().toISOString()}.wav`,
      });
      chatFormData.append('latitude', latitude);
      chatFormData.append('longitude', longitude);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://chat-test2.naegift.com/chat/upload', true);
      xhr.setRequestHeader(
        'Content-Type',
        'multipart/form-data; boundary=----WebKitFormBoundaryjT0jOESnSABs0DfD',
      );

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
          updatePartialOutput(newBotMessageId, chunk); // 챗봇 메시지로 업데이트
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // 남아있는 텍스트 처리
          if (bufferedText.length > 0) {
            updatePartialOutput(newBotMessageId, bufferedText);
          }
          setIsLoading(false);

          // 스트리밍 완료 후 메시지의 map 플래그를 true로 설정
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg._id === newBotMessageId ? {...msg, map: true} : msg,
            ),
          );
        }
      };

      xhr.onerror = () => {
        console.error('XMLHttpRequest error');
        setIsLoading(false);
      };

      xhr.send(chatFormData);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      {!isLoading && (
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={value => setText(value)}
            onSubmitEditing={handleSend}
            placeholder="메시지를 입력하세요..."
            returnKeyType="send"
            blurOnSubmit={false}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image
              source={
                text.trim().length > 0
                  ? {uri: 'https://img.icons8.com/ios-filled/50/sent.png'}
                  : {uri: 'https://img.icons8.com/ios/50/sent--v1.png'}
              }
              style={styles.sendIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.recordButton]}
            onPress={isRecording ? stopRecording : startRecording}>
            <Image
              source={
                isRecording
                  ? {
                      uri: 'https://img.icons8.com/ios-filled/50/stop-circled.png',
                    }
                  : {
                      uri: 'https://img.icons8.com/ios-filled/50/000000/microphone.png',
                    }
              }
              style={styles.recordIcon}
            />
          </TouchableOpacity>
        </View>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    height: 45, // 인풋창 높이를 키움
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    outlineWidth: 0, // 웹에서는 outlineWidth를 사용하여 테두리를 제거할 수 있습니다.
    borderColor: 'transparent', // 테두리 색상을 투명하게 설정
    fontFamily: 'MinSans-Regular', // 폰트 설정
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sendIcon: {
    width: 20,
    height: 20,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  recordIcon: {
    width: 24,
    height: 24,
  },
  recording: {
    backgroundColor: '#FF6347',
    borderRadius: 20,
    padding: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomInputToolbar;

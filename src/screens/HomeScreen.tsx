import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {getLocation} from '../utils/getGeolocation';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  KakaoProfileNoneAgreement,
  login,
  logout,
  unlink,
  getProfile,
} from '@react-native-seoul/kakao-login';

export const HomeScreen = ({navigation}: any) => {
  const [result, setResult] = useState<string>('');
  const [location, setLocation] = useState<any>(null);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      console.log(token);

      setResult(JSON.stringify(token));
    } catch (err) {
      console.log(err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();
      console.log(message);

      setResult(message);
    } catch (err) {
      console.log(err);
    }
  };

  const getKakaoProfile = async (): Promise<void> => {
    try {
      const profile: KakaoProfile | KakaoProfileNoneAgreement =
        await getProfile();
      console.log(profile);

      setResult(JSON.stringify(profile));
    } catch (err) {
      console.log(err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();
      console.log(message);

      setResult(message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <Text>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Fetching location...</Text>
      )}
      <View style={{flex: 1.5}} />
      <View style={{flex: 2}}>
        <View style={styles.logoArea}>
          <Image
            source={require('../../public/naegift_ko_logo.png')}
            style={{width: wp(55), resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            onPress={() => {
              console.log('Attempting to navigate to Login');
              navigation.navigate('Details');
            }}
            style={styles.btnoutline}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnArea}>
          <TouchableOpacity
            onPress={() => {
              console.log('Attempting to navigate to Register');
              navigation.navigate('Register');
            }}
            style={styles.btn}>
            <Text style={{color: 'white'}}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text>result : {result}</Text>
        <Button
          testID="btn-login"
          onPress={() => signInWithKakao()}
          title={'카카오 로그인'}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => getKakaoProfile()}
          title={'프로필 조회'}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => unlinkKakao()}
          title={'링크 해제'}
        />
        <View style={{marginTop: 12}} />
        <Button onPress={() => signOutWithKakao()} title={'카카오 로그아웃'} />
        <View style={{marginTop: 40}} />
      </View>
      <View style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, //전체의 공간을 차지한다는 의미
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  logoArea: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingBottom: wp(15),
  },
  btnArea: {
    height: hp(8),
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(1.5),
  },
  btn: {
    flex: 1,
    width: wp(75),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btnoutline: {
    flex: 1,
    width: wp(75),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
});
export default HomeScreen;

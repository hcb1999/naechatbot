import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 설치한 아이콘 라이브러리

const Navbar = ({onMenuPress, onSettingsPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress} style={styles.iconContainer}>
        <Icon name="menu-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>경기챗</Text>
      <TouchableOpacity onPress={onSettingsPress} style={styles.iconContainer}>
        <Icon name="settings-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Ownglyph_UNZ-Rg', // 여기에 폰트 파일 이름을 사용합니다.
  },
  iconContainer: {
    padding: 13,
  },
});

export default Navbar;

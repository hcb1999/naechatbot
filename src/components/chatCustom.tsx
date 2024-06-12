import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const chatCustom = ({aimessage}: any) => {
  console.log('chat', aimessage);
  return (
    <>
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>{aimessage}</Text>
      </View>
    </>
  );
};

export default chatCustom;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titleWrapper: {
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    paddingTop: 90,
  },
  title1: {
    fontSize: 65,
  },
  title2: {
    fontSize: 40,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  buttonText: {
    fontSize: 25,
  },
});

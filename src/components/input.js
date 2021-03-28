import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

export default function Input({...props}) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    padding: 13,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fcfcfc',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '500',
  },
});

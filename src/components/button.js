import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button({title, children, textColor, ...props}) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      {title ? (
        <Text style={[styles.text, {color: textColor}]}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  textColor: 'blue',
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

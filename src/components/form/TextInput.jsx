import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import Theme from '../../theme';

const styles = StyleSheet.create({
  errorBorder: {
    borderColor:  Theme.colors.error
  },
  validBorder: {
    borderColor: 'grey'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error ? styles.errorBorder : styles.validBorder];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

const Input = props => {
  return (
    <TextInput
      {...props}
      autoCorrect={false}
      autoCapitalize={'none'}
      style={styles.loginInput}
      enablesReturnKeyAutomatically
      returnKeyType={'done'}
      blurOnSubmit={false}
    />
  );
};

export default Input;

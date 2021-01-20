import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

const Input = props => {
  const height = props.height;

  return (
    <TextInput
      {...props}
      autoCorrect={false}
      autoCapitalize={'none'}
      style={[styles.input, {height}]}
      multiline={true}
      autoFocus={true}
    />
  );
};

export default Input;

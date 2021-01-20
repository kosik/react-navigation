import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const TextButton = props => {
  const marginTop = props.marginTop || 0;
  const fontSize = props.fontSize || 22;
  const textDecorationLine = props.textDecorationLine || 'none';

  return (
    <TouchableOpacity style={[styles.textButton, {marginTop}]} {...props}>
      <Text style={[styles.textButtonText, {fontSize, textDecorationLine}]}>
        {props.buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;

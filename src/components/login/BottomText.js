import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const BottomText = props => {
  const textDecorationLine = props.textDecorationLine || 'none';
  return (
    <Text style={[styles.bottomText, {textDecorationLine}]}>{props.title}</Text>
  );
};

export default BottomText;

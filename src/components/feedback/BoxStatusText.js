import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const BoxStatusText = props => {
  return <Text style={[styles.boxStatusText]}>{props.content}</Text>;
};

export default BoxStatusText;

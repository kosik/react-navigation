import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const LinkText = props => {
  return <Text style={styles.linkText}>{props.title}</Text>;
};

export default LinkText;

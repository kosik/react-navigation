import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const BoxHeaderTitle = props => {
  return <Text style={[styles.boxHeaderTitle]}>{props.content}</Text>;
};

export default BoxHeaderTitle;

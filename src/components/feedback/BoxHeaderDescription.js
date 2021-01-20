import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const BoxHeaderDescription = props => {
  return <Text style={[styles.boxHeaderDescription]}>{props.content}</Text>;
};

export default BoxHeaderDescription;

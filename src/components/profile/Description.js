import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const Description = props => {
  const marginTop = props.marginTop || 0;

  return <Text style={[styles.description, {marginTop}]}>{props.content}</Text>;
};

export default Description;

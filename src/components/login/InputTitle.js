import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const InputTitle = props => {
  const {marginBottom} = props;
  return (
    <Text style={[styles.loginInputTitle, {marginBottom: marginBottom || 8}]}>
      {props.title}
    </Text>
  );
};

export default InputTitle;

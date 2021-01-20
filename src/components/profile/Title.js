import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const Title = props => {
  const fontSize = props.fontSize || 17;
  const marginTop = props.marginTop === 0 ? 0 : 20;
  const marginBottom = props.marginBottom === 0 ? 0 : 10;

  return (
    <Text
      style={[
        styles.title,
        {
          fontSize,
          marginTop,
          marginBottom,
        },
      ]}>
      {props.content}
    </Text>
  );
};

export default Title;

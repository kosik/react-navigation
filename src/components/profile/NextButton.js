import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const NextButton = props => {
  return (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <Text style={styles.nextButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default NextButton;

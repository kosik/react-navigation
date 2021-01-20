import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const FeedbackButton = props => {
  return (
    <TouchableOpacity
      style={[styles.feedbackButton, {marginBottom: props.marginBottom || 0}]}
      {...props}>
      <Text style={styles.feedbackButtonText}>{props.buttonText}</Text>
    </TouchableOpacity>
  );
};

export default FeedbackButton;

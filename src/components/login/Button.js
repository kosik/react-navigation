import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = props => {
  return (
    <TouchableOpacity style={styles.loginButton} {...props}>
      {props.loading ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <Text style={styles.loginButtonText}>{props.buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

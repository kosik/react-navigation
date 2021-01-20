import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const DeleteButton = props => {
  return (
    <TouchableOpacity style={styles.deleteButton} {...props}>
      <Text style={styles.deleteButtonText}>{'x'}</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;

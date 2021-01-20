import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';
import {images} from '../../constants/theme';

const ResetButton = props => {
  return (
    <TouchableOpacity style={styles.direction} {...props}>
      <Image
        source={images.RESET}
        resizeMode={'contain'}
        style={styles.resetImage}
      />
      <Text style={styles.resetText}>Reset last pick</Text>
    </TouchableOpacity>
  );
};

export default ResetButton;

import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images} from '../../constants/theme';
import styles from './styles';

const BackButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.backButton}>
      {/* <Image source={images.BACK} style={styles.backImage} /> */}
      <Icon name="angle-left" size={48} color={props.color || '#000'} />
    </TouchableOpacity>
  );
};

export default BackButton;

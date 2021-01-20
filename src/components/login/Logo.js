import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import {images} from '../../constants/theme';

const Logo = () => {
  return <Image source={images.LOGO} style={styles.logoImage} />;
};

export default Logo;

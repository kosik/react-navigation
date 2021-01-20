import React from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/theme';
import styles from './styles';

const ExpandButton = props => {
  return (
    // <TouchableOpacity {...props}>
    <Image
      style={styles.expandImage}
      resizeMode={'cover'}
      source={!props.isExpanded ? images.DOWN : images.UP}
    />
    // </TouchableOpacity>
  );
};

export default ExpandButton;

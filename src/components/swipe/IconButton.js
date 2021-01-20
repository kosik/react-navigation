import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {images} from '../../constants/theme';

const IconButton = props => {
  const {iconType} = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{marginRight: iconType === 'cross' ? 20 : 0}}>
      <Image source={iconType === 'cross' ? images.CROSS : images.SHAPES} />
    </TouchableOpacity>
  );
};

export default IconButton;

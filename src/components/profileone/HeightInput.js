import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import {colors, sizes} from '../../constants/theme';

const HeightInput = props => {
  const {
    placeholder,
    borderColor,
    color,
    placeholderTextColor,
    fontSize,
    isHalf,
  } = props;
  return (
    <TextInput
      {...props}
      style={[
        styles.heightInput,
        {
          borderColor: borderColor || colors.black,
          color: color || colors.black,
          fontSize: fontSize || 32,
          width: isHalf ? sizes.halfContentWidth : sizes.contentWidth,
        },
      ]}
      underlineColorAndroid={'transparent'}
      placeholder={placeholder || ''}
      placeholderTextColor={placeholderTextColor || colors.black}
    />
  );
};

export default HeightInput;

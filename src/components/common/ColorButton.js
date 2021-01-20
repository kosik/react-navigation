import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import styles from './styles';
import StyledText from './StyledText';

const ColorButton = props => {
  const {
    borderRadius,
    buttonColor,
    loading,
    buttonText,
    textSize,
    textColor,
    textFontWeight,
    textDecorationLine,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.colorButton,
        {
          borderRadius: borderRadius || 0,
          backgroundColor: buttonColor || colors.pink,
        },
      ]}
      {...props}>
      {loading ? (
        <ActivityIndicator size={'small'} color={'black'} />
      ) : (
        <StyledText
          content={buttonText}
          fontSize={textSize || sizes.normalFontSize}
          color={textColor || colors.black}
          fontWeight={textFontWeight || 'bold'}
          textDecorationLine={textDecorationLine}
        />
      )}
    </TouchableOpacity>
  );
};

export default ColorButton;

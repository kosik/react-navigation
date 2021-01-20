import React from 'react';
import {TouchableOpacity} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import styles from './styles';
import StyledText from './StyledText';

const CommonButton = props => {
  const {buttonText, textSize, textColor, textFontWeight} = props;

  return (
    <TouchableOpacity style={[styles.commonButton]} {...props}>
      <StyledText
        content={buttonText}
        fontSize={textSize || sizes.normalFontSize}
        color={textColor || colors.black}
        fontWeight={textFontWeight || 'bold'}
      />
    </TouchableOpacity>
  );
};

export default CommonButton;

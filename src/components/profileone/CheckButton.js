import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {StyledText} from '../common';
import {colors, sizes} from '../../constants/theme';

const {width: screenWidth} = Dimensions.get('window');
const buttonFullWidth = screenWidth - sizes.padding * 2;
const buttonHalfWidth = (screenWidth - sizes.padding * 2 - sizes.padding) / 2;

const CheckButton = props => {
  const {
    isSelected,
    buttonText,
    onPress,
    isHalfWidth,
    isLeft,
    checkIcon,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[
        styles.checkButton,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: isSelected ? colors.black : 'transparent',
          width: !isHalfWidth ? buttonFullWidth : buttonHalfWidth,
          marginRight: isLeft ? sizes.normalPadding : 0,
        },
      ]}>
      {isSelected ? (
        <Icon
          name={checkIcon || 'checkcircle'}
          size={24}
          color={colors.white}
        />
      ) : null}

      <StyledText
        color={!isSelected ? colors.black : colors.white}
        fontWeight={'bold'}
        fontSize={sizes.middleFontSize}
        marginLeft={isSelected ? sizes.normalPadding : undefined}
        content={buttonText}
      />
    </TouchableOpacity>
  );
};

export default CheckButton;

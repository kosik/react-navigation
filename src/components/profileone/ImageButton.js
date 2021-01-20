import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Wrapper, StyledText} from '../common';
import {colors, sizes} from '../../constants/theme';

const ImageButton = props => {
  const {img, buttonText, isLeft, isSelected, onPress, aspectRatio} = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.imageButton,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginRight: isLeft ? sizes.normalPadding : 0,
          borderWidth: isSelected ? 1 : 3,
        },
      ]}
      onPress={onPress}>
      <FastImage
        style={[
          styles.image,
          {
            aspectRatio: aspectRatio || 1,
          },
        ]}
        source={img}
        resizeMode={FastImage.resizeMode.contain}
      />
      {isSelected ? (
        <View style={styles.checkIconWrapper}>
          <Icon name="checkcircle" size={30} color={colors.black} />
        </View>
      ) : null}

      <View style={styles.buttonDescription}>
        <StyledText
          fontSize={sizes.middleFontSize}
          fontWeight={'bold'}
          content={buttonText}
          marginBottom={sizes.normalPadding}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ImageButton;

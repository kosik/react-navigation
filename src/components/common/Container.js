import React from 'react';
import {View, Platform} from 'react-native';
import styles from './styles';
import {colors, sizes} from '../../constants/theme';
import {isIphoneX} from 'react-native-iphone-x-helper';

const Container = props => {
  const backgroundColor = props.backgroundColor || colors.yellow;
  const flex = 1;
  const flexDirection = 'column';
  const paddingHorizontal = props.paddingHorizontal || sizes.padding;
  const paddingVertical = isIphoneX() ? 50 : Platform.OS === 'ios' ? 30 : 20;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          flex,
          flexDirection,
          paddingHorizontal,
          paddingVertical,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default Container;

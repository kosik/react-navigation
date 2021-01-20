import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const Wrapper = props => {
  // flex size
  const flex = props.size || 0;
  // flex direction
  const flexDirection = props.row ? 'row' : 'column';
  // content alignment
  const justifyContent = props.primary || 'flex-start';
  const alignItems = props.secondary || 'flex-start';
  // margin
  const marginTop = props.marginTop || 0;
  const marginBottom = props.marginBottom || 0;
  const marginLeft = props.marginLeft || 0;
  const marginRight = props.marginRight || 0;
  // individual padding
  const paddingTop = props.paddingTop || 0;
  const paddingBottom = props.paddingBottom || 0;
  const paddingLeft = props.paddingLeft || 0;
  const paddingRight = props.paddingRight || 0;
  // horizontal && vertical padding
  const paddingHorizontal = props.paddingHorizontal || 0;
  const paddingVertical = props.paddingVertical || 0;
  // width, height
  const width = props.width || 'auto';
  const height = props.height || 'auto';
  // background color
  const backgroundColor = props.backgroundColor || 'transparent';
  // border width
  const borderWidth = props.borderWidth || 0;
  // border radius
  const borderRadius = props.borderRadius || 0;

  return (
    <View
      onStartShouldSetResponder={props.onStartShouldSetResponder || null}
      style={[
        styles.wrapper,
        {
          width,
          height,
          flex,
          flexDirection,
          justifyContent,
          alignItems,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          paddingHorizontal,
          paddingVertical,
          paddingTop: (paddingTop && !paddingVertical) || paddingVertical,
          paddingBottom: (paddingBottom && !paddingVertical) || paddingVertical,
          paddingLeft: (paddingLeft && !paddingHorizontal) || paddingHorizontal,
          paddingRight:
            (paddingRight && !paddingHorizontal) || paddingHorizontal,
          backgroundColor,
          borderWidth,
          borderRadius,
        },
      ]}>
      {props.children}
    </View>
  );
};

export default Wrapper;

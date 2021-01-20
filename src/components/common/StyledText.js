import React from 'react';
import {Text} from 'react-native';
import {colors} from '../../constants/theme';
import styles from './styles';

const StyledText = props => {
  const {
    fontSize,
    color,
    content,
    fontWeight,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    textAlign,
    textDecorationLine,
  } = props;

  return (
    <Text
      style={[
        styles.styledText,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: fontSize || 12,
          color: color || colors.black,
          // fontWeight: fontWeight || 'normal',
          marginTop: marginTop || 0,
          marginLeft: marginLeft || 0,
          marginRight: marginRight || 0,
          marginBottom: marginBottom || 0,
          textDecorationLine: textDecorationLine,
          fontFamily:
            fontWeight === 'bold'
              ? 'TitilliumWeb-Bold'
              : 'TitilliumWeb-Regular',
          textAlign: textAlign || 'left',
        },
      ]}>
      {content}
    </Text>
  );
};

export default StyledText;

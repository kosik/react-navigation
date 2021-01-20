import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import StyledText from '../common/StyledText';
import {sizes} from '../../constants/theme';

const SwipeButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.swipeButton}>
      <StyledText
        fontSize={sizes.normalFontSize}
        content={"Let's swipe clothes!"}
        fontWeight={'bold'}
      />
    </TouchableOpacity>
  );
};

export default SwipeButton;

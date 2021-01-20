import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import StyledText from '../common/StyledText';
import {sizes} from '../../constants/theme';

const BackButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.backButton}>
      <StyledText
        fontSize={sizes.normalFontSize}
        content={'Go back to home'}
        fontWeight={'bold'}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

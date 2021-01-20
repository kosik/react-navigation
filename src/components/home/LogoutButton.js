import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import StyledText from '../common/StyledText';
import {sizes} from '../../constants/theme';

const LogoutButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.logoutButton}>
      <StyledText
        fontSize={sizes.normalFontSize}
        content={'Log out'}
        color={'#fff'}
        fontWeight={'bold'}
      />
    </TouchableOpacity>
  );
};

export default LogoutButton;

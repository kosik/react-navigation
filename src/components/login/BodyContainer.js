import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const BodyContainer = props => {
  return <View style={styles.bodyContainer}>{props.children}</View>;
};

export default BodyContainer;

import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ViewText = props => {
  const height = props.height;

  return (
    <View style={styles.viewTextWrapper}>
      <Text style={[styles.viewText, {height}]} {...props}>
        {props.content}
      </Text>
    </View>
  );
};

export default ViewText;

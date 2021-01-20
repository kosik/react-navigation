import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

const CoverLoading = () => {
  return (
    <View style={styles.coverLoading}>
      <ActivityIndicator size={'small'} color={'#ffffff'} />
    </View>
  );
};

export default CoverLoading;

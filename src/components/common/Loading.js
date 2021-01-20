import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = props => {
  return <ActivityIndicator size={props.size || 'small'} color={'black'} />;
};

export default Loading;

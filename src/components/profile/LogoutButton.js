import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const LogoutButton = props => {
  return (
    <TouchableOpacity {...props}>
      <Icon name="logout" size={30} color="#000" />
    </TouchableOpacity>
  );
};

export default LogoutButton;

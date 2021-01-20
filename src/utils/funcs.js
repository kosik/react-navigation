import {Alert} from 'react-native';

export const validateEmail = email => {
  // eslint-disable-next-line no-useless-escape
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const showAlert = (title, body) => {
  Alert.alert(title, body, [{text: 'OK', onPress: () => {}}], {
    cancelable: true,
  });
};

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const guid = () => {
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};

export const generateNumberArray = length => {
  return Array.from(Array(length).keys());
};

export const generateStringFromArray = array => {
  let dataString = '';
  if (array.length > 0) {
    array.forEach((element, index) => {
      dataString = dataString + element;
      if (index !== array.length - 1) {
        dataString = dataString + ',';
      }
    });
  }

  return dataString;
};

export const generateArrayFromString = string => {
  let dataArray = [];
  if (string) {
    dataArray = string.split(',');
  }
  return dataArray;
};

import AsyncStorage from '@react-native-community/async-storage';

export const saveToStorage = (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = key => {
  return AsyncStorage.getItem(key);
};

export const removeOneItemFromStorage = key => {
  return AsyncStorage.removeItem(key);
};

// keys: key string array
export const removeMultipleItemsFromStorage = keys => {
  return AsyncStorage.multiRemove(keys);
};

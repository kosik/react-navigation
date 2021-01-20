import {StyleSheet} from 'react-native';
import {sizes} from '../../constants/theme';

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  logoutButton: {
    paddingVertical: sizes.normalPadding,
    paddingHorizontal: sizes.largePadding,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  swipeButton: {
    paddingVertical: sizes.normalPadding,
    paddingHorizontal: sizes.largePadding,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 2,
  },
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';
import {sizes} from '../../constants/theme';

const {width} = Dimensions.get('window');
const buttonFullWidth = width - sizes.padding * 2;

const style = StyleSheet.create({
  container: {},
  wrapper: {},
  colorButton: {
    width: buttonFullWidth,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonButton: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: sizes.normalPadding,
  },
  piContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  piImage: {
    width: '100%',
    height: '100%',
  },
  piIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;

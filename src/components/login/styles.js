import {StyleSheet} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import {isIphoneX} from 'react-native-iphone-x-helper';

const style = StyleSheet.create({
  logoImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: isIphoneX() ? 25 : 7.5,
  },
  loginButton: {
    width: '100%',
    height: 60,
    backgroundColor: colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontWeight: '500',
    fontSize: 22,
    color: colors.black,
  },
  loginInput: {
    width: '100%',
    fontSize: 16,
    color: colors.grey,
    borderColor: colors.black,
    borderWidth: 3,
    borderRadius: sizes.radius,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginBottom: 15,
  },
  loginInputTitle: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  linkText: {
    color: colors.black,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomText: {
    color: colors.black,
    fontSize: 17,
    // fontWeight: 'bold',
  },
  textButton: {},
  textButtonText: {
    color: colors.black,
    // fontWeight: '500',
    textAlign: 'center',
  },
  bodyContainer: {
    width: '100%',
    height: '100%',
  },
});

export default style;

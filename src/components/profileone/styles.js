import {StyleSheet, Platform} from 'react-native';
import {colors, sizes} from '../../constants/theme';
import {isIphoneX} from 'react-native-iphone-x-helper';

const style = StyleSheet.create({
  checkButton: {
    width: sizes.contentWidth,
    height: 50,
    borderWidth: 3,
    borderRadius: 5,
    marginTop: sizes.normalPadding,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    width: sizes.halfContentWidth,
    aspectRatio: 0.8,
    marginTop: sizes.normalPadding,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  image: {
    width: sizes.halfContentWidth,
    aspectRatio: 1,
  },
  checkIconWrapper: {
    position: 'absolute',
    top: sizes.normalPadding,
    right: sizes.normalPadding,
  },
  casualButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    marginLeft: sizes.smallPadding,
    marginRight: sizes.smallPadding,
    marginTop: sizes.smallPadding,
  },
  heightInput: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingBottom: sizes.smallPadding,
    marginTop: 0,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    borderBottomWidth: 5,
    borderColor: 'black',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.yellow,
    paddingTop: isIphoneX() ? 50 : Platform.OS === 'ios' ? 30 : 20,
  },
  coverLoading: {
    position: 'absolute',
    width: sizes.screenWidth,
    height: sizes.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonDescription: {
    position: 'absolute',
    width: sizes.halfContentWidth,
    height: sizes.halfContentWidth * 1.25,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default style;

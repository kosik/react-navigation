import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  backImage: {
    width: 17,
    height: 30,
    resizeMode: 'cover',
  },
  boxImageWrapper: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerIconStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: colors.black,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  upArrowImage: {
    width: 30,
    height: 17,
  },
  boxHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  boxHeaderDescription: {
    fontSize: 16,
    color: colors.black,
    marginTop: 5,
  },
  expandImage: {
    width: 30,
    height: 17,
  },
  separator: {
    width: '100%',
    backgroundColor: 'grey',
    height: 1,
  },
  activityIndicatorWrapper: {
    position: 'absolute',
  },
  boxImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  boxItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  boxItemDescription: {
    fontSize: 16,
    color: colors.black,
  },
  boxStatusText: {
    paddingTop: hp('20%'),
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
  },
  backButton: {
    marginTop: 0,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  boxContainer: {
    width: width - 30,
    height: 100,
    flexDirection: 'row',
    marginBottom: 8,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    paddingLeft: 8,
    flex: 1,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
  },
});

export default style;

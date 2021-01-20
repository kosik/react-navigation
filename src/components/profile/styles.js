import {StyleSheet} from 'react-native';
import {colors} from '../../constants/theme';

const style = StyleSheet.create({
  title: {
    color: colors.black,
    fontWeight: 'bold',
  },
  feedbackButton: {
    width: '100%',
    paddingVertical: 15,
    marginTop: 20,
    borderColor: colors.black,
    borderWidth: 3,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: colors.black,
    fontSize: 16,
  },
  input: {
    width: '100%',
    color: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 7,
    padding: 5,
    textAlignVertical: 'top',
  },
  viewTextWrapper: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: colors.black,
    marginTop: 7,
  },
  viewText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  uploadImageWrapper: {
    flex: 1,
    aspectRatio: 1,
    margin: 2.5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholderWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imagePlaceholderText: {
    color: 'grey',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityIndicatorWrapper: {
    position: 'absolute',
  },
  nextButton: {
    marginTop: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  deleteButtonText: {
    fontSize: 18,
  },
});

export default style;

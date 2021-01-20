import {StyleSheet} from 'react-native';
import {sizes} from '../../constants/theme';

const styles = StyleSheet.create({
  card: {
    width: 260,
    height: 320,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignItems: 'center',
    shadowOpacity: 0.5,
  },
  noCard: {
    marginTop: '45%',
    marginLeft: '20%',
    fontSize: 20,
    color: 'gray',
    position: 'absolute',
  },
  noCardText: {
    fontWeight: '700',
    fontSize: 18,
    color: 'gray',
  },
  noCardView: {
    marginTop: '45%',
    width: '100%',
    position: 'absolute',
  },
  content: {
    marginTop: '13%',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  checkButton: {
    marginTop: 340,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resetButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resetText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 3,
  },
  resetImage: {
    height: 32,
    width: 32,
    borderRadius: 5,
  },
  backButton: {
    marginTop: sizes.normalPadding,
  },
  direction: {
    flexDirection: 'row',
  },
  left: {
    marginLeft: 45,
  },
});

export default styles;

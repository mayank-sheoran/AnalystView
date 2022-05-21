import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets/theme';

export default StyleSheet.create({
  base: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  tradesContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.light_grey,
  },
  filterBtnContainer: {
    width: '80%',
    alignSelf: 'center',
    height: 60,
    backgroundColor: COLORS.white,
  },
  filterBtn: {
    width: '100%',
  },
  tradeCard: {
    height: 250,
    position: 'relative',
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 30,
    backgroundColor: COLORS.white,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '90%',
    height: 250,
    resizeMode: 'contain',
  },
  expandButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
});

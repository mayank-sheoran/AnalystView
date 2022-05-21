import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets/theme';

export default StyleSheet.create({
  sheetContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.light_grey,
    width: '90%',
    borderRadius: 10,
    marginBottom: 10,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets/theme';
export default StyleSheet.create({
  base: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  detailContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    height: 90,
    borderColor: COLORS.light_grey,
    borderWidth: 1,
    width: '40%',
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.blue,
  },
});

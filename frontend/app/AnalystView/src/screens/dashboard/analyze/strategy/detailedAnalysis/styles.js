import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets/theme';
export default StyleSheet.create({
  base: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  detailContainerShort: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: COLORS.light_grey,
  },
  detailContainerLong: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
    width: '70%',
    borderRadius: 15,
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
    fontSize: 18,
    fontWeight: '700',
  },
});

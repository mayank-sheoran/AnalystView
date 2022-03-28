import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';
export default StyleSheet.create({
  tabBar: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 40,
    height: 70,
    left: 25,
    right: 25,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

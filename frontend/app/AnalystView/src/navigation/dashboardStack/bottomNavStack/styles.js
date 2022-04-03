import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';
export default StyleSheet.create({
  tabBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
    height: 60,
    width: '90%',
    borderRadius: 15,
    backgroundColor: COLORS.white,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

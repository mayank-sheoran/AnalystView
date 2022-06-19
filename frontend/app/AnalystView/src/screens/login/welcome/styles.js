import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

export default StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.white,
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
  },
  featuresContainer: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  loginContainer: {
    height: 170,
    marginTop: 10,
  },
});

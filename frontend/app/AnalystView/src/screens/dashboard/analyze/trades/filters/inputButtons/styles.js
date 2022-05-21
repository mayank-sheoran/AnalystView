import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../../assets/theme';

export default StyleSheet.create({
  base: {
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 20,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets/theme';

export default StyleSheet.create({
  txt: {
    fontSize: 14,
    width: 100,
    fontWeight: '700',
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

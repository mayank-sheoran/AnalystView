import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

export default StyleSheet.create({
  txt: {
    fontSize: 14,
    width: 100,
    fontWeight: '700',
    color: COLORS.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
    marginTop: 30,
  },
  datePicker: {
    position: 'absolute',
    top: '50%',
  },
  strategySelector: {
    width: '100%',
    color: COLORS.blue,
  },
  btn: {
    // backgroundColor: COLORS.black,
    // borderColor: COLORS.black,
    marginRight: 20,
    width: 90,
    fontSize: 8,
  },
});

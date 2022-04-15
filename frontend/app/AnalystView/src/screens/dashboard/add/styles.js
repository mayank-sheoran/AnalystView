import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

export default StyleSheet.create({
  base: {
    flex: 1,
  },
  txt: {
    fontSize: 14,
    width: 100,
    fontWeight: '700',
    color: COLORS.black,
  },
  twoBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
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
    marginRight: 20,
    width: 90,
    fontSize: 8,
  },
  submitBtn: {
    width: 250,
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  submitBtnContainer: {
    height: 60,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.light_grey,
  },
});

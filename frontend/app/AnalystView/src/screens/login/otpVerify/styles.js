import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

export default StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.dark_grey,
    marginTop: 40,
  },
  otpVerifyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 200,
  },
  otpInput: {
    marginTop: 40,
    width: '90%',
    height: 70,
  },
  underlineStyleBase: {
    borderColor: COLORS.dark_grey,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: COLORS.black,
    fontSize: 18,
  },
  underlineStyleHighLighted: {
    color: COLORS.black,
    fontSize: 18,
  },
  resendOtpContainer: {
    justifyContent: 'center',
    height: 100,
    flexDirection: 'row',
  },
});

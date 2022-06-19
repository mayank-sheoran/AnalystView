import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../assets/theme';

var width = Dimensions.get('window').width;

export default StyleSheet.create({
  baseContainer: {
    width: 0.9 * width,
  },
  inputContainer: {
    marginTop: 15,
  },
  phoneInput: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inp: {
    width: 0.73 * width,
    height: 40,
    backgroundColor: COLORS.white,
  },
  countryPicker: {
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_grey,
    borderWidth: 0.5,
    width: 0.15 * width,
    height: 40,
    marginRight: 0.02 * width,
    borderRadius: 6,
  },
  getOtpBtn: {
    marginBottom: 100,
    width: 0.9 * width,
  },
});

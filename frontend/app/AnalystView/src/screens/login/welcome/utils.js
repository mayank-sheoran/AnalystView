// Module imports
import auth from '@react-native-firebase/auth';
import getSymbolFromCurrency from 'currency-symbol-map';

// File imports
import notify from '../../../components/notify';
import countryToSymbolMapping from '../../../assets/json/countryToSymbolMapping.json';
import {SCREEN_NAMES} from '../../../navigation/constants';
import {saveError} from '../../../utils/api';

export const signInWithPhoneNumber = async params => {
  const {
    state,
    login,
    setLoading,
    phoneNumber,
    setConfirm,
    navigation,
    confirm,
    saveUser,
  } = params;
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    if (true) {
      await saveUser({
        phone: state.phoneNum,
        currencySymbol: getSymbolFromCurrency(
          countryToSymbolMapping[state.countryCode][0].Code,
        ),
      });
      setConfirm(confirmation);
      setLoading(false);
      navigation.navigate(SCREEN_NAMES.OTP_VERIFY_SCREEN, {
        confirm,
        phoneNumber,
        callingCode: state.callingCode,
      });
    }
  } catch (err) {
    setLoading(false);
    if (err.code === 'auth/missing-phone-number') {
      notify({heading: 'Error', subHeading: 'Enter Phone Number'});
    } else if (err.code === 'auth/invalid-phone-number') {
      notify({heading: 'Error', subHeading: 'Invalid Phone Number'});
    } else if (err.code === 'auth/quota-exceeded') {
      notify({heading: 'Error', subHeading: 'SMS Quota Exceeded'});
      saveError(login, 'SMS Quota Exceeded');
    } else if (err.code === 'auth/user-disabled') {
      notify({heading: 'Error', subHeading: 'BANNED'});
      saveError(login, 'BANNED');
    } else {
      notify({heading: 'Error', subHeading: 'Unexpected Error'});
      saveError(login, 'Unexpected Error while re-sending OTP - ' + err.code);
    }
  }
};

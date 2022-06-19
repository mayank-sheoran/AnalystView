// Module imports
import auth from '@react-native-firebase/auth';

// File imports
import notify from '../../../components/notify';
import {saveError} from '../../../utils/api';

export const handleCodeFilled = async params => {
  const {setLoading, confirm, code} = params;

  setLoading(true);
  try {
    await confirm.confirm(code);
  } catch (error) {
    setLoading(false);
    notify({heading: 'Error', subHeading: 'Wrong OTP'});
  }
};

export const reSendOtp = async params => {
  const {
    setSeconds,
    setLoading,
    setConfirm,
    phoneNumber,
    setResendActive,
    login,
  } = params;

  setLoading(true);

  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
    if (confirmation) {
      setConfirm(confirmation);
      setLoading(false);
      setResendActive(false);
      setSeconds(20);
    } else {
      setLoading(false);
      notify({heading: 'Error', subHeading: 'Try Again'});
    }
  } catch (err) {
    setLoading(false);
    if (err.code === 'auth/quota-exceeded') {
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

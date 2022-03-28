import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';

// Import Files
import Header from '../../../components/Header';
import notify from '../../../components/notify';
import styles from './styles';
import {COLORS} from '../../../assets/theme';
import Loading from '../../../components/loading';

const OtpVerify = ({route, navigation}) => {
  const [confirm, setConfirm] = useState(route.params.confirm);
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(0);
  const [triggerWait, setTriggerWait] = useState(false);
  const resentOtpText = wait === 0 ? 'Request Again' : `Wait ${wait} sec`;
  const {phoneNumber} = route.params;

  const handleCodeFilled = async code => {
    setLoading(true);
    try {
      await confirm.confirm(code);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notify({heading: 'Error', subHeading: 'Wrong OTP'});
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setWait(lastWait => {
        if (lastWait === 0) {
          return 0;
        }
        lastWait <= 1 && clearInterval(interval);
        return lastWait - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [triggerWait]);

  const reSendOtp = async () => {
    if (wait !== 0) {
      return null;
    }
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumber,
        true,
      );
      if (confirmation) {
        setConfirm(confirmation);
        setLoading(false);
        setWait(20);
        setTriggerWait(!triggerWait);
      }
    } catch (err) {
      setLoading(false);
      if (err.code === 'auth/quota-exceeded') {
        notify({heading: 'Error', subHeading: 'SMS Quota Exceeded'});
      } else if (err.code === 'auth/user-disabled') {
        notify({heading: 'Error', subHeading: 'BANNED'});
      } else {
        console.log('Unexpected Error.' + err.code);
      }
    }
  };

  return (
    <View style={styles.baseContainer}>
      <Header
        title="Verify"
        backBtn={true}
        navigation={navigation}
        backScreen="welcome"
        color={COLORS.blue}
        theme="dark"
      />
      <View style={styles.otpVerifyContainer}>
        <Text style={styles.text}>Code sent to +918950577400</Text>
        <Loading loading={loading}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={handleCodeFilled}
          />
        </Loading>
      </View>
      <View style={styles.resendOtpContainer}>
        <Text style={{color: COLORS.dark_grey}}>Didn't recieved code?</Text>
        <TouchableOpacity onPress={reSendOtp}>
          <Text
            style={[
              {marginLeft: 5},
              wait === 0 && {color: COLORS.black},
              wait !== 0 && {color: COLORS.red},
            ]}>
            {resentOtpText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpVerify;

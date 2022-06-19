// Module imports
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';

// Import Files
import Header from '../../../components/header';
import styles from './styles';
import {COLORS} from '../../../assets/theme';
import Loading from '../../../components/loading';
import {handleCodeFilled, reSendOtp} from './utils';
import {HEADER_DETAILS, PAGE_DETAILS} from './constants';

const OtpVerify = ({route, navigation, login}) => {
  const [confirm, setConfirm] = useState(route.params.confirm);
  const [loading, setLoading] = useState(false);

  // TIMER STATES
  const [seconds, setSeconds] = useState(0);
  const [resendActive, setResendActive] = useState(true);

  const resentOtpText = resendActive
    ? PAGE_DETAILS.REQUEST_AGAIN
    : PAGE_DETAILS.WAIT(seconds);
  const {phoneNumber} = route.params;

  useEffect(() => {
    const timer =
      seconds > 0 &&
      setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    setResendActive(seconds <= 0);
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  return (
    <View style={styles.baseContainer}>
      <Header
        title={HEADER_DETAILS.TITLE}
        backBtn={true}
        navigation={navigation}
        backScreen={HEADER_DETAILS.BACKSCREEN}
        color={COLORS.blue}
        theme={HEADER_DETAILS.THEME}
      />

      <View style={styles.otpVerifyContainer}>
        <Text style={styles.text}>{PAGE_DETAILS.CODE_SENT(phoneNumber)}</Text>
        <Loading loading={loading}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => handleCodeFilled({code, confirm, setLoading})}
          />
        </Loading>
      </View>

      <View style={styles.resendOtpContainer}>
        <Text style={{color: COLORS.dark_grey}}>
          {PAGE_DETAILS.CODE_NOT_RECIEVED}
        </Text>
        {resendActive && (
          <TouchableOpacity
            onPress={() =>
              reSendOtp({
                phoneNumber,
                login,
                setResendActive,
                setConfirm,
                setLoading,
                setSeconds,
              })
            }>
            <Text style={{marginLeft: 5, color: COLORS.black}}>
              {resentOtpText}
            </Text>
          </TouchableOpacity>
        )}
        {!resendActive && (
          <Text style={{marginLeft: 5, color: COLORS.red}}>
            {resentOtpText}
          </Text>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {login} = state;
  return {login};
};

export default connect(mapStateToProps, null)(OtpVerify);

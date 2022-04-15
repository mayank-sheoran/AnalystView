import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {Input, Button} from '@ui-kitten/components';
import CountryPicker from 'react-native-country-picker-modal';
import getSymbolFromCurrency from 'currency-symbol-map';

// File imports
import styles from './styles';
import Loading from '../../../../components/loading';
import notify from '../../../../components/notify';
import {saveUser} from '../../../../redux/actions/login';
import countryToSymbolMapping from '../../../../assets/json/countryToSymbolMapping.json';

const LoginInputs = ({navigation, saveUser, login}) => {
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    callingCode: '91',
    countryCode: 'IN',
    phoneNum: '',
  });

  async function signInWithPhoneNumber(phoneNumber) {
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
        navigation.navigate('otpVerify', {
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
      } else if (err.code === 'auth/user-disabled') {
        notify({heading: 'Error', subHeading: 'BANNED'});
      } else {
        console.log('Unexpected Error.' + err.code);
      }
    }
  }
  const handleGetOtp = () => {
    setLoading(true);
    signInWithPhoneNumber(`+${state.callingCode}${state.phoneNum}`);
  };

  const loginInputCard = () => {
    return (
      <View style={styles.baseContainer}>
        <Text style={{fontSize: 28}}>Login</Text>
        <View style={styles.inputContainer}>
          <Text>Enter Phone:</Text>
          <View style={styles.phoneInput}>
            <View style={styles.countryPicker}>
              <CountryPicker
                countryCode={state.countryCode}
                withCallingCode={true}
                withFlagButton={true}
                withEmoji={true}
                withFlag={true}
                withFilter={true}
                withModal={true}
                withAlphaFilter={false}
                onSelect={country => {
                  setState(prevState => ({
                    ...prevState,
                    callingCode: country.callingCode[0],
                    countryCode: country.cca2,
                  }));
                }}
              />
            </View>
            <Input
              placeholder={`+${state.callingCode}`}
              style={styles.inp}
              value={state.phoneNum}
              keyboardType="numeric"
              onChangeText={nextValue =>
                setState(prevState => ({...prevState, phoneNum: nextValue}))
              }
            />
          </View>
          <Button style={styles.getOtpBtn} onPress={handleGetOtp}>
            Get OTP
          </Button>
        </View>
      </View>
    );
  };

  const inputCard = loginInputCard();
  return <Loading loading={loading}>{inputCard}</Loading>;
};

const mapStateToProps = state => {
  const {login} = state;
  return {login};
};

const mapDispatchToProps = dispatch => {
  // return bindActionCreators(
  //   {
  //     saveUser,
  //   },
  //   dispatch,
  // );
  return {
    saveUser: async user => await dispatch(saveUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInputs);

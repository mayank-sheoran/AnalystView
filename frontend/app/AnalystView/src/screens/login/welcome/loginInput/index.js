import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Input, Button} from '@ui-kitten/components';
import CountryPicker from 'react-native-country-picker-modal';

// File imports
import styles from './styles';
import Loading from '../../../../components/loading';
import {saveUser} from '../../../../redux/actions/login';
import {signInWithPhoneNumber} from '../utils';

const LoginInputs = ({navigation, saveUser, login}) => {
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    callingCode: '91',
    countryCode: 'IN',
    phoneNum: '',
  });

  const handleGetOtp = () => {
    setLoading(true);
    const params = {
      phoneNumber: `+${state.callingCode}${state.phoneNum}`,
      state,
      setLoading,
      setConfirm,
      confirm,
      navigation,
      saveUser,
      login,
    };
    signInWithPhoneNumber(params);
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
  return {
    saveUser: async user => await dispatch(saveUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInputs);

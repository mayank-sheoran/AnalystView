// Module imports
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// File imports
import Welcome from '../../screens/login/welcome';
import OtpVerify from '../../screens/login/otpVerify';
import {SCREEN_NAMES} from '../constants';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.WELCOME_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.WELCOME_SCREEN} component={Welcome} />
      <Stack.Screen
        name={SCREEN_NAMES.OTP_VERIFY_SCREEN}
        component={OtpVerify}
      />
    </Stack.Navigator>
  );
};

export default LoginStack;

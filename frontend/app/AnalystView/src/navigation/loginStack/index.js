// Module Imports
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// File Imports
import Welcome from '../../screens/login/welcome';
import OtpVerify from '../../screens/login/otpVerify';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="otpVerify" component={OtpVerify} />
    </Stack.Navigator>
  );
};

export default LoginStack;

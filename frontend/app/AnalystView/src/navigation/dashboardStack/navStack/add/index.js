// Module imports
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// File imports
import SelectStrategy from '../../../../screens/dashboard/add/selectStrategy';
import Add from '../../../../screens/dashboard/add';
import {SCREEN_NAMES} from '../../../constants';

const Stack = createNativeStackNavigator();

const AddNavStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.ADD_TO_JOURNAL_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.ADD_TO_JOURNAL_SCREEN} component={Add} />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_STRATEGY_ADD_SCREEN}
        component={SelectStrategy}
      />
    </Stack.Navigator>
  );
};

export default AddNavStack;

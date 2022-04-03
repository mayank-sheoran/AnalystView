import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import files
import SelectStrategy from '../../../../screens/dashboard/add/selectStrategy';
import Add from '../../../../screens/dashboard/add';

const Stack = createNativeStackNavigator();
const AddNavStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="add"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="addToJournal" component={Add} />
      <Stack.Screen name="strategy" component={SelectStrategy} />
    </Stack.Navigator>
  );
};

export default AddNavStack;

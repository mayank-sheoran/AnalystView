import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import files
import TradesAnalysis from '../../../../../screens/dashboard/analyze/trades';
import Filters from '../../../../../screens/dashboard/analyze/trades/filters';
import InputStrategy from '../../../../../screens/dashboard/analyze/trades/filters/inputStrategy';

const Stack = createNativeStackNavigator();
const TradesAnalysisStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="tradesAnalysis"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="tradesAnalysis" component={TradesAnalysis} />
      <Stack.Screen name="tradeFilters" component={Filters} />
      <Stack.Screen name="selectStrategy" component={InputStrategy} />
    </Stack.Navigator>
  );
};

export default TradesAnalysisStack;

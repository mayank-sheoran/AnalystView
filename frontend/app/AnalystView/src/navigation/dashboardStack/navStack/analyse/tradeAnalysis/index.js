import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import files
import {SCREEN_NAMES} from '../../../../constants';
import TradesAnalysis from '../../../../../screens/dashboard/analyze/trades';
import Filters from '../../../../../screens/dashboard/analyze/trades/filters';
import InputStrategy from '../../../../../screens/dashboard/analyze/trades/filters/inputStrategy';

const Stack = createNativeStackNavigator();

const TradesAnalysisStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.TRADE_ANALYSIS_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.TRADE_ANALYSIS_SCREEN}
        component={TradesAnalysis}
      />
      <Stack.Screen
        name={SCREEN_NAMES.TRADE_FILTER_SCREEN}
        component={Filters}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_STRATEGY_ANALYSIS_SCREEN}
        component={InputStrategy}
      />
    </Stack.Navigator>
  );
};

export default TradesAnalysisStack;

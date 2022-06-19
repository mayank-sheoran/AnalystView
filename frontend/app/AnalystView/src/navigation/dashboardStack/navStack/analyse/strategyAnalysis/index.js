// Module imports
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// File imports
import DetailedStrategyAnalysis from '../../../../../screens/dashboard/analyze/strategy/detailedAnalysis';
import StrategyAnalysis from '../../../../../screens/dashboard/analyze/strategy';
import {SCREEN_NAMES} from '../../../../constants';

const Stack = createNativeStackNavigator();

const StrategyAnalysisStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.STRATEGY_ANALYSIS_SCREEN}
        component={StrategyAnalysis}
      />
      <Stack.Screen
        name={SCREEN_NAMES.DETAILED_STRATEGY_ANALYSIS_SCREEN}
        component={DetailedStrategyAnalysis}
      />
    </Stack.Navigator>
  );
};

export default StrategyAnalysisStack;

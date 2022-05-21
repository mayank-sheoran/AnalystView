import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import files
import DetailedStrategyAnalysis from '../../../../../screens/dashboard/analyze/strategy/detailedAnalysis';
import StrategyAnalysis from '../../../../../screens/dashboard/analyze/strategy';

const Stack = createNativeStackNavigator();
const StrategyAnalysisStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="strategiesAnalysis" component={StrategyAnalysis} />
      <Stack.Screen
        name="detailedStrategyAnalysis"
        component={DetailedStrategyAnalysis}
      />
    </Stack.Navigator>
  );
};

export default StrategyAnalysisStack;

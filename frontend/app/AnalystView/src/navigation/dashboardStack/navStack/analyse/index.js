// Module imports
import React from 'react';
import {Icon, TabBar, Tab} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// File imports
import StrategyAnalysisStack from './strategyAnalysis';
import TradesAnalysisStack from './tradeAnalysis';
import {ICONS} from '../../../../assets/theme';
import {SCREEN_NAMES, ANALYSE_SCREEN_TAB_HEADINGS} from '../../../constants';
import CustomTabBar from './customTabBar';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const strategyIcon = props => {
  return <Icon {...props} name={ICONS.bar_chart_outline} />;
};
const TradesIcon = props => {
  return <Icon {...props} name={ICONS.activity_outline} />;
};

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab
      title={ANALYSE_SCREEN_TAB_HEADINGS.STRATEGY_ANALYSIS}
      icon={strategyIcon}
      style={{marginTop: 10}}
    />
    <Tab
      title={ANALYSE_SCREEN_TAB_HEADINGS.TRADE_ANALYSIS}
      icon={TradesIcon}
      style={{marginTop: 10}}
    />
  </TabBar>
);

const AnalyseStack = () => {
  return (
    <Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => <TopTabBar {...props} />}>
      <Screen
        options={{tabBarLabel: ANALYSE_SCREEN_TAB_HEADINGS.STRATEGY_ANALYSIS}}
        name={SCREEN_NAMES.STRATEGY_ANALYSIS_SCREEN}
        component={StrategyAnalysisStack}
      />
      <Screen
        options={{tabBarLabel: ANALYSE_SCREEN_TAB_HEADINGS.TRADE_ANALYSIS}}
        name={SCREEN_NAMES.TRADE_ANALYSIS_SCREEN}
        component={TradesAnalysisStack}
      />
    </Navigator>
  );
};

export default AnalyseStack;

// Module imports
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Files imports
import Setting from '../../../screens/dashboard/setting';
import {COLORS} from '../../../assets/theme';
import AddNavStack from '../navStack/add';
import AnalyseStack from '../navStack/analyse';
import TabBar from './tabBar';
import {SCREEN_NAMES, BOTTOM_NAV_HEADINGS} from '../../constants';

const Tab = createBottomTabNavigator();

const BottomNavStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.ADD_SCREEN}
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.dark_grey,
        headerShown: false,
      }}>
      <Tab.Screen
        name={SCREEN_NAMES.ADD_SCREEN}
        component={AddNavStack}
        options={{
          tabBarLabel: BOTTOM_NAV_HEADINGS.ADD,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ANALYSE_SCREEN}
        component={AnalyseStack}
        options={{
          tabBarLabel: BOTTOM_NAV_HEADINGS.ANALYSE,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.SETTINGS_SCREEN}
        component={Setting}
        options={{
          tabBarLabel: BOTTOM_NAV_HEADINGS.SETTING,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavStack;

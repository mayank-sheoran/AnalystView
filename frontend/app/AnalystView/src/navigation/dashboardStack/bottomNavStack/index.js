import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, Text} from '@ui-kitten/components';

// Import files
import AddToJournal from '../../../screens/dashboard/add';
import Analyse from '../../../screens/dashboard/analyze';
import Strategy from '../../../screens/dashboard/strategy';
import Setting from '../../../screens/dashboard/setting';
import {COLORS} from '../../../assets/theme';

const Tab = createBottomTabNavigator();

const BottomNavStack = () => {
  const getTitleCard = (title, info) => {
    return <Text style={{fontSize: 12, color: info.color}}>{title}</Text>;
  };

  return (
    <Tab.Navigator
      initialRouteName="add"
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.dark_grey,
        headerShown: false,
      }}>
      <Tab.Screen
        name="add"
        component={AddToJournal}
        options={{
          tabBarLabel: info => getTitleCard('Add', info),
          tabBarIcon: ({color, size}) => (
            <Icon width={size} height={size} fill={color} name="plus-circle" />
          ),
        }}
      />
      <Tab.Screen
        name="analyze"
        component={Analyse}
        options={{
          tabBarLabel: info => getTitleCard('Analyze', info),
          tabBarIcon: ({color, size}) => (
            <Icon width={size} height={size} fill={color} name="options-2" />
          ),
        }}
      />
      <Tab.Screen
        name="strategy"
        component={Strategy}
        options={{
          tabBarLabel: info => getTitleCard('Stategy', info),
          tabBarIcon: ({color, size}) => (
            <Icon width={size} height={size} fill={color} name="trending-up" />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarLabel: info => getTitleCard('Setting', info),
          tabBarIcon: ({color, size}) => (
            <Icon width={size} height={size} fill={color} name="settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavStack;

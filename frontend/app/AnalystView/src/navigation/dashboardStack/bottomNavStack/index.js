import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@ui-kitten/components';

// Import files
import AddToJournal from '../../../screens/dashboard/add';
import Analyse from '../../../screens/dashboard/analyze';
import Strategy from '../../../screens/dashboard/strategy';
import Setting from '../../../screens/dashboard/setting';
import {COLORS} from '../../../assets/theme';
import styles from './styles';

const Tab = createBottomTabNavigator();

const BottomNavStack = () => {
  const TabBar = ({state, descriptors, navigation}) => {
    const tabIcons = state.routes.map((route, index) => {
      const {options} = descriptors[route.key];
      const label = options.tabBarLabel;
      const iconName =
        route.name === 'add'
          ? 'plus-circle'
          : route.name === 'analyze'
          ? 'options-2'
          : route.name === 'strategy'
          ? 'trending-up'
          : 'settings';
      const isFocused = state.index === index;
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate({name: route.name, merge: true});
        }
      };
      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={isFocused ? {selected: true} : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          key={index}
          style={{flex: 1, alignItems: 'center'}}>
          <Icon
            width={24}
            height={24}
            fill={isFocused ? COLORS.blue : COLORS.black}
            name={iconName}
          />
          <Text style={{color: isFocused ? COLORS.blue : COLORS.black}}>
            {label}
          </Text>
        </TouchableOpacity>
      );
    });
    return <View style={styles.tabBar}>{tabIcons}</View>;
  };

  return (
    <Tab.Navigator
      initialRouteName="add"
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue,
        tabBarInactiveTintColor: COLORS.dark_grey,
        headerShown: false,
      }}>
      <Tab.Screen
        name="add"
        component={AddToJournal}
        options={{
          tabBarLabel: 'Add',
        }}
      />
      <Tab.Screen
        name="analyze"
        component={Analyse}
        options={{
          tabBarLabel: 'Analyze',
        }}
      />
      <Tab.Screen
        name="strategy"
        component={Strategy}
        options={{
          tabBarLabel: 'Stategy',
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavStack;

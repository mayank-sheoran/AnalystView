import React from 'react';
import {View} from 'react-native';
import {Button, Icon, TabBar, Tab} from '@ui-kitten/components';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Import files
import StrategyAnalysisStack from './strategyAnalysis';
import TradesAnalysisStack from './tradeAnalysis';
import {COLORS} from '../../../../assets/theme';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const strategyIcon = props => {
  return <Icon {...props} name="bar-chart-outline" />;
};
const TradesIcon = props => {
  return <Icon {...props} name="activity-outline" />;
};

const CustomTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 5,
        height: 'auto',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-around',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icon =
          route.name === 'strategyAnalysis' ? strategyIcon : TradesIcon;

        return (
          <Button
            onPress={onPress}
            style={{width: 150}}
            size="small"
            onLongPress={onLongPress}
            accessoryLeft={icon}
            appearance={isFocused ? 'filled' : 'outline'}>
            {label}
          </Button>
          //   <TouchableOpacity
          //     accessibilityRole="button"
          //     accessibilityState={isFocused ? {selected: true} : {}}
          //     accessibilityLabel={options.tabBarAccessibilityLabel}
          //     testID={options.tabBarTestID}
          //     onPress={onPress}
          //     onLongPress={onLongPress}
          //     style={{
          //       flex: 1,
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //       borderRadius: 5,
          //       marginHorizontal: 10,
          //       co
          //       backgroundColor: isFocused ? COLORS.blue : COLORS.light_grey,
          //     }}>
          //     <Text>{label}</Text>
          //   </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab
      title="Strategy Analysis"
      icon={strategyIcon}
      style={{marginTop: 10}}
    />
    <Tab title="Trades Analysis" icon={TradesIcon} style={{marginTop: 10}} />
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
        options={{tabBarLabel: 'Strategy Analysis'}}
        name="strategyAnalysis"
        component={StrategyAnalysisStack}
      />
      <Screen
        options={{tabBarLabel: 'Trades Analysis'}}
        name="tradeAnalysis"
        component={TradesAnalysisStack}
      />
    </Navigator>
  );
};

export default AnalyseStack;

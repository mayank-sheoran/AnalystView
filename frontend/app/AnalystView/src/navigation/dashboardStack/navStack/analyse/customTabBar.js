// Module imports
import React from 'react';
import {View} from 'react-native';
import {Button, Icon} from '@ui-kitten/components';

// File imports
import {COLORS, ICONS} from '../../../../assets/theme';
import {SCREEN_NAMES} from '../../../constants';

const strategyIcon = props => {
  return <Icon {...props} name={ICONS.bar_chart_outline} />;
};
const TradesIcon = props => {
  return <Icon {...props} name={ICONS.activity_outline} />;
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
          route.name === SCREEN_NAMES.STRATEGY_ANALYSIS_SCREEN
            ? strategyIcon
            : TradesIcon;

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
        );
      })}
    </View>
  );
};

export default CustomTabBar;

// Module imports
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from '@ui-kitten/components';

// Files imports
import {COLORS, ICONS} from '../../../assets/theme';
import styles from './styles';
import {SCREEN_NAMES} from '../../constants';

const TabBar = ({state, descriptors, navigation}) => {
  const tabIcons = state.routes.map((route, index) => {
    const {options} = descriptors[route.key];
    const label = options.tabBarLabel;
    const iconName =
      route.name === SCREEN_NAMES.ADD_SCREEN
        ? ICONS.plus_circle
        : route.name === SCREEN_NAMES.ANALYSE_SCREEN
        ? ICONS.options_2
        : route.name === SCREEN_NAMES.SETTINGS_SCREEN
        ? ICONS.settings
        : null;
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

export default TabBar;

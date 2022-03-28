import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import {
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

// Import files
import styles from './styles';

const Header = ({title, theme, color, backBtn, navigation, backScreen}) => {
  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => {
    const appearance = theme === 'dark' ? 'control' : 'default';
    if (!backBtn) {
      return null;
    }
    return (
      <TopNavigationAction
        icon={BackIcon}
        appearance={appearance}
        onPress={() => navigation.navigate(backScreen)}
      />
    );
  };
  const GetStatusBar = ({backgroundColor}) => {
    const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
    return (
      <View style={[styles.statusBar, {backgroundColor}]}>
        <SafeAreaView>
          <StatusBar
            translucent
            backgroundColor={backgroundColor}
            barStyle={barStyle}
          />
        </SafeAreaView>
      </View>
    );
  };
  const txtColor = theme === 'dark' ? 'white' : 'black';
  return (
    <>
      <GetStatusBar backgroundColor={color} />
      <TopNavigation
        style={(styles.baseContainer, {backgroundColor: color})}
        accessoryLeft={BackAction}
        title={() => (
          <Text style={{color: txtColor, fontWeight: '700'}}>{title}</Text>
        )}
        alignment="center"
      />
    </>
  );
};

export default Header;

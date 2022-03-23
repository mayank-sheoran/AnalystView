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

const BackBtn = props => {
  const BackIcon = props => <Icon {...props} name="arrow-back" />;
  const BackAction = () => {
    const appearance = props.theme === 'dark' ? 'control' : 'default';
    return (
      <TopNavigationAction
        icon={BackIcon}
        appearance={appearance}
        onPress={() => props.navigation.navigate(props.backScreen)}
      />
    );
  };
  const GetStatusBar = ({backgroundColor}) => {
    const barStyle = props.theme === 'dark' ? 'light-content' : 'dark-content';
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
  const txtColor = props.theme === 'dark' ? 'white' : 'black';
  return (
    <>
      <GetStatusBar backgroundColor={props.color} />
      <TopNavigation
        style={(styles.baseContainer, {backgroundColor: props.color})}
        accessoryLeft={BackAction}
        title={() => (
          <Text style={{color: txtColor, fontWeight: '700'}}>
            {props.title}
          </Text>
        )}
        alignment="center"
      />
    </>
  );
};

export default BackBtn;

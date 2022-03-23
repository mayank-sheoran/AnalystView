import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import styles from './styles';

// Import files
import Feature from './feature';
import LoginInputs from './loginInput';

const Welcome = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.baseContainer}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logos/black_with_text.png')}
          />
          <View style={styles.featuresContainer}>
            <Feature value="Analyse Your Trades" dir="left" color="red" />
            <Feature value="Trading Journal" dir="right" color="green" />
            <Feature
              value="Learn from your past trades"
              dir="left"
              color="red"
            />
            <Feature
              value="Find your trading style"
              dir="right"
              color="green"
            />
          </View>
          <View style={styles.loginContainer}>
            <LoginInputs navigation={navigation} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Welcome;

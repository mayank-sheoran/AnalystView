// Modules imports
import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';

// File imports
import Feature from './feature';
import LoginInputs from './loginInput';
import styles from './styles';
import {COLORS} from '../../../assets/theme';
import {DIRECTION, FEATURES} from './constants';

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
            <Feature
              value={FEATURES.FEATURE1}
              dir={DIRECTION.LEFT}
              color={COLORS.red}
            />
            <Feature
              value={FEATURES.FEATURE2}
              dir={DIRECTION.RIGHT}
              color={COLORS.green}
            />
            <Feature
              value={FEATURES.FEATURE3}
              dir={DIRECTION.LEFT}
              color={COLORS.red}
            />
            <Feature
              value={FEATURES.FEATURE4}
              dir={DIRECTION.RIGHT}
              color={COLORS.green}
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

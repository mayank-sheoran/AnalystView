import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@ui-kitten/components';

// Import Files
import styles from './styles';

const Popup = ({children}) => {
  return (
    <View style={styles.base}>
      <View style={styles.popupContainer}>{children}</View>
    </View>
  );
};

export default Popup;

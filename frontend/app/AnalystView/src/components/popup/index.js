// Import Modules
import React from 'react';
import {View} from 'react-native';

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

// Module Imports
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

// File Imports
import styles from './styles';
import {COLORS} from '../../assets/theme';

const Loading = props => {
  return props.loading ? (
    <View style={styles.baseContainer}>
      <ActivityIndicator size="small" color={COLORS.blue} />
    </View>
  ) : (
    props.children
  );
};

export default Loading;

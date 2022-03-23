import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

const Loading = props => {
  return props.loading ? (
    <View style={styles.baseContainer}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  ) : (
    props.children
  );
};

export default Loading;

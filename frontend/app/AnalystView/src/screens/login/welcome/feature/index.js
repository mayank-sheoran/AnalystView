import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const Feature = props => {
  const bgColor = props.color === 'red' ? '#EC2B01' : '#06EC01';
  const txtColor = props.color === 'red' ? 'white' : 'black';
  const position = props.dir === 'left' ? true : false;
  return (
    <View style={styles.featureContainer}>
      <View
        style={[
          styles.feature,
          {backgroundColor: bgColor},
          position && {left: 0},
          !position && {right: 0},
        ]}>
        <Text style={{color: txtColor, fontWeight: '700'}}>{props.value}</Text>
      </View>
      <View style={styles.horizontalBar} />
    </View>
  );
};

export default Feature;

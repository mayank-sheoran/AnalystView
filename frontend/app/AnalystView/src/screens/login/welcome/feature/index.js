// Module imports
import React from 'react';
import {View, Text} from 'react-native';

// File imports
import styles from './styles';
import {COLORS} from '../../../../assets/theme';
import {DIRECTION} from '../constants';

const Feature = props => {
  const bgColor = props.color;
  const txtColor = props.color === COLORS.red ? COLORS.white : COLORS.black;
  const position = props.dir === DIRECTION.LEFT ? true : false;
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

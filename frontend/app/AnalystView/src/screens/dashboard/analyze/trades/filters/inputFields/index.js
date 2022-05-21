/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import styles from './styles';
import DoubleSlider from './doubleSlider';
import {
  setPnlRange,
  setPnlPercRange,
} from '../../../../../../redux/actions/analysis';

const InputFields = ({
  pnlRange,
  pnlPercRange,
  setPnlRange,
  setPnlPercRange,
}) => {
  if (pnlRange === undefined || pnlPercRange === undefined) {
    return null;
  }
  return (
    <View style={styles.base}>
      <View style={styles.inputField}>
        <Text>{`PNL range: ${pnlRange[0]} - ${pnlRange[1]}`}</Text>
        <DoubleSlider range={pnlRange} setRange={setPnlRange} />
      </View>
      <View style={styles.inputField}>
        <Text>{`PNL % range: ${pnlPercRange[0]} - ${pnlPercRange[1]}`}</Text>
        <DoubleSlider range={pnlPercRange} setRange={setPnlPercRange} />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis} = state;
  const {pnlRange, pnlPercRange} = analysis;
  return {pnlRange, pnlPercRange};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setPnlRange,
      setPnlPercRange,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputFields);

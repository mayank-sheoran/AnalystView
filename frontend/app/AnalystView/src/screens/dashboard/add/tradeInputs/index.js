import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input, Icon} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import styles from './styles';
import {COLORS} from '../../../../assets/theme';
import {setPnl, setPnlPerc, setDesc} from '../../../../redux/actions/add';

const TradeInputs = ({add, setDesc, setPnl, setPnlPerc}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>PNL Amount</Text>
        <Input
          style={{width: 200}}
          placeholder="Amount"
          keyboardType="numeric"
          value={add.pnl}
          onChangeText={nextValue => setPnl(nextValue)}
        />
        <TouchableOpacity style={{marginLeft: 10}}>
          <Icon
            style={{width: 24, height: 24}}
            fill={COLORS.black}
            name="info-outline"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>PNL %</Text>
        <Input
          style={{width: 200}}
          placeholder="Percentage"
          keyboardType="numeric"
          value={add.pnlPerc}
          onChangeText={nextValue => setPnlPerc(nextValue)}
        />
        <TouchableOpacity style={{marginLeft: 10}}>
          <Icon
            style={{width: 24, height: 24}}
            fill={COLORS.black}
            name="info-outline"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>Description</Text>
        <Input
          style={{width: 200}}
          placeholder="Optional"
          multiline={true}
          value={add.desc}
          onChangeText={nextValue => setDesc(nextValue)}
        />
        <TouchableOpacity style={{marginLeft: 10}}>
          <Icon
            style={{width: 24, height: 24}}
            fill={COLORS.black}
            name="info-outline"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  return {add};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setPnl,
      setDesc,
      setPnlPerc,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TradeInputs);

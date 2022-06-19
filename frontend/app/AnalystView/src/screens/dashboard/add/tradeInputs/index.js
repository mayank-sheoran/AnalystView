import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input, Icon} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import styles from './styles';
import {COLORS} from '../../../../assets/theme';
import {setTradeInputs} from '../../../../redux/actions/add';

const TradeInputs = ({pnl, pnlPerc, desc, setTradeInputs}) => {
  return (
    <View style={styles.base}>
      <View style={styles.inputContainer}>
        <Text style={styles.txt}>PNL Amount</Text>
        <Input
          style={{width: 200, borderRadius: 5}}
          placeholder="Amount"
          keyboardType="numeric"
          value={pnl}
          onChangeText={nextValue => setTradeInputs('pnl', nextValue)}
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
        <Text style={styles.txt}>Capital Used</Text>
        <Input
          style={{width: 200, borderRadius: 5}}
          placeholder="Amount"
          keyboardType="numeric"
          value={pnlPerc}
          onChangeText={nextValue => setTradeInputs('pnlPerc', nextValue)}
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
          style={{width: 200, borderRadius: 5}}
          textStyle={{height: 80}}
          placeholder="Optional"
          multiline={true}
          value={desc}
          onChangeText={nextValue => setTradeInputs('description', nextValue)}
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
  const {pnl, pnlPerc, desc} = add;
  return {pnl, desc, pnlPerc};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTradeInputs,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TradeInputs);

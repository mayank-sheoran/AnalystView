import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Icon} from '@ui-kitten/components';

// Import Files
import Header from '../../../components/Header';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import StrategySelect from './strategySelect';
import {
  setDate,
  showDatePicker,
  showStrategySelect,
  setTradeType,
  setTrade,
} from '../../../redux/actions/add';
import {trade, tradeType} from './constants';

const AddToJournal = ({
  add,
  setDate,
  showDatePicker,
  showStrategySelect,
  setTradeType,
  setTrade,
}) => {
  const profitIcon = props => {
    return <Icon {...props} name="trending-up" />;
  };
  const lossIcon = props => {
    return <Icon {...props} name="trending-down" />;
  };
  console.log(add);
  return (
    <View style={{flex: 1}}>
      <Header
        title="Add To Journal"
        theme="dark"
        color={COLORS.blue}
        backBtn={false}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          {add.show.selectStrategy && <StrategySelect />}
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>Date</Text>
            <Button size="small" onPress={() => showDatePicker(true)}>
              Select Date
            </Button>
            <DatePicker
              modal
              style={styles.datePicker}
              open={add.show.datePicker}
              date={add.date}
              onConfirm={date => {
                setDate(date);
                showDatePicker(false);
              }}
              onCancel={() => {
                showDatePicker(false);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>Strategy</Text>
            <Button size="small" onPress={() => showStrategySelect(true)}>
              Select Strategy
            </Button>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>Trade Type</Text>
            <Button
              style={styles.btn}
              appearance={
                add.tradeType === tradeType.PAPER_TRADE ? 'filled' : 'outline'
              }
              onPress={() => setTradeType(tradeType.PAPER_TRADE)}
              size="small">
              Paper
            </Button>
            <Button
              style={styles.btn}
              appearance={
                add.tradeType === tradeType.REAL_TRADE ? 'filled' : 'outline'
              }
              onPress={() => setTradeType(tradeType.REAL_TRADE)}
              size="small">
              Real
            </Button>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>Trade</Text>
            <Button
              style={styles.btn}
              appearance={add.trade === trade.PROFIT ? 'filled' : 'outline'}
              onPress={() => setTrade(trade.PROFIT)}
              size="small">
              Profit
            </Button>
            <Button
              style={styles.btn}
              appearance={add.trade === trade.LOSS ? 'filled' : 'outline'}
              onPress={() => setTrade(trade.LOSS)}
              size="small">
              Loss
            </Button>
          </View>
        </ScrollView>
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
      setDate,
      showDatePicker,
      showStrategySelect,
      setTradeType,
      setTrade,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournal);

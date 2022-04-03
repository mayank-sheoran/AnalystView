import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CheckBox, Button, Icon, Input} from '@ui-kitten/components';

// Import Files
import Header from '../../../components/Header';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import StrategySelect from './selectStrategy';
import {
  setDate,
  showDatePicker,
  showStrategySelect,
  setTradeType,
  setTrade,
  setPnl,
  setPnlPerc,
  setDesc,
  setBookmark,
  setLoadings,
} from '../../../redux/actions/add';
import {trade, tradeType} from './constants';
import Loading from '../../../components/loading';
import ImageSelector from './selectImage';

const AddToJournal = ({
  add,
  setDate,
  showDatePicker,
  showStrategySelect,
  setTradeType,
  setTrade,
  setPnl,
  setPnlPerc,
  setDesc,
  setBookmark,
  setLoadings,
}) => {
  const profitIcon = props => {
    return <Icon {...props} name="trending-up" />;
  };
  const lossIcon = props => {
    return <Icon {...props} name="trending-down" />;
  };
  const paperTradeIcon = props => {
    return <Icon {...props} name="file-text-outline" />;
  };
  const realTradeIcon = props => {
    return <Icon {...props} name="flash-outline" />;
  };
  console.log(add.show);
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
              accessoryLeft={paperTradeIcon}
              appearance={
                add.tradeType === tradeType.PAPER_TRADE ? 'filled' : 'outline'
              }
              onPress={() => setTradeType(tradeType.PAPER_TRADE)}
              size="small">
              Paper
            </Button>
            <Button
              style={styles.btn}
              accessoryLeft={realTradeIcon}
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
              accessoryLeft={profitIcon}
              appearance={add.trade === trade.PROFIT ? 'filled' : 'outline'}
              onPress={() => setTrade(trade.PROFIT)}
              size="small">
              Profit
            </Button>
            <Button
              style={styles.btn}
              accessoryLeft={lossIcon}
              appearance={add.trade === trade.LOSS ? 'filled' : 'outline'}
              onPress={() => setTrade(trade.LOSS)}
              size="small">
              Loss
            </Button>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>PNL Amount</Text>
            <Input
              style={{width: 200}}
              placeholder="Amount"
              keyboardType="numeric"
              value={add.pnl}
              onChangeText={nextValue => setPnl(nextValue)}
            />
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
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.txt}>Snapshot</Text>
            <Loading loading={add.loadings.upload}>
              <ImageSelector />
            </Loading>
            <TouchableOpacity style={{marginLeft: 10}}>
              <Icon
                style={{width: 24, height: 24}}
                fill={COLORS.black}
                name="info-outline"
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, {height: 40, marginBottom: 80}]}>
            <Text style={styles.txt}>Bookmark</Text>
            <CheckBox
              checked={add.bookmark}
              onChange={nextChecked => setBookmark(nextChecked)}
            />
          </View>
        </ScrollView>
      </View>
      {!add.show.selectStrategy ? (
        <View style={styles.submitBtnContainer}>
          <Button style={styles.submitBtn} size="medium">
            Add To Journal
          </Button>
        </View>
      ) : null}
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
      setPnl,
      setPnlPerc,
      setDesc,
      setBookmark,
      setLoadings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournal);

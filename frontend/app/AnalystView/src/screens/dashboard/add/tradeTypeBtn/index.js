// Module imports
import React from 'react';
import {View} from 'react-native';
import {Icon, Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// File imports
import styles from './styles';
import {setTradeType, setTrade} from '../../../../redux/actions/add';
import {TRADE_TYPE, TRADE} from '../constants';

const TradeTypeBtn = ({trade, tradeType, setTrade, setTradeType}) => {
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
  return (
    <View>
      <View style={styles.twoBtnContainer}>
        <Button
          style={{width: '48%'}}
          accessoryLeft={paperTradeIcon}
          appearance={
            tradeType === TRADE_TYPE.PAPER_TRADE ? 'filled' : 'outline'
          }
          onPress={() => setTradeType(TRADE_TYPE.PAPER_TRADE)}
          size="small">
          Paper Trade
        </Button>
        <Button
          style={{width: '48%'}}
          accessoryLeft={realTradeIcon}
          appearance={
            tradeType === TRADE_TYPE.REAL_TRADE ? 'filled' : 'outline'
          }
          onPress={() => setTradeType(TRADE_TYPE.REAL_TRADE)}
          size="small">
          Real Trade
        </Button>
      </View>
      <View style={styles.twoBtnContainer}>
        <Button
          style={{width: '48%'}}
          accessoryLeft={profitIcon}
          appearance={trade === TRADE.PROFIT ? 'filled' : 'outline'}
          onPress={() => setTrade(TRADE.PROFIT)}
          size="small">
          Profit
        </Button>
        <Button
          style={{width: '48%'}}
          accessoryLeft={lossIcon}
          appearance={trade === TRADE.LOSS ? 'filled' : 'outline'}
          onPress={() => setTrade(TRADE.LOSS)}
          size="small">
          Loss
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  const {trade, tradeType} = add;
  return {trade, tradeType};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTradeType,
      setTrade,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TradeTypeBtn);

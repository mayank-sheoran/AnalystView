import React from 'react';
import {View} from 'react-native';
import {Icon, Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import styles from './styles';
import {setTradeType, setTrade} from '../../../../redux/actions/add';
import {tradeType, trade} from '../constants';

const TradeTypeBtn = ({add, setTrade, setTradeType}) => {
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
            add.tradeType === tradeType.PAPER_TRADE ? 'filled' : 'outline'
          }
          onPress={() => setTradeType(tradeType.PAPER_TRADE)}
          size="small">
          Paper Trade
        </Button>
        <Button
          style={{width: '48%'}}
          accessoryLeft={realTradeIcon}
          appearance={
            add.tradeType === tradeType.REAL_TRADE ? 'filled' : 'outline'
          }
          onPress={() => setTradeType(tradeType.REAL_TRADE)}
          size="small">
          Real Trade
        </Button>
      </View>
      <View style={styles.twoBtnContainer}>
        <Button
          style={{width: '48%'}}
          accessoryLeft={profitIcon}
          appearance={add.trade === trade.PROFIT ? 'filled' : 'outline'}
          onPress={() => setTrade(trade.PROFIT)}
          size="small">
          Profit
        </Button>
        <Button
          style={{width: '48%'}}
          accessoryLeft={lossIcon}
          appearance={add.trade === trade.LOSS ? 'filled' : 'outline'}
          onPress={() => setTrade(trade.LOSS)}
          size="small">
          Loss
        </Button>
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
      setTradeType,
      setTrade,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(TradeTypeBtn);

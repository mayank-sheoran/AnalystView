/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import styles from './styles';
import {setButtonStatus} from '../../../../../../redux/actions/analysis';
import {
  PNL_BUTTON_STATUS,
  TRADE_BUTTON_STATUS,
} from '../../../../../../redux/constants/analysis';

const FilterInputButtons = ({pnl, trade, setButtonStatus}) => {
  return (
    <View style={styles.base}>
      <View style={styles.buttonContainer}>
        <Text style={{width: 40, marginLeft: 10, fontSize: 14}}>PNL</Text>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            style={styles.button}
            onPress={() =>
              setButtonStatus({pnl: PNL_BUTTON_STATUS.PROFIT, trade})
            }
            size="small"
            appearance={
              pnl === PNL_BUTTON_STATUS.PROFIT ? 'filled' : 'outline'
            }>
            Profit
          </Button>
          <Button
            style={styles.button}
            onPress={() =>
              setButtonStatus({pnl: PNL_BUTTON_STATUS.LOSS, trade})
            }
            size="small"
            appearance={pnl === PNL_BUTTON_STATUS.LOSS ? 'filled' : 'outline'}>
            Loss
          </Button>
          <Button
            style={styles.button}
            size="small"
            onPress={() =>
              setButtonStatus({pnl: PNL_BUTTON_STATUS.BOTH, trade})
            }
            appearance={pnl === PNL_BUTTON_STATUS.BOTH ? 'filled' : 'outline'}>
            Both
          </Button>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={{width: 40, marginLeft: 10, fontSize: 14}}>Trade</Text>
        <View
          style={{
            flex: 1,
            marginHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            style={styles.button}
            onPress={() =>
              setButtonStatus({trade: TRADE_BUTTON_STATUS.REAL_TRADE, pnl})
            }
            size="small"
            appearance={
              trade === TRADE_BUTTON_STATUS.REAL_TRADE ? 'filled' : 'outline'
            }>
            Real Trade
          </Button>
          <Button
            style={styles.button}
            onPress={() =>
              setButtonStatus({trade: TRADE_BUTTON_STATUS.PAPER_TRADE, pnl})
            }
            size="small"
            appearance={
              trade === TRADE_BUTTON_STATUS.PAPER_TRADE ? 'filled' : 'outline'
            }>
            Paper Trade
          </Button>
          <Button
            style={styles.button}
            onPress={() =>
              setButtonStatus({trade: TRADE_BUTTON_STATUS.BOTH, pnl})
            }
            size="small"
            appearance={
              trade === TRADE_BUTTON_STATUS.BOTH ? 'filled' : 'outline'
            }>
            Both
          </Button>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis} = state;
  const {pnl, trade} = analysis;
  return {pnl, trade};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setButtonStatus,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterInputButtons);

// Module imports
import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// File imports
import {COLORS} from '../../../../../assets/theme';
import {
  setFilters,
  resetState,
  refetchTrades,
} from '../../../../../redux/actions/analysis';
import {SCREEN_NAMES} from '../../../../../navigation/constants';

const ApplyFilters = ({
  navigation,
  refetchTrades,
  setFilters,
  analysis,
  resetState,
}) => {
  const handleApplyFilters = () => {
    setFilters({
      pnl: analysis.pnl,
      trade: analysis.trade,
      strategiesUsed: analysis.strategiesUsed,
      pnlRange: analysis.pnlRange,
      pnlPercRange: analysis.pnlPercRange,
      bookmark: analysis.bookmark,
    });
    refetchTrades();
    navigation.navigate(SCREEN_NAMES.TRADE_ANALYSIS_SCREEN);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <Button
        style={{
          width: '45%',
          margin: 10,
          alignSelf: 'center',
        }}
        onPress={() => resetState()}
        size="medium"
        appearance="outline">
        Reset Filters
      </Button>
      <Button
        style={{
          width: '45%',
          margin: 10,
          alignSelf: 'center',
          backgroundColor: COLORS.black,
        }}
        onPress={handleApplyFilters}
        size="medium"
        appearance="filled">
        Apply
      </Button>
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis} = state;
  return {analysis};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setFilters,
      resetState,
      refetchTrades,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyFilters);

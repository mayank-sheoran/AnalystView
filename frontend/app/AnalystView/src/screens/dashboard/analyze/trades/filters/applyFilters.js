import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import files
import {COLORS} from '../../../../../assets/theme';
import {
  setFilters,
  resetState,
  refetchTrades,
} from '../../../../../redux/actions/analysis';

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
    navigation.navigate('tradesAnalysis');
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

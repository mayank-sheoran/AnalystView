import React from 'react';
import {View, Text} from 'react-native';

// Import Files
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import {HEADER_THEME} from '../../../../components/header/constants';

const TradesAnalysis = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Trades"
        theme={HEADER_THEME.LIGHT}
        color={COLORS.white}
        backBtn={false}
      />
      <Text>Trades Analysis</Text>
    </View>
  );
};

export default TradesAnalysis;

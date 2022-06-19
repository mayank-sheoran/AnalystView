/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import _ from 'lodash';

// Import Files
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import styles from './styles';
import FullScreenImage from './fullScreenImage';
import Loading from '../../../../components/loading';
import TradeInfoBottomSheet from './tradeInfoBottomSheet';
import {fetchUserTrades} from './utils';
import {SCREEN_NAMES} from '../../../../navigation/constants';
import TradeCard from './tradeCard';
import {HEADER_DETAILS} from './constants';

const TradesAnalysis = ({navigation, appliedFilters, refetchTrades, login}) => {
  const [trades, setTrades] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const bottomSheetRef = useRef();

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchUserTrades({
        setLoading,
        setImageUrls,
        appliedFilters,
        setTrades,
        login,
      });
    });
  }, [refetchTrades]);

  const getTradeCards = trades.map(trade => {
    const snapshotUUID = trade.tradeId;
    if (!snapshotUUID) {
      return;
    }
    return (
      <TradeCard
        imageUrls={imageUrls}
        snapshotUUID={snapshotUUID}
        setFullScreenImage={setFullScreenImage}
        setSelectedTrade={setSelectedTrade}
        bottomSheetRef={bottomSheetRef}
        trade={trade}
      />
    );
  });

  const NoTradeCard = () => {
    if (_.isEmpty(trades)) {
      return (
        <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
          <Text>No trades available!</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {useIsFocused() && (
        <Header
          title={HEADER_DETAILS.TITLE}
          theme={HEADER_DETAILS.THEME}
          color={COLORS.white}
          backBtn={false}
        />
      )}
      {fullScreenImage !== null && (
        <FullScreenImage
          fullScreenImage={fullScreenImage}
          setFullScreenImage={setFullScreenImage}
        />
      )}
      <View style={styles.base}>
        <View style={styles.filterBtnContainer}>
          <Button
            style={styles.filterBtn}
            size="medium"
            appearance="outline"
            onPress={() =>
              navigation.navigate(SCREEN_NAMES.TRADE_FILTER_SCREEN)
            }>
            Add Filters
          </Button>
        </View>
        <Loading loading={loading}>
          <View style={styles.tradesContainer}>
            <ScrollView>
              {getTradeCards}
              <NoTradeCard />
            </ScrollView>
          </View>
        </Loading>
      </View>
      <TradeInfoBottomSheet
        bottomSheetRef={bottomSheetRef}
        selectedTrade={selectedTrade}
      />
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis, login} = state;
  const {appliedFilters, refetchTrades} = analysis;
  return {appliedFilters, refetchTrades, login};
};

export default connect(mapStateToProps, null)(TradesAnalysis);

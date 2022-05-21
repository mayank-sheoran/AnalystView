/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View, Button} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import moment from 'moment';

// Import files
import styles from './styles';

const TradeInfoBottomSheet = ({bottomSheetRef, selectedTrade}) => {
  // variables
  const snapPoints = useMemo(() => ['10%', '30%', '70%'], []);

  const handleSheetChanges = useCallback(index => {
    if (index === 0) {
      bottomSheetRef.current.close();
    }
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={styles.sheetContainer}>
      {selectedTrade && (
        <View style={styles.contentContainer}>
          <Text style={{fontSize: 22, fontWeight: '700', marginBottom: 20}}>
            Trade Summary
          </Text>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Traded On</Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {moment(selectedTrade.date).format('Do MMM YY')}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>PNL</Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {selectedTrade.pnl}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>PNL Perc</Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {selectedTrade.pnlPerc}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Strategies Used
            </Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {selectedTrade.strategiesUsed}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Trade Type</Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {selectedTrade.tradeType}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Trade Desciption
            </Text>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {selectedTrade.description}
            </Text>
          </View>
        </View>
      )}
    </BottomSheet>
  );
};

export default TradeInfoBottomSheet;

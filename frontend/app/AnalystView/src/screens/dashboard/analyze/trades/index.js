/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Button, Icon} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import axios from 'axios';

// Import Files
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import {HEADER_THEME} from '../../../../components/header/constants';
import styles from './styles';
import FullScreenImage from './fullScreenImage';
import {connect} from 'react-redux';
import Loading from '../../../../components/loading';
import TradeInfoBottomSheet from './tradeInfoBottomSheet';

const TradesAnalysis = ({navigation, appliedFilters, refetchTrades}) => {
  const [trades, setTrades] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const bottomSheetRef = useRef();

  const saveTradesImageUrls = async userTrades => {
    await Promise.all(
      userTrades.map(async trade => {
        const snapshotUUID = trade.tradeId;
        if (!snapshotUUID) {
          return;
        }
        const firebaseStorage = storage();
        const reference = firebaseStorage.ref(`/${snapshotUUID}`);
        const downloadUrl = await reference.getDownloadURL();
        console.log(snapshotUUID, downloadUrl);
        setImageUrls(prevState => ({
          ...prevState,
          [snapshotUUID]: downloadUrl,
        }));
      }),
    );
  };

  const fetchUserTrades = async () => {
    console.log('WORKING');
    setLoading(true);
    const response = await axios.post(
      'http://192.168.29.84:3001/getAllFilteredTrades',
      {
        userId: auth().currentUser.uid,
        strategiesUsed: appliedFilters.strategiesUsed,
        tradeType: appliedFilters.trade,
        trade: appliedFilters.pnl,
        pnlRange: appliedFilters.pnlRange,
        pnlPercRange: appliedFilters.pnlPercRange,
        bookmark: appliedFilters.bookmark,
      },
    );
    if (response.data.isError) {
      Alert.alert('Error', response.data.errMessage);
    } else {
      console.log(response.data.data);
      await saveTradesImageUrls(response.data.data);
      console.log('😞', imageUrls);
      setTrades(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserTrades();
  }, [refetchTrades]);

  const getTradeCards = trades.map(trade => {
    const snapshotUUID = trade.tradeId;
    if (!snapshotUUID) {
      return;
    }
    return (
      <View style={styles.tradeCard} key={snapshotUUID}>
        <TouchableWithoutFeedback
          onPress={() => setFullScreenImage(imageUrls[snapshotUUID])}>
          <Image
            source={{
              uri: imageUrls[snapshotUUID],
            }}
            style={styles.image}
          />
        </TouchableWithoutFeedback>

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => {
            setSelectedTrade(trade);
            console.log(trade);
            bottomSheetRef.current.expand();
          }}>
          <Icon
            style={{
              width: 30,
              height: 30,
            }}
            fill={COLORS.blue}
            name="expand-outline"
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {useIsFocused() && (
        <Header
          title="Trades"
          theme={HEADER_THEME.LIGHT}
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
            onPress={() => navigation.navigate('tradeFilters')}>
            Add Filters
          </Button>
        </View>
        <Loading loading={loading}>
          <View style={styles.tradesContainer}>
            <ScrollView>{getTradeCards}</ScrollView>
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
  const {analysis} = state;
  const {appliedFilters, refetchTrades} = analysis;
  return {appliedFilters, refetchTrades};
};

export default connect(mapStateToProps, null)(TradesAnalysis);

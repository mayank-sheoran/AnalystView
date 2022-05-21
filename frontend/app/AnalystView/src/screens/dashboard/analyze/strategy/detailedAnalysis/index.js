/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import axios from 'axios';
import {Card} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';

// Import Files
import Header from '../../../../../components/header';
import {COLORS} from '../../../../../assets/theme';
import styles from './styles';
import Loading from '../../../../../components/loading';
import {DETAILS_MAPPING, UNIT_TYPE} from './contants';
import {connect} from 'react-redux';

const DetailedStrategyAnalysis = ({navigation, route, login}) => {
  const {strategyName} = route.params;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchStrategyDetails = async () => {
    const response = await axios.post(
      'http://192.168.29.84:3001/getUserStrategyAnalysis',
      {userId: auth().currentUser.uid, strategy: strategyName},
    );
    if (response.data.isError) {
      setLoading(false);
      Alert.alert('Error', response.data.errMessage);
    } else {
      console.log(response.data.data.realTrades);
      setDetails(response.data.data.realTrades);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStrategyDetails();
  }, []);

  const getDetailsCard = Object.keys(details).map((detail, index) => {
    const data = DETAILS_MAPPING[detail];
    const heading = data.heading;
    const value =
      data.unitType === UNIT_TYPE.suffix
        ? `${details[detail]}${data.unit}`
        : `${login.currencySymbol}${details[detail]}`;
    return (
      <View style={[styles.detailContainer, styles.shadow]} key={detail}>
        <Text style={styles.headerText}>{heading}</Text>
        <Text>{value}</Text>
      </View>
    );
  });

  return (
    <View>
      {useIsFocused() && (
        <Header
          title={strategyName}
          theme="dark"
          color={COLORS.blue}
          backBtn={true}
          navigation={navigation}
          backScreen="strategiesAnalysis"
        />
      )}
      <Loading loading={loading}>
        <ScrollView>
          <View style={styles.base}>{getDetailsCard}</View>
        </ScrollView>
      </Loading>
    </View>
  );
};

const mapStateToProps = state => {
  const {login} = state;
  return {login};
};

export default connect(mapStateToProps, null)(DetailedStrategyAnalysis);

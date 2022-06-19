/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

// Import Files
import Header from '../../../../../components/header';
import {COLORS} from '../../../../../assets/theme';
import styles from './styles';
import Loading from '../../../../../components/loading';
import {DETAILS_MAPPING, UNIT_TYPE} from './contants';
import {fetchStrategyDetails} from '../utils';
import {SCREEN_NAMES} from '../../../../../navigation/constants';

const DetailedStrategyAnalysis = ({navigation, route, login}) => {
  const {strategyName} = route.params;
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchStrategyDetails({strategyName, setLoading, setDetails});
    });
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
          backScreen={SCREEN_NAMES.STRATEGY_ANALYSIS_SCREEN}
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

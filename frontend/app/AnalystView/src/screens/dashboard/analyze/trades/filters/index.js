/* eslint-disable react-hooks/exhaustive-deps */
import {Button, CheckBox} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';

// Import files
import Header from '../../../../../components/header';
import {HEADER_THEME} from '../../../../../components/header/constants';
import {COLORS} from '../../../../../assets/theme';
import styles from './styles';
import FilterInputButtons from './inputButtons';
import FilterInputFields from './inputFields';
import ApplyFilters from './applyFilters';
import {
  setBookmark,
  resetState,
  setFilters,
  savePrevFilters,
} from '../../../../../redux/actions/analysis';
import {bindActionCreators} from 'redux';

const Filters = ({
  navigation,
  bookmark,
  appliedFilters,
  strategiesUsed,
  setBookmark,
  savePrevFilters,
}) => {
  useEffect(() => {
    savePrevFilters(appliedFilters);
  }, []);

  const isStrategySelected = () => {
    if (strategiesUsed === null || strategiesUsed === undefined) {
      return false;
    }
    return Object.values(strategiesUsed).find(value => value === true);
  };

  const getStrategyText = () => {
    let text = '';
    const strategies = strategiesUsed;
    const empty = isStrategySelected();
    if (empty) {
      Object.keys(strategies).forEach(strategy => {
        if (strategies[strategy] === true) {
          text += strategy + ', ';
        }
      });
      if (text.length > 30) {
        return text.substring(0, 30) + '...';
      }
      return text.substring(0, text.length - 2);
    }
    return 'Select Strategy';
  };

  return (
    <View style={styles.base}>
      {useIsFocused() && (
        <Header
          title="Add Filters"
          theme={HEADER_THEME.DARK}
          color={COLORS.blue}
          backBtn={true}
          navigation={navigation}
          backScreen="tradesAnalysis"
        />
      )}
      <View style={styles.mainContainer}>
        <Button
          style={{
            width: '97%',
            marginTop: 10,
            alignSelf: 'center',
          }}
          size="medium"
          status={'primary'}
          appearance="outline"
          onPress={() => navigation.navigate('selectStrategy')}>
          {getStrategyText()}
        </Button>
        <FilterInputButtons />
        <FilterInputFields />
        <View style={{flexDirection: 'row', margin: 10}}>
          <Text style={styles.txt}>Bookmark</Text>
          <CheckBox
            checked={bookmark}
            onChange={nextChecked => setBookmark(nextChecked)}
          />
        </View>
      </View>
      <ApplyFilters navigation={navigation} />
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis} = state;
  const {strategiesUsed, bookmark, appliedFilters} = analysis;
  return {strategiesUsed, bookmark, appliedFilters};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setBookmark,
      resetState,
      setFilters,
      savePrevFilters,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

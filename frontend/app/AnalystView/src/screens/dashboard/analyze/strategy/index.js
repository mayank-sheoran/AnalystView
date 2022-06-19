// Module imports
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';

// Import Files
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import styles from './styles';
import {HEADER_THEME} from '../../../../components/header/constants';
import SearchBar from '../../../../components/searchBar';
import {fetchUserStrategies} from './utils';
import {SCREEN_NAMES} from '../../../../navigation/constants';

const StrategyAnalysis = ({navigation, login}) => {
  const [strategies, setStrategies] = useState([]);
  const [searchedStrategies, setSearchedStrategies] = useState([]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchUserStrategies({setSearchedStrategies, setStrategies, login});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const getStrategiesCard = searchedStrategies.map(strategy => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(SCREEN_NAMES.DETAILED_STRATEGY_ANALYSIS_SCREEN, {
            strategyName: strategy,
          })
        }
        style={styles.strategy}
        key={strategy}>
        <Text style={styles.txt}>{strategy}</Text>
        <Icon
          style={{
            width: 24,
            height: 24,
          }}
          fill={COLORS.blue}
          name="arrow-forward-outline"
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white, paddingBottom: 10}}>
      {useIsFocused() && (
        <Header
          title="Strategy"
          theme={HEADER_THEME.LIGHT}
          color={COLORS.white}
          backBtn={false}
        />
      )}
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SearchBar defaultData={strategies} saveData={setSearchedStrategies} />
      </View>
      <ScrollView>
        <View style={styles.base}>{getStrategiesCard}</View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  const {login} = state;
  return {login};
};

export default connect(mapStateToProps, null)(StrategyAnalysis);

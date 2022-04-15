import React, {useState, useEffect} from 'react';
import {View, Text, Alert, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {Icon} from '@ui-kitten/components';

// Import Files
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import styles from './styles';
import {HEADER_THEME} from '../../../../components/header/constants';
import SearchBar from '../../../../components/searchBar';

const StrategyAnalysis = ({navigation}) => {
  const [strategies, setStrategies] = useState([]);
  const [searchedStrategies, setSearchedStrategies] = useState([]);

  const fetchUserStrategies = async () => {
    const response = await axios.post(
      'http://192.168.29.84:3001/getAllStrategies',
      {userId: auth().currentUser.uid},
    );
    if (response.data.isError) {
      Alert.alert('Error', response.data.errMessage);
    } else {
      setStrategies(response.data.data);
      setSearchedStrategies(response.data.data);
    }
  };
  useEffect(() => {
    fetchUserStrategies();
  }, []);

  const getStrategiesCard = searchedStrategies.map(strategy => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('detailedStrategyAnalysis', {
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
      <Header
        title="Strategy"
        theme={HEADER_THEME.LIGHT}
        color={COLORS.white}
        backBtn={false}
      />
      <View style={{width: '90%', alignSelf: 'center'}}>
        <SearchBar defaultData={strategies} saveData={setSearchedStrategies} />
      </View>
      <ScrollView>
        <View style={styles.base}>{getStrategiesCard}</View>
      </ScrollView>
    </View>
  );
};

export default StrategyAnalysis;

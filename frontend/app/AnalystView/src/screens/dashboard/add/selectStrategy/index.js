/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {CheckBox, Button, Input} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import auth from '@react-native-firebase/auth';

// Import Files
import Loading from '../../../../components/loading';
import styles from './styles';
import {HEADER_THEME} from '../../../../components/header/constants';
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import {setStrategiesUsed} from '../../../../redux/actions/add';
import axios from 'axios';
import SearchBar from '../../../../components/searchBar';

const SelectStrategy = ({strategiesUsed, navigation, setStrategiesUsed}) => {
  const [loading, setLoading] = useState(false);
  const [allStrategies, setAllStrategies] = useState([]);
  const [searchedStrategies, setSearchedStrategies] = useState([]);
  const [newStrategy, setNewStrategy] = useState('');

  const fetchUserStrategies = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.29.84:3001/getAllStrategies',
        {
          userId: auth().currentUser.uid,
        },
      );
      if (response.data.isError) {
        Alert.alert('Error', response.data.errMessage);
      } else {
        setAllStrategies(response.data.data);
        setSearchedStrategies(response.data.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserStrategies();
  }, []);

  const getUserStrategiesCard = searchedStrategies.map(strategy => {
    return (
      <View key={strategy}>
        <CheckBox
          style={styles.userStrategy}
          checked={strategiesUsed[strategy]}
          onChange={nextChecked => {
            setStrategiesUsed({
              ...strategiesUsed,
              [strategy]: nextChecked,
            });
          }}>
          <Text>{strategy}</Text>
        </CheckBox>
      </View>
    );
  });

  const handleAddNewStrategy = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://192.168.29.84:3001/addStrategy',
        {
          userId: auth().currentUser.uid,
          strategy: newStrategy,
        },
      );
      if (response.data.isError) {
        Alert.alert('Error', response.data.errMessage);
      } else {
        setAllStrategies([...allStrategies, newStrategy]);
        setSearchedStrategies([...allStrategies, newStrategy]);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
    setNewStrategy('');
    setLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Your Strategies"
        theme={HEADER_THEME.LIGHT}
        color={COLORS.white}
        backBtn={true}
        navigation={navigation}
        backScreen="addToJournal"
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={-50}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.base}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Loading loading={loading}>
            <SearchBar
              defaultData={allStrategies}
              saveData={setSearchedStrategies}
            />

            <View style={styles.userStrategies}>
              <ScrollView>{getUserStrategiesCard}</ScrollView>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.addStrategyContainer}>
                <Input
                  placeholder="Enter Strategy Name"
                  value={newStrategy}
                  onChangeText={nextValue => setNewStrategy(nextValue)}
                />
                <Button
                  onPress={handleAddNewStrategy}
                  style={{
                    width: '100%',
                    marginTop: 5,
                    backgroundColor: COLORS.black,
                    borderColor: COLORS.black,
                  }}>
                  Add New Strategy
                </Button>
              </View>
            </View>
          </Loading>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  return {strategiesUsed: add.strategiesUsed};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setStrategiesUsed,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectStrategy);

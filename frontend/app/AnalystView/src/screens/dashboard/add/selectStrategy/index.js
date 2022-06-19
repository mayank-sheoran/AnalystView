/* eslint-disable react-hooks/exhaustive-deps */
// Module imports
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {CheckBox, Button, Input} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// File imports
import Loading from '../../../../components/loading';
import styles from './styles';
import {HEADER_THEME} from '../../../../components/header/constants';
import Header from '../../../../components/header';
import {COLORS} from '../../../../assets/theme';
import {SCREEN_NAMES} from '../../../../navigation/constants';
import {setStrategiesUsed} from '../../../../redux/actions/add';
import SearchBar from '../../../../components/searchBar';
import {fetchUserStrategies, handleAddNewStrategy} from './utils';

const SelectStrategy = ({strategiesUsed, navigation, setStrategiesUsed}) => {
  const [loading, setLoading] = useState(false);
  const [allStrategies, setAllStrategies] = useState([]);
  const [searchedStrategies, setSearchedStrategies] = useState([]);
  const [newStrategy, setNewStrategy] = useState('');

  useEffect(() => {
    const params = {setLoading, setAllStrategies, setSearchedStrategies};
    fetchUserStrategies(params);
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

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Your Strategies"
        theme={HEADER_THEME.LIGHT}
        color={COLORS.white}
        backBtn={true}
        navigation={navigation}
        backScreen={SCREEN_NAMES.ADD_TO_JOURNAL_SCREEN}
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
                  onPress={() =>
                    handleAddNewStrategy({
                      setLoading,
                      newStrategy,
                      allStrategies,
                      setAllStrategies,
                      setSearchedStrategies,
                      setNewStrategy,
                    })
                  }
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
  const {strategiesUsed} = add;
  return {strategiesUsed};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setStrategiesUsed,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectStrategy);

/* eslint-disable react-hooks/exhaustive-deps */
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
import {CheckBox} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import Files
import Loading from '../../../../../../components/loading';
import styles from './styles';
import Header from '../../../../../../components/header';
import {COLORS} from '../../../../../../assets/theme';
import {setStrategiesUsed} from '../../../../../../redux/actions/analysis';
import SearchBar from '../../../../../../components/searchBar';
import {fetchUserStrategies} from '../../utils';
import {INPUT_STRATEGY_HEADER_DETAILS} from '../../constants';

const InputStrategy = ({
  strategiesUsed,
  navigation,
  setStrategiesUsed,
  login,
}) => {
  const [loading, setLoading] = useState(false);
  const [allStrategies, setAllStrategies] = useState([]);
  const [searchedStrategies, setSearchedStrategies] = useState([]);

  useEffect(() => {
    fetchUserStrategies({
      setLoading,
      setAllStrategies,
      setSearchedStrategies,
      login,
    });
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
        title={INPUT_STRATEGY_HEADER_DETAILS.TITLE}
        theme={INPUT_STRATEGY_HEADER_DETAILS.THEME}
        color={COLORS.white}
        backBtn={true}
        navigation={navigation}
        backScreen={INPUT_STRATEGY_HEADER_DETAILS.BACKSCREEN}
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
          </Loading>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => {
  const {analysis, login} = state;
  const {strategiesUsed} = analysis;
  return {strategiesUsed, login};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setStrategiesUsed,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InputStrategy);

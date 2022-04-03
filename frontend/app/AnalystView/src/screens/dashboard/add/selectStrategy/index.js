import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CheckBox, Button, Input} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import Files
import Loading from '../../../../components/loading';
import styles from './styles';
import {HEADER_THEME} from '../../../../components/Header/constants';
import Header from '../../../../components/Header';
import {COLORS} from '../../../../assets/theme';
import {setStrategiesUsed} from '../../../../redux/actions/add';

const SelectStrategy = ({add, navigation, setStrategiesUsed}) => {
  const [loading, setLoading] = useState(false);
  const [allStrategies, setAllStrategies] = useState([]);
  const [newStrategy, setNewStrategy] = useState('');

  useEffect(() => {
    setLoading(true);
    setAllStrategies(['OpenSpace', 'AscendingTriangle', 'DescendingTriangle']);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserStrategiesCard = allStrategies.map(strategy => {
    return (
      <View
        key={strategy}
        style={{flexDirection: 'column', width: '100%', marginTop: 10}}>
        <CheckBox
          checked={add.strategiesUsed[strategy]}
          onChange={nextChecked => {
            setStrategiesUsed({
              ...add.strategiesUsed,
              [strategy]: nextChecked,
            });
          }}>
          <Text>{strategy}</Text>
        </CheckBox>
      </View>
    );
  });

  const handleAddNewStrategy = () => {
    setLoading(true);
    // save in db
    setAllStrategies([...allStrategies, newStrategy]); // get this from db;
    setNewStrategy('');
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      <View style={styles.base}>
        <Loading loading={loading}>
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            />
          </View>
        </Loading>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  return {add};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setStrategiesUsed,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectStrategy);

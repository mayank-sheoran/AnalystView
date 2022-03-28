import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {CheckBox, Button, Input} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Import Files
import Popup from '../../../../components/popup';
import Loading from '../../../../components/loading';
import styles from './styles';
import {COLORS} from '../../../../assets/theme';
import {
  setStrategiesUsed,
  showStrategySelect,
} from '../../../../redux/actions/add';

const StrategySelect = ({add, setStrategiesUsed, showStrategySelect}) => {
  const [loading, setLoading] = useState(false);
  const [markedStrategies, setMarkedStrategies] = useState({});
  const [allStrategies, setAllStrategies] = useState([]);
  const [newStrategy, setNewStrategy] = useState('');

  useEffect(() => {
    setLoading(true);
    setMarkedStrategies(add.strategiesUsed);
    setAllStrategies(['OpenSpace', 'AscendingTriangle', 'DescendingTriangle']);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserStrategiesCard = allStrategies.map(strategy => {
    return (
      <View style={{flexDirection: 'column', width: '100%', marginTop: 10}}>
        <CheckBox
          checked={markedStrategies[strategy]}
          onChange={nextChecked => {
            setMarkedStrategies({
              ...markedStrategies,
              [strategy]: nextChecked,
            });
          }}>
          <Text>{strategy}</Text>
        </CheckBox>
      </View>
    );
  });

  const handleSaveMarkedStrategy = () => {
    setStrategiesUsed(markedStrategies);
    showStrategySelect(false);
  };

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
    <Popup>
      <View style={styles.base}>
        <Text style={{fontWeight: '700', fontSize: 16}}>Your Strategies</Text>
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
              }}>
              <Button
                style={{width: '45%'}}
                size="medium"
                onPress={() => showStrategySelect(false)}>
                Close
              </Button>
              <Button
                style={{width: '45%'}}
                size="medium"
                onPress={handleSaveMarkedStrategy}>
                Save
              </Button>
            </View>
          </View>
        </Loading>
      </View>
    </Popup>
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
      showStrategySelect,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(StrategySelect);

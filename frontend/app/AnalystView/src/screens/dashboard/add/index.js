import React, {useState} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, CheckBox} from '@ui-kitten/components';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

// Import Files
import {setBookmark, setLoadings, resetState} from '../../../redux/actions/add';
import SelectDate from './selectDate';
import Header from '../../../components/Header';
import {HEADER_THEME} from '../../../components/Header/constants';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import TradeInputs from './tradeInputs';
import TradeTypeBtn from './tradeTypeBtn';
import SelectImage from './selectImage';
import Loading from '../../../components/loading';

const AddToJournal = ({
  add,
  navigation,
  setBookmark,
  setLoadings,
  resetState,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const isStrategySelected = () => {
    return Object.values(add.strategiesUsed).find(value => value === true);
  };

  const getStrategyText = () => {
    let text = '';
    const strategies = add.strategiesUsed;
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
  const handleAddToJournal = async () => {
    setLoadings('addToJournal', true);
    try {
      await axios.post('http://10.5.50.52:3001/saveToJournal', {
        userId: auth().currentUser.uid,
        tradeId: add.snapshotUUID,
        date: add.date,
        strategiesUsed: add.strategiesUsed,
        tradeType: add.tradeType,
        trade: add.trade,
        pnl: add.pnl,
        pnlPerc: add.pnlPerc,
        description: add.description,
        bookmark: add.bookmark,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1520);
      resetState();
    } catch (error) {
      Alert.alert('Error', 'Please add, all required data!');
    }

    setLoadings('addToJournal', false);
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Add To Journal"
        theme={HEADER_THEME.DARK}
        color={COLORS.blue}
        backBtn={false}
      />
      {isSaved && (
        <LottieView
          style={{zIndex: 999}}
          source={require('../../../assets/json/success.json')}
          autoPlay
          loop
        />
      )}
      <ScrollView>
        <SelectDate />
        <Button
          style={{
            width: '90%',
            alignSelf: 'center',
          }}
          size="medium"
          status={isStrategySelected() ? 'primary' : 'danger'}
          appearance="outline"
          onPress={() => navigation.navigate('strategy')}>
          {getStrategyText()}
        </Button>
        <TradeTypeBtn />
        <TradeInputs />
        <SelectImage />
        <View style={[styles.inputContainer, {height: 40, marginBottom: 80}]}>
          <Text style={styles.txt}>Bookmark</Text>
          <CheckBox
            checked={add.bookmark}
            onChange={nextChecked => setBookmark(nextChecked)}
          />
        </View>
      </ScrollView>
      <Loading loading={add.loadings.addToJournal}>
        <View style={styles.submitBtnContainer}>
          <Button
            style={styles.submitBtn}
            size="medium"
            onPress={handleAddToJournal}>
            Add To Journal
          </Button>
        </View>
      </Loading>
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
      setBookmark,
      setLoadings,
      resetState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournal);

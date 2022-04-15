import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, CheckBox} from '@ui-kitten/components';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {useIsFocused} from '@react-navigation/native';

// Import Files
import {setBookmark, setLoadings, resetState} from '../../../redux/actions/add';
import SelectDate from './selectDate';
import Header from '../../../components/header';
import {HEADER_THEME} from '../../../components/header/constants';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import TradeInputs from './tradeInputs';
import TradeTypeBtn from './tradeTypeBtn';
import SelectImage from './selectImage';
import Loading from '../../../components/loading';
import {trade} from './constants';

// Sounds
Sound.setCategory('Playback');
var ahh = new Sound('ahh.mp3', Sound.MAIN_BUNDLE);
var moment = new Sound('moment.mp3', Sound.MAIN_BUNDLE);
var heheBoi = new Sound('heheBoi.mp3', Sound.MAIN_BUNDLE);

const AddToJournal = ({
  navigation,
  setBookmark,
  setLoadings,
  resetState,
  strategiesUsed,
  addToJournal,
  bookmark,
  pnl,
  pnlPerc,
  trade,
  tradeType,
  snapshotUUID,
  description,
  date,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    heheBoi.setVolume(1);
    ahh.setVolume(1);
    return () => {
      heheBoi.release();
      ahh.release();
    };
  }, []);

  const isStrategySelected = () => {
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

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        'http://192.168.29.84:3001/saveToJournal',
        {
          userId: auth().currentUser.uid,
          tradeId: snapshotUUID,
          date: date,
          strategiesUsed: Object.keys(strategiesUsed),
          tradeType: tradeType,
          trade: trade,
          pnl: pnl,
          pnlPerc: pnlPerc,
          description: description,
          bookmark: bookmark,
        },
      );
      if (response.data.isError) {
        Alert.alert('Error', response.data.errMessage);
      } else {
        if (trade === trade.PROFIT) {
          heheBoi.play();
        } else {
          moment.play();
        }
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      }
      resetState();
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
    setLoadings('addToJournal', false);
  };

  const handleAddToJournal = () => {
    if (Object.keys(strategiesUsed).length === 0) {
      Alert.alert('Error', 'Please select atleast 1 strategy', [
        {text: 'Ok', style: 'cancel'},
      ]);
      setLoadings('addToJournal', false);
      return;
    }
    if (tradeType === '' || trade === '') {
      Alert.alert('Error', 'Please select Trade and Trade Type', [
        {text: 'Ok', style: 'cancel'},
      ]);
      setLoadings('addToJournal', false);
      return;
    }
    if (pnl === null || pnlPerc === null) {
      Alert.alert('Error', 'Please enter Pnl & Pnl %', [
        {text: 'Ok', style: 'cancel'},
      ]);
      setLoadings('addToJournal', false);
      return;
    }
    if (snapshotUUID === null) {
      Alert.alert('Warning', 'Please select a photo', [
        {text: 'cancel', style: 'cancel'},
        {text: 'Add To Journal', onPress: () => onSubmit()},
      ]);
      setLoadings('addToJournal', false);
      return;
    }
    onSubmit();
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {useIsFocused() && (
        <Header
          title="Add To Journal"
          theme={HEADER_THEME.LIGHT}
          color={COLORS.white}
          backBtn={false}
        />
      )}
      {isSaved && (
        <LottieView
          style={{
            position: 'absolute',
            zIndex: 999,
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            backgroundColor: COLORS.white,
            textAlign: 'center',
          }}
          source={require('../../../assets/json/success.json')}
          autoPlay
        />
      )}
      <View style={styles.base}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            zIndex: -99,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
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
            <SelectImage />
            <TradeInputs />
            <View
              style={[styles.inputContainer, {height: 40, marginBottom: 200}]}>
              <Text style={styles.txt}>Bookmark</Text>
              <CheckBox
                checked={bookmark}
                onChange={nextChecked => setBookmark(nextChecked)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.submitBtnContainer}>
        <Loading loading={addToJournal}>
          <Button
            style={styles.submitBtn}
            size="medium"
            onPress={handleAddToJournal}>
            Add To Journal
          </Button>
        </Loading>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  const {
    pnl,
    pnlPerc,
    trade,
    tradeType,
    bookmark,
    strategiesUsed,
    snapshotUUID,
    description,
    date,
  } = add;
  return {
    pnl,
    pnlPerc,
    addToJournal: add.loadings.addToJournal,
    bookmark,
    strategiesUsed,
    trade,
    tradeType,
    snapshotUUID,
    date,
    description,
  };
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

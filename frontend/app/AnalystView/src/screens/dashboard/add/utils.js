// Module imports
import {Alert} from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// File imports
import {PAGE_DETAILS} from './constants';
import {MONGO_API} from '../../../config/api';
import {MONGO_SERVER} from '../../../config';
import {parseApiResponse, saveError} from '../../../utils/api';
import notify from '../../../components/notify';

export const isStrategySelected = strategiesUsed => {
  return Object.values(strategiesUsed).find(value => value === true);
};

export const getStrategyText = strategiesUsed => {
  let text = '';
  const strategies = strategiesUsed;
  const empty = isStrategySelected(strategiesUsed);
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
  return PAGE_DETAILS.SELECT_STRATEGY;
};

export const onSubmit = async params => {
  const {
    snapshotUUID,
    date,
    strategiesUsed,
    trade,
    tradeType,
    pnl,
    pnlPerc,
    description,
    bookmark,
    success,
    setIsSaved,
    resetState,
    setLoadings,
    login,
  } = params;
  try {
    const response = await axios.post(
      `${MONGO_SERVER}/${MONGO_API.SAVE_TO_JOURNAL}`,
      {
        userId: auth().currentUser.uid,
        tradeId: snapshotUUID,
        date: date,
        strategiesUsed: Object.keys(strategiesUsed),
        tradeType: tradeType,
        trade: trade,
        pnl: pnl,
        pnlPerc: (100 * pnl) / pnlPerc,
        description: description,
        bookmark: bookmark,
      },
    );
    console.log('COMING HERE1');
    const {isError, message} = parseApiResponse(response);

    if (isError) {
      notify({heading: 'Error', subHeading: message});
      saveError(login, message);
    } else {
      success.play();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    }
    resetState();
  } catch (error) {
    console.log('COMING HERE3');
    notify({heading: 'Error', subHeading: error});
    saveError(login, error);
  }
  console.log('COMING HERE2');
  setLoadings('addToJournal', false);
};

export const handleAddToJournal = params => {
  const {
    snapshotUUID,
    date,
    strategiesUsed,
    trade,
    tradeType,
    pnl,
    pnlPerc,
    description,
    bookmark,
    success,
    setIsSaved,
    resetState,
    setLoadings,
    login,
  } = params;

  const onSubmitParams = {
    snapshotUUID,
    date,
    strategiesUsed,
    trade,
    tradeType,
    pnl,
    pnlPerc,
    description,
    bookmark,
    success,
    setIsSaved,
    resetState,
    setLoadings,
    login,
  };

  console.log('Atleast here ');
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
  if (parseInt(pnlPerc) === 0) {
    Alert.alert('Error', 'Capital used should be more than 0', [
      {text: 'Ok', style: 'cancel'},
    ]);
    setLoadings('addToJournal', false);
    return;
  }
  if (snapshotUUID === null) {
    Alert.alert('Warning', 'Please select a photo', [
      {text: 'cancel', style: 'cancel'},
      {text: 'Skip photo', onPress: () => onSubmit(onSubmitParams)},
    ]);
    setLoadings('addToJournal', false);
    return;
  }
  console.log('Atleast here too');
  onSubmit(onSubmitParams);
};

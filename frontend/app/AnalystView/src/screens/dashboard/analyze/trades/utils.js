// Module imports
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

// Import Files
import {MONGO_SERVER} from '../../../../config';
import {MONGO_API} from '../../../../config/api';
import {parseApiResponse, saveError} from '../../../../utils/api';
import notify from '../../../../components/notify';

const saveTradesImageUrls = async params => {
  const {userTrades, setImageUrls} = params;

  await Promise.all(
    userTrades.map(async trade => {
      const snapshotUUID = trade.tradeId;
      if (!snapshotUUID) {
        return;
      }
      const firebaseStorage = storage();
      const reference = firebaseStorage.ref(`/${snapshotUUID}`);
      const downloadUrl = await reference.getDownloadURL();
      setImageUrls(prevState => ({
        ...prevState,
        [snapshotUUID]: downloadUrl,
      }));
    }),
  );
};

export const fetchUserTrades = async params => {
  const {setLoading, setImageUrls, appliedFilters, setTrades, login} = params;

  setLoading(true);
  const response = await axios.post(
    `${MONGO_SERVER}/${MONGO_API.GET_ALL_FILTERED_TRADES}`,
    {
      userId: auth().currentUser.uid,
      strategiesUsed: appliedFilters.strategiesUsed,
      tradeType: appliedFilters.trade,
      trade: appliedFilters.pnl,
      pnlRange: appliedFilters.pnlRange,
      pnlPercRange: appliedFilters.pnlPercRange,
      bookmark: appliedFilters.bookmark,
    },
  );

  const {isError, message} = parseApiResponse(response);

  if (isError) {
    notify({heading: 'Error', subHeading: message});
    saveError(login, message);
  } else {
    await saveTradesImageUrls({setImageUrls, userTrades: message});
    setTrades(message);
  }
  setLoading(false);
};

const isStrategySelected = strategiesUsed => {
  if (strategiesUsed === null || strategiesUsed === undefined) {
    return false;
  }
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
  return 'Select Strategy';
};

export const fetchUserStrategies = async params => {
  const {setLoading, setAllStrategies, setSearchedStrategies, login} = params;

  setLoading(true);
  try {
    const response = await axios.post(
      `${MONGO_SERVER}/${MONGO_API.GET_ALL_STRATEGIES}`,
      {
        userId: auth().currentUser.uid,
      },
    );

    const {isError, message} = parseApiResponse(response);

    if (isError) {
      notify({heading: 'Error', subHeading: message});
      saveError(login, message);
    } else {
      setAllStrategies(message);
      setSearchedStrategies(message);
    }
  } catch (error) {
    notify({heading: 'Error', subHeading: 'Something went wrong'});
    saveError(login, error);
  }
  setLoading(false);
};

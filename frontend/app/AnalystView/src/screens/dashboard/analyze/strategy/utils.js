// Module imports
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// Import Files
import {MONGO_SERVER} from '../../../../config';
import {MONGO_API} from '../../../../config/api';
import {parseApiResponse, saveError} from '../../../../utils/api';
import notify from '../../../../components/notify';

export const fetchUserStrategies = async params => {
  const {setSearchedStrategies, setStrategies, login} = params;

  const response = await axios.post(
    `${MONGO_SERVER}/${MONGO_API.GET_ALL_STRATEGIES}`,
    {userId: auth().currentUser.uid},
  );

  const {isError, message} = parseApiResponse(response);

  if (isError) {
    notify({heading: 'Error', subHeading: message});
    saveError(login, message);
  } else {
    setStrategies(message);
    setSearchedStrategies(message);
  }
};

export const fetchStrategyDetails = async params => {
  const {strategyName, setLoading, setDetails} = params;

  const response = await axios.post(
    `${MONGO_SERVER}/${MONGO_API.GET_USER_STRATEGY_ANALYSIS}`,
    {userId: auth().currentUser.uid, strategy: strategyName},
  );

  const {isError, message} = parseApiResponse(response);

  if (isError) {
    setLoading(false);
    notify({heading: 'Error', subHeading: message});
  } else {
    setDetails(message.realTrades);
    setLoading(false);
  }
};

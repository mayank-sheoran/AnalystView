// Module imports
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

// File imports
import {MONGO_API} from '../../../../config/api';
import {MONGO_SERVER} from '../../../../config';
import {parseApiResponse} from '../../../../utils/api';

export const handleAddNewStrategy = async params => {
  const {
    setLoading,
    newStrategy,
    allStrategies,
    setAllStrategies,
    setSearchedStrategies,
    setNewStrategy,
  } = params;

  setLoading(true);
  try {
    const response = await axios.post(
      `${MONGO_SERVER}/${MONGO_API.ADD_STRATEGY}`,
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

export const fetchUserStrategies = async params => {
  const {setLoading, setAllStrategies, setSearchedStrategies} = params;

  setLoading(true);
  try {
    const response = await axios.post(
      `${MONGO_SERVER}/${MONGO_API.GET_ALL_STRATEGIES}`,
      {
        userId: auth().currentUser.uid,
      },
    );
    const {isError, message} = parseApiResponse(response);
    console.log(isError, message, auth().currentUser.uid);
    if (isError) {
      Alert.alert('Error', message);
    } else {
      setAllStrategies(message);
      setSearchedStrategies(message);
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Something went wrong');
  }
  setLoading(false);
};

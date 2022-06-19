// Module imports
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// File imports
import {MONGO_SERVER} from '../config';
import {MONGO_API} from '../config/api';

export const parseApiResponse = response => {
  const isError = response.data.isError;

  if (!isError) {
    const message = response.data.data;
    return {
      isError,
      message,
    };
  }

  const message = response.data.errMessage;
  return {
    isError,
    message,
  };
};

export const saveError = async (login, errorMessage) => {
  await axios.post(`${MONGO_SERVER}/${MONGO_API.SAVE_ERROR}`, {
    userId: auth().currentUser.uid,
    phone: login.phone,
    errorMessage,
  });
};

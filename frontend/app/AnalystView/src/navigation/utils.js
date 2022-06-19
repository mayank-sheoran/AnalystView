// Module imports
import axios from 'axios';
import auth from '@react-native-firebase/auth';

// File imports
import {MONGO_SERVER} from '../config';
import {MONGO_API, MONGO_API_RESPONSE} from '../config/api';
import {parseApiResponse, saveError} from '../utils/api';
import notify from '../components/notify';

export const fetchUserData = async (saveUser, saveUserId, login) => {
  try {
    const response = await axios.post(
      `${MONGO_SERVER}/${MONGO_API.SAVE_USER_INFO}`,
      {
        userId: auth().currentUser.uid,
        phone: login.phone,
        currencySymbol: login.currencySymbol,
      },
    );

    const {isError, message} = parseApiResponse(response);
    console.log(isError, response);
    if (isError) {
      await saveError(login, message);
      return;
    }

    if (!isError && message !== MONGO_API_RESPONSE.NEW_USER_ADDED) {
      saveUser({
        phone: message.phone,
        currencySymbol: message.currencySymbol,
      });
    }
    saveUserId(auth().currentUser.uid);
  } catch (error) {
    notify({heading: 'Error', subHeading: 'Failed to fetch user details!'});
    await saveError(login, error);
  }
};

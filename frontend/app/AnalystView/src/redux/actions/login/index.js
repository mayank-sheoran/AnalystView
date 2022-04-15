import {SAVE_USER_DETAILS, SAVE_USERID} from '../../constants/login';

export const saveUser = user => {
  return {
    type: SAVE_USER_DETAILS,
    payload: user,
  };
};

export const saveUserId = userId => {
  return {
    type: SAVE_USERID,
    payload: userId,
  };
};

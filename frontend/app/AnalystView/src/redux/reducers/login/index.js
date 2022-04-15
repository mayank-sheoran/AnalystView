import {SAVE_USER_DETAILS, SAVE_USERID} from '../../constants/login';

const initialState = {
  userId: null,
  phone: null,
  currencySymbol: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_DETAILS:
      return {
        ...state,
        phone: action.payload.phone,
        currencySymbol: action.payload.currencySymbol,
      };
    case SAVE_USERID:
      return {
        ...state,
        userId: action.payload,
      };
    default:
      return initialState;
  }
};

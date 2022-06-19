import {
  SET_DATE,
  SET_DATE_PICKER_VISIBILITY,
  SET_STRATEGIES_USED,
  SET_TRADE_TYPE,
  SET_TRADE,
  SET_BOOKMARK_STATUS,
  SET_LOADING_STATUS,
  SET_SNAPSHOT_UUID,
  SET_TRADE_INPUTS,
  RESET_STATE,
} from '../../constants/add';

const initialState = {
  date: new Date(),
  show: {
    infoDescription: false,
    infoPNL: false,
    infoPercCalc: false,
    infoSnapshot: false,
    datePicker: false,
  },
  loadings: {
    upload: false,
    addToJournal: false,
  },
  strategiesUsed: {},
  tradeType: '',
  trade: '',
  pnl: null,
  pnlPerc: null,
  snapshotUUID: null,
  description: '',
  bookmark: false,
};

export const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_DATE_PICKER_VISIBILITY:
      return {
        ...state,
        show: {...state.show, datePicker: action.payload},
      };
    case SET_STRATEGIES_USED:
      return {
        ...state,
        strategiesUsed: action.payload,
      };
    case SET_TRADE_TYPE:
      return {
        ...state,
        tradeType: action.payload,
      };
    case SET_TRADE:
      return {
        ...state,
        trade: action.payload,
      };
    case SET_BOOKMARK_STATUS:
      return {
        ...state,
        bookmark: action.payload,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        loadings: {
          ...state.loadings,
          [action.payload.loadingType]: action.payload.loadingStatus,
        },
      };
    case SET_SNAPSHOT_UUID:
      return {
        ...state,
        snapshotUUID: action.payload,
      };
    case SET_TRADE_INPUTS:
      return {
        ...state,
        [action.payload.inputType]: action.payload.value,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

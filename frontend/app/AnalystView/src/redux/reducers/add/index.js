import {
  SET_DATE,
  SET_DATE_PICKER_VISIBILITY,
  SET_STRATEGY_SELECTOR_VISIBILITY,
  SET_STRATEGIES_USED,
  SET_TRADE_TYPE,
  SET_TRADE,
  SET_PNL,
  SET_PNL_PERC,
  SET_DESCRIPTION,
  SET_BOOKMARK_STATUS,
} from '../../constants/add';

const initialState = {
  date: new Date(),
  show: {
    selectStrategy: false,
    infoPercCalc: false,
    infoSnapshot: false,
    datePicker: false,
  },
  strategiesUsed: [],
  tradeType: '',
  trade: '',
  pnl: 0,
  pnlPerc: 0,
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
    case SET_STRATEGY_SELECTOR_VISIBILITY:
      return {
        ...state,
        show: {...state.show, selectStrategy: action.payload},
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
    case SET_PNL:
      return {
        ...state,
        pnl: action.payload,
      };
    case SET_PNL_PERC:
      return {
        ...state,
        pnlPerc: action.payload,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case SET_BOOKMARK_STATUS:
      return {
        ...state,
        bookmark: action.payload,
      };
    default:
      return state;
  }
};

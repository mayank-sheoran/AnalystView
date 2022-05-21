import {
  RESET,
  SET_PNL_RANGE,
  SET_PNL_PERC_RANGE,
  SET_BUTTONS_STATUS,
  SET_STRATEGIES_USED,
  SET_BOOKMARK_STATUS,
  TRADE_BUTTON_STATUS,
  PNL_BUTTON_STATUS,
  APPLY_FILTERS,
  SAVE_PREV_FILTERS,
  REFETCH_TRADES,
} from '../../constants/analysis';

const initialState = {
  refetchTrades: false,
  pnl: PNL_BUTTON_STATUS.BOTH,
  trade: TRADE_BUTTON_STATUS.BOTH,
  strategiesUsed: {},
  pnlRange: [0, 50000],
  pnlPercRange: [0, 100],
  bookmark: false,
  appliedFilters: {
    pnl: PNL_BUTTON_STATUS.BOTH,
    trade: TRADE_BUTTON_STATUS.BOTH,
    strategiesUsed: {},
    pnlRange: [0, 50000],
    pnlPercRange: [0, 100],
    bookmark: false,
  },
};

export const analyseReducer = (state = initialState, action) => {
  switch (action.type) {
    case REFETCH_TRADES:
      return {
        ...state,
        refetchTrades: !state.refetchTrades,
      };
    case SAVE_PREV_FILTERS:
      return {
        ...state,
        pnl: action.payload.pnl,
        trade: action.payload.trade,
        strategiesUsed: action.payload.strategiesUsed,
        pnlRange: action.payload.pnlRange,
        pnlPercRange: action.payload.pnlPercRange,
        bookmark: action.payload.bookmark,
      };
    case APPLY_FILTERS:
      return {
        ...state,
        appliedFilters: action.payload,
      };
    case RESET:
      return {
        ...initialState,
      };
    case SET_PNL_RANGE:
      return {
        ...state,
        pnlRange: action.payload,
      };
    case SET_PNL_PERC_RANGE:
      return {
        ...state,
        pnlPercRange: action.payload,
      };
    case SET_BUTTONS_STATUS:
      return {
        ...state,
        pnl: action.payload.pnl,
        trade: action.payload.trade,
      };
    case SET_STRATEGIES_USED:
      return {
        ...state,
        strategiesUsed: action.payload,
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

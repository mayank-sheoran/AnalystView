import {
  RESET,
  SET_PNL_RANGE,
  SET_PNL_PERC_RANGE,
  SET_BUTTONS_STATUS,
  SET_STRATEGIES_USED,
  SET_BOOKMARK_STATUS,
  APPLY_FILTERS,
  SAVE_PREV_FILTERS,
  REFETCH_TRADES,
} from '../../constants/analysis';

export const refetchTrades = () => {
  return {
    type: REFETCH_TRADES,
    payload: null,
  };
};

export const setFilters = value => {
  return {
    type: APPLY_FILTERS,
    payload: value,
  };
};

export const savePrevFilters = appliedFilters => {
  return {
    type: SAVE_PREV_FILTERS,
    payload: appliedFilters,
  };
};

export const setBookmark = status => {
  return {
    type: SET_BOOKMARK_STATUS,
    payload: status,
  };
};

export const setStrategiesUsed = strategiesUsed => {
  return {
    type: SET_STRATEGIES_USED,
    payload: strategiesUsed,
  };
};

export const resetState = () => {
  return {
    type: RESET,
    payload: null,
  };
};

export const setButtonStatus = value => {
  return {
    type: SET_BUTTONS_STATUS,
    payload: {
      pnl: value.pnl,
      trade: value.trade,
    },
  };
};

export const setPnlRange = value => {
  return {
    type: SET_PNL_RANGE,
    payload: value,
  };
};

export const setPnlPercRange = value => {
  return {
    type: SET_PNL_PERC_RANGE,
    payload: value,
  };
};

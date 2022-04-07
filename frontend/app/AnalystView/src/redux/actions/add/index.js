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
  SET_LOADING_STATUS,
  SET_SNAPSHOT_UUID,
  RESET_STATE,
} from '../../constants/add';

export const setDate = date => {
  return {
    type: SET_DATE,
    payload: date,
  };
};

export const showDatePicker = show => {
  return {
    type: SET_DATE_PICKER_VISIBILITY,
    payload: show,
  };
};

export const showStrategySelect = show => {
  return {
    type: SET_STRATEGY_SELECTOR_VISIBILITY,
    payload: show,
  };
};

export const setStrategiesUsed = strategiesUsed => {
  return {
    type: SET_STRATEGIES_USED,
    payload: strategiesUsed,
  };
};

export const setTradeType = tradeType => {
  return {
    type: SET_TRADE_TYPE,
    payload: tradeType,
  };
};

export const setTrade = trade => {
  return {
    type: SET_TRADE,
    payload: trade,
  };
};

export const setPnl = pnl => {
  return {
    type: SET_PNL,
    payload: pnl,
  };
};

export const setPnlPerc = pnlPerc => {
  return {
    type: SET_PNL_PERC,
    payload: pnlPerc,
  };
};

export const setDesc = desc => {
  return {
    type: SET_DESCRIPTION,
    payload: desc,
  };
};

export const setBookmark = status => {
  return {
    type: SET_BOOKMARK_STATUS,
    payload: status,
  };
};

export const setLoadings = (loadingType, loadingStatus) => {
  return {
    type: SET_LOADING_STATUS,
    payload: {loadingType, loadingStatus},
  };
};

export const setSnapshotUUID = uuid => {
  return {
    type: SET_SNAPSHOT_UUID,
    payload: uuid,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE,
    payload: null,
  };
};

// File imports
import {SCREEN_NAMES} from '../../../navigation/constants';
import {HEADER_THEME} from '../../../components/header/constants';

export const HEADER_DETAILS = {
  TITLE: 'Verify',
  BACKSCREEN: SCREEN_NAMES.WELCOME_SCREEN,
  THEME: HEADER_THEME.DARK,
};

export const PAGE_DETAILS = {
  REQUEST_AGAIN: 'Request again',
  WAIT: wait => `Wait for ${wait} secs`,
  CODE_SENT: phoneNum => `Code sent to ${phoneNum}`,
  CODE_NOT_RECIEVED: "Didn't recieved code?",
};

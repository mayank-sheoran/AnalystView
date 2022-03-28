import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../assets/theme';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  base: {
    height: 0.65 * windowHeight,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userStrategies: {
    alignSelf: 'flex-start',
    height: 0.4 * windowHeight,
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
  },
  addStrategyContainer: {
    flexDirection: 'column',
  },
});

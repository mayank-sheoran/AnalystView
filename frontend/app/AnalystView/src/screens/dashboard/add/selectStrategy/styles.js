import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../assets/theme';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  base: {
    height: 0.8 * windowHeight,
    marginBottom: 400,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userStrategies: {
    alignSelf: 'flex-start',
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    width: '100%',
    height: 160,
  },
  addStrategyContainer: {
    flexDirection: 'column',
  },
});

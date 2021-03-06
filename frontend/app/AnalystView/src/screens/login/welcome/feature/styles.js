import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../assets/theme';
var width = Dimensions.get('window').width; //full width

export default StyleSheet.create({
  featureContainer: {
    height: 40,
    width: 0.9 * width,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
  },
  feature: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 6,
    padding: 10,
  },
  horizontalBar: {
    position: 'absolute',
    width: 0.9 * width,
    top: '50%',
    height: 1,
    zIndex: -1,
    backgroundColor: COLORS.black,
  },
});

import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../../assets/theme';

export default StyleSheet.create({
  base: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeBtn: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 50,
    right: 10,
    // width: 50,
    // height: 50,
    backgroundColor: COLORS.white,
  },
});

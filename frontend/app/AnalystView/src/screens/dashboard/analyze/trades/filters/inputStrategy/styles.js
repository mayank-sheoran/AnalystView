import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../../../assets/theme';
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  base: {
    height: 500,
    marginBottom: 400,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userStrategy: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderColor: COLORS.light_grey,
    borderWidth: 1,
    borderRadius: 5,
  },
  userStrategies: {
    alignSelf: 'flex-start',
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    borderColor: COLORS.light_grey,
    padding: 10,
  },
  searchContainer: {
    height: 40,
    width: '100%',
  },
});

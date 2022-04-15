import {StyleSheet} from 'react-native';
import {COLORS} from '../../../../assets/theme';

export default StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
  },
  strategy: {
    width: '90%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 50,
    marginTop: 10,
    padding: 10,
    borderColor: COLORS.blue,
    backgroundColor: '#D6E5FA',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.blue,
  },
  searchContainer: {
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
});

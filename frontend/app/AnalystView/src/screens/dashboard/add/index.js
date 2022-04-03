import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, CheckBox} from '@ui-kitten/components';

// Import Files
import {setBookmark} from '../../../redux/actions/add';
import SelectDate from './selectDate';
import Header from '../../../components/Header';
import {HEADER_THEME} from '../../../components/Header/constants';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import TradeInputs from './tradeInputs';
import TradeTypeBtn from './tradeTypeBtn';
import SelectImage from './selectImage';

const AddToJournal = ({add, navigation, setBookmark}) => {
  const isStrategySelected = () => {
    return Object.values(add.strategiesUsed).find(value => value === true);
  };
  const getStrategyText = () => {
    let text = '';
    const strategies = add.strategiesUsed;
    const empty = isStrategySelected();
    if (empty) {
      Object.keys(strategies).forEach(strategy => {
        if (strategies[strategy] === true) {
          text += strategy + ', ';
        }
      });
      if (text.length > 30) {
        return text.substring(0, 30) + '...';
      }
      return text.substring(0, text.length - 2);
    }
    return 'Select Strategy';
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header
        title="Add To Journal"
        theme={HEADER_THEME.DARK}
        color={COLORS.blue}
        backBtn={false}
      />
      <ScrollView>
        <SelectDate />
        <Button
          style={{
            width: '90%',
            alignSelf: 'center',
          }}
          size="medium"
          status={isStrategySelected() ? 'primary' : 'danger'}
          appearance="outline"
          onPress={() => navigation.navigate('strategy')}>
          {getStrategyText()}
        </Button>
        <TradeTypeBtn />
        <TradeInputs />
        <SelectImage />
        <View style={[styles.inputContainer, {height: 40, marginBottom: 80}]}>
          <Text style={styles.txt}>Bookmark</Text>
          <CheckBox
            checked={add.bookmark}
            onChange={nextChecked => setBookmark(nextChecked)}
          />
        </View>
      </ScrollView>
      <View style={styles.submitBtnContainer}>
        <Button style={styles.submitBtn} size="medium">
          Add To Journal
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  return {add};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBookmark,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournal);

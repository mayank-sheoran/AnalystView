import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, CheckBox} from '@ui-kitten/components';
import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';
import {useIsFocused} from '@react-navigation/native';

// Import Files
import {setBookmark, setLoadings, resetState} from '../../../redux/actions/add';
import SelectDate from './selectDate';
import Header from '../../../components/header';
import {COLORS} from '../../../assets/theme';
import styles from './styles';
import TradeInputs from './tradeInputs';
import TradeTypeBtn from './tradeTypeBtn';
import AddToJournalButton from './addToJournalButton';
import SelectImage from './selectImage';
import {isStrategySelected, getStrategyText} from './utils';
import {HEADER_DETAILS} from './constants';
import {SCREEN_NAMES} from '../../../navigation/constants';

// Sounds
Sound.setCategory('Playback');
var success = new Sound('success.mp3', Sound.MAIN_BUNDLE);

const AddToJournal = ({navigation, setBookmark, strategiesUsed, bookmark}) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    success.setVolume(1);
    return () => {
      success.release();
    };
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {useIsFocused() && (
        <Header
          title={HEADER_DETAILS.TITLE}
          theme={HEADER_DETAILS.THEME}
          color={COLORS.white}
          backBtn={false}
        />
      )}
      {isSaved && (
        <LottieView
          style={{
            position: 'absolute',
            zIndex: 999,
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            backgroundColor: COLORS.white,
            textAlign: 'center',
          }}
          source={require('../../../assets/json/success.json')}
          autoPlay
        />
      )}
      <View style={styles.base}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            zIndex: -99,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <ScrollView>
            <SelectDate />
            <Button
              style={{
                width: '90%',
                alignSelf: 'center',
              }}
              size="medium"
              status={isStrategySelected(strategiesUsed) ? 'primary' : 'danger'}
              appearance="outline"
              onPress={() =>
                navigation.navigate(SCREEN_NAMES.SELECT_STRATEGY_ADD_SCREEN)
              }>
              {getStrategyText(strategiesUsed)}
            </Button>
            <TradeTypeBtn />
            <SelectImage />
            <TradeInputs />
            <View
              style={[styles.inputContainer, {height: 40, marginBottom: 200}]}>
              <Text style={styles.txt}>Bookmark</Text>
              <CheckBox
                checked={bookmark}
                onChange={nextChecked => setBookmark(nextChecked)}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <AddToJournalButton setIsSaved={setIsSaved} success={success} />
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  const {bookmark, strategiesUsed} = add;
  return {
    bookmark,
    strategiesUsed,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setBookmark,
      setLoadings,
      resetState,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournal);

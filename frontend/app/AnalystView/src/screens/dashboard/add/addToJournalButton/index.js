// Module imports
import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Sound from 'react-native-sound';

// File imports
import {handleAddToJournal} from '../utils';
import {
  setBookmark,
  setLoadings,
  resetState,
} from '../../../../redux/actions/add';
import Loading from '../../../../components/loading';
import styles from '../styles';

const AddToJournalButton = ({
  login,
  setLoadings,
  resetState,
  strategiesUsed,
  addToJournalLoading,
  bookmark,
  pnl,
  pnlPerc,
  trade,
  tradeType,
  snapshotUUID,
  description,
  date,
  setIsSaved,
  success,
}) => {
  return (
    <View style={styles.submitBtnContainer}>
      <Loading loading={addToJournalLoading}>
        <Button
          style={styles.submitBtn}
          size="medium"
          onPress={() =>
            handleAddToJournal({
              snapshotUUID,
              date,
              strategiesUsed,
              trade,
              tradeType,
              pnl,
              pnlPerc,
              description,
              bookmark,
              success,
              setIsSaved,
              resetState,
              setLoadings,
              login,
            })
          }>
          Add To Journal
        </Button>
      </Loading>
    </View>
  );
};

const mapStateToProps = state => {
  const {add, login} = state;
  const {
    pnl,
    pnlPerc,
    trade,
    tradeType,
    bookmark,
    strategiesUsed,
    snapshotUUID,
    description,
    date,
  } = add;
  return {
    pnl,
    pnlPerc,
    addToJournalLoading: add.loadings.addToJournal,
    bookmark,
    strategiesUsed,
    trade,
    tradeType,
    snapshotUUID,
    date,
    description,
    login,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddToJournalButton);

import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

// Import files
import styles from './styles';
import {showDatePicker, setDate} from '../../../../redux/actions/add';

const SelectDate = ({add, setDate, showDatePicker}) => {
  return (
    <View style={styles.base}>
      <Button
        style={styles.btn}
        size="medium"
        appearance="outline"
        onPress={() => showDatePicker(true)}>
        {moment(add.date).format('DD-MMM-YYYY')}
      </Button>
      <DatePicker
        modal
        style={styles.datePicker}
        open={add.show.datePicker}
        date={add.date}
        onConfirm={date => {
          setDate(date);
          showDatePicker(false);
        }}
        onCancel={() => {
          showDatePicker(false);
        }}
      />
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
      showDatePicker,
      setDate,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);

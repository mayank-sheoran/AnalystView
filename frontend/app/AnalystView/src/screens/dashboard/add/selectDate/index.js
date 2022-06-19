// Module imports
import React from 'react';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

// File imports
import styles from './styles';
import {showDatePicker, setDate} from '../../../../redux/actions/add';

const SelectDate = ({date, datePicker, setDate, showDatePicker}) => {
  return (
    <View style={styles.base}>
      <Button
        style={styles.btn}
        size="medium"
        appearance="outline"
        onPress={() => showDatePicker(true)}>
        {moment(date).format('DD-MMM-YYYY')}
      </Button>
      <DatePicker
        modal
        style={styles.datePicker}
        open={datePicker}
        date={date}
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
  const {date, show} = add;
  const {datePicker} = show;
  return {date, datePicker};
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

import React, {useState} from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import {Icon, Input} from '@ui-kitten/components';

// Import files
import styles from './styles';
import {COLORS} from '../../assets/theme';

const SearchBar = ({defaultData, saveData}) => {
  const [search, setSearch] = useState('');

  const onSearch = value => {
    setSearch(value);
    const filteredData = defaultData.filter(data => {
      return data.toLowerCase().includes(value.toLowerCase());
    });
    saveData(filteredData);
  };
  return (
    <View style={styles.searchContainer}>
      <Input
        style={{borderColor: COLORS.light_grey}}
        placeholder="Search your strategies"
        value={search}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchBar;

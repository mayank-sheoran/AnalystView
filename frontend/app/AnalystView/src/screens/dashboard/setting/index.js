// Module imports
import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Button} from '@ui-kitten/components';

const Setting = () => {
  return (
    <View>
      <Button
        style={{marginTop: 100}}
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }>
        Log Out
      </Button>
    </View>
  );
};

export default Setting;

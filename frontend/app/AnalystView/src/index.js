// Module Imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

// File Imports
import AuthCheck from './navigation/authCheck';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AuthCheck />
          </ApplicationProvider>
        </>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

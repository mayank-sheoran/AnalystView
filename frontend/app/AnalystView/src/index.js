// Module Imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

// File Imports
import AuthCheck from './navigation/authCheck';

const App = () => {
  return (
    <NavigationContainer>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthCheck />
        </ApplicationProvider>
      </>
    </NavigationContainer>
  );
};

export default App;

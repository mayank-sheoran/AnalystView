// Module Imports
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

// File Imports
import LoginStack from './loginStack';
import BottomNavStack from './dashboardStack/bottomNavStack';

const AuthCheck = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return <LoginStack />;
  }

  return <BottomNavStack />;
};

export default AuthCheck;

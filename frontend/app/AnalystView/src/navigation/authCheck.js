/* eslint-disable react-hooks/exhaustive-deps */
// Import modules
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// Import files
import LoginStack from './loginStack';
import BottomNavStack from './dashboardStack/bottomNavStack';
import {saveUserId, saveUser} from '../redux/actions/login';
import {fetchUserData} from './utils';

const AuthCheck = ({login, saveUser, saveUserId}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!initializing && user) {
      fetchUserData(saveUser, saveUserId, login);
    }
  }, [user]);

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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({saveUserId, saveUser}, dispatch);
};

const mapStateToProps = state => {
  const {login} = state;
  return {login};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck);

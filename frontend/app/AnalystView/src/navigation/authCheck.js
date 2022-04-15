/* eslint-disable react-hooks/exhaustive-deps */
// Module Imports
import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// File Imports
import LoginStack from './loginStack';
import BottomNavStack from './dashboardStack/bottomNavStack';
import axios from 'axios';
import {saveUserId, saveUser} from '../redux/actions/login';

const AuthCheck = ({login, saveUser, saveUserId}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const fetchUserData = async () => {
    try {
      const response = await axios.post(
        'http://192.168.29.84:3001/saveUserInfo',
        {
          userId: auth().currentUser.uid,
          phone: login.phone,
          currencySymbol: login.currencySymbol,
        },
      );
      if (!response.data.isError && response.data.data !== 'New user added') {
        saveUser({
          phone: response.data.data.phone,
          currencySymbol: response.data.data.currencySymbol,
        });
        saveUserId(auth().currentUser.uid);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!initializing && user) {
      fetchUserData();
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

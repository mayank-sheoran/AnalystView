// Module imports
import React, {useState} from 'react';
import {View, Text, Platform, Alert, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Icon} from '@ui-kitten/components';
import uuid from 'react-native-uuid';

// File imports
import {setSnapshotUUID} from '../../../../redux/actions/add';
import Loading from '../../../../components/loading';
import {COLORS} from '../../../../assets/theme';
import styles from './styles';
import {handleSelectPhoto} from './utils';

const uploadIcon = props => {
  return <Icon {...props} name="cloud-upload-outline" />;
};

const ImageSelector = ({snapshotUUID, setSnapshotUUID}) => {
  const [loading, setLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const uploadImage = async response => {
    const {uri} = response.assets[0];
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setLoading(true);
    setTransferred(0);
    const newSnapshotUUID = uuid.v4();
    const task = storage().ref(newSnapshotUUID).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      );
      switch (snapshot.state) {
        case storage.TaskState.PAUSED:
          setUploadStatus('Paused...');
          break;
        case storage.TaskState.RUNNING:
          setUploadStatus('Uploading...');
          break;
      }
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Upload Failed!');
    }
    setSnapshotUUID(newSnapshotUUID);
    setTransferred(0);
    setLoading(false);
    Alert.alert('Success', 'Photo uploaded!');
  };

  return (
    <View style={styles.base}>
      {loading && (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', marginRight: 20}}>
            {uploadStatus}
          </Text>
          <Text>{`${transferred}%`}</Text>
        </View>
      )}
      <Loading loading={loading}>
        <Button
          style={{width: '90%'}}
          accessoryLeft={uploadIcon}
          size="small"
          status={snapshotUUID ? 'primary' : 'danger'}
          onPress={() => handleSelectPhoto(uploadImage)}>
          Upload
        </Button>
      </Loading>
      <TouchableOpacity style={{marginLeft: 10}}>
        <Icon
          style={{width: 24, height: 24}}
          fill={COLORS.black}
          name="info-outline"
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  const {add} = state;
  const {snapshotUUID} = add;
  return {snapshotUUID};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setSnapshotUUID,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelector);

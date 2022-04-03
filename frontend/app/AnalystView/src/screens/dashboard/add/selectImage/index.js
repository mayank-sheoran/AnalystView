import React, {useState} from 'react';
import {View, Text, Platform, Alert, TouchableOpacity} from 'react-native';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Icon} from '@ui-kitten/components';
import uuid from 'react-native-uuid';

// Import files
import {setLoadings, setSnapshotUUID} from '../../../../redux/actions/add';
import Loading from '../../../../components/loading';
import {COLORS} from '../../../../assets/theme';
import styles from './styles';

const ImageSelector = ({add, setLoadings, setSnapshotUUID}) => {
  const [transferred, setTransferred] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const uploadIcon = props => {
    return <Icon {...props} name="cloud-upload-outline" />;
  };

  const uploadImage = async response => {
    const {uri} = response.assets[0];
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setLoadings('upload', true);
    setTransferred(0);
    const snapshotUUID = uuid.v4();
    const task = storage().ref(snapshotUUID).putFile(uploadUri);
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
    setSnapshotUUID(snapshotUUID);
    setTransferred(0);
    setLoadings('upload', false);
    Alert.alert('Success', 'Photo uploaded!');
  };

  const handleSelectPhoto = async () => {
    Alert.alert('Choose Option', 'Upload image from ?', [
      {
        text: 'Camera',
        onPress: async () => {
          await launchCamera(options, response => {
            if (response) {
              uploadImage(response);
            }
          });
        },
        style: 'destructive',
      },
      {
        text: 'Library',
        onPress: async () => {
          await launchImageLibrary(options, response => {
            if (response) {
              uploadImage(response);
            }
          });
        },
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'destructive',
      },
    ]);
    const options = {
      mediaType: 'photo',
      quality: 0.05,
      cameraType: 'back',
    };
  };

  return (
    <View style={styles.base}>
      {add.loadings.upload && (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', marginRight: 20}}>
            {uploadStatus}
          </Text>
          <Text>{`${transferred}%`}</Text>
        </View>
      )}
      <Loading loading={add.loadings.upload}>
        <Button
          style={{width: '90%'}}
          accessoryLeft={uploadIcon}
          size="small"
          status={add.snapshotUUID ? 'primary' : 'danger'}
          onPress={handleSelectPhoto}>
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
  return {add};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLoadings,
      setSnapshotUUID,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelector);

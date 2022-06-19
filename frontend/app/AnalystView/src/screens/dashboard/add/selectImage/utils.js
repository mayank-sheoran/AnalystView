// Module imports
import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// File imports

export const handleSelectPhoto = async uploadImage => {
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

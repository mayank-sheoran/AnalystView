import {Image, TouchableOpacity, View, ScrollView} from 'react-native';
import {Icon} from '@ui-kitten/components';
import React from 'react';
import PhotoView from 'react-native-photo-view-ex';

// Import files
import styles from './styles';
import {COLORS} from '../../../../../assets/theme';

const FullScreenImage = ({fullScreenImage, setFullScreenImage}) => {
  return (
    <View style={styles.base}>
      <PhotoView
        source={{uri: fullScreenImage}}
        minimumZoomScale={1}
        maximumZoomScale={3}
        resizeMode="center"
        style={styles.fullImage}
      />

      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setFullScreenImage(null)}>
        <Icon
          style={{
            width: 40,
            height: 40,
          }}
          fill={COLORS.black}
          name="close-square-outline"
        />
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenImage;

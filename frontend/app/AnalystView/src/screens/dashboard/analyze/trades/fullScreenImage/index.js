// Module imports
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '@ui-kitten/components';
import React from 'react';
import PhotoView from 'react-native-photo-view-ex';

// File imports
import styles from './styles';
import {COLORS, ICONS} from '../../../../../assets/theme';

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
          name={ICONS.close_square_outline}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenImage;

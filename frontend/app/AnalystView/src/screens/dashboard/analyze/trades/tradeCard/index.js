// Module imports
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '@ui-kitten/components';

// File imports
import styles from '../styles';
import {COLORS} from '../../../../../assets/theme';

const TradeCard = ({
  imageUrls,
  snapshotUUID,
  setFullScreenImage,
  setSelectedTrade,
  bottomSheetRef,
  trade,
}) => {
  return (
    <View style={styles.tradeCard} key={snapshotUUID}>
      <TouchableWithoutFeedback
        onPress={() => setFullScreenImage(imageUrls[snapshotUUID])}>
        <Image
          source={{
            uri: imageUrls[snapshotUUID],
          }}
          style={styles.image}
        />
      </TouchableWithoutFeedback>

      <TouchableOpacity
        style={styles.expandButton}
        onPress={() => {
          setSelectedTrade(trade);
          console.log(trade);
          bottomSheetRef.current.expand();
        }}>
        <Icon
          style={{
            width: 30,
            height: 30,
          }}
          fill={COLORS.blue}
          name="expand-outline"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TradeCard;

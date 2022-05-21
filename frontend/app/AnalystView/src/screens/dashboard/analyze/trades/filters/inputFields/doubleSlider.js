import * as React from 'react';
import {View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

// Import files
import styles from './styles';
import {COLORS} from '../../../../../../assets/theme';

const SliderContainer = ({children, range, setRange}) => {
  const [value, setValue] = React.useState(range);
  const renderChildren = () => {
    return React.Children.map(children, child => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: nextValue => {
            setValue(nextValue);
            setRange(nextValue);
          },
          value,
        });
      }
      return child;
    });
  };

  return <View style={styles.sliderContainer}>{renderChildren()}</View>;
};

const DoubleSlider = ({range, setRange}) => {
  return (
    <SliderContainer range={range} setRange={setRange}>
      <Slider
        animateTransitions
        maximumTrackTintColor={COLORS.light_grey}
        maximumValue={50000}
        minimumTrackTintColor={COLORS.blue}
        minimumValue={0}
        step={2}
        thumbTintColor={COLORS.blue}
      />
    </SliderContainer>
  );
};

export default DoubleSlider;

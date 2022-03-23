import {Alert} from 'react-native';

const notify = props => {
  return Alert.alert(props.heading, props.subHeading);
};

export default notify;

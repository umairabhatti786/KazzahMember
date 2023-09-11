/**
 * @format
 */

import {AppRegistry, TextInput} from 'react-native';
import 'react-native-gesture-handler';
import App from './src/index';
import {name as appName} from './app.json';
import {Text} from 'ui';
import PhoneInput from 'react-native-phone-number-input';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}
if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
if (PhoneInput.defaultProps == null) {
  PhoneInput.defaultProps = {};
  PhoneInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);

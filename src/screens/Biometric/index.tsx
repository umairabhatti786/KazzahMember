import React, {useEffect} from 'react';
import {Pressable} from 'ui';
import {authSelector, setIsBioVerified} from 'reducers/authReducer';
import {useDispatch} from 'react-redux';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useSelector} from 'react-redux';
import {Splash} from 'screens/Splash';
export const Biometric = () => {
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const dispatch = useDispatch();

  const user = useSelector(authSelector);

  const biometricLogin = async () => {
    try {
      const {biometryType, available} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        dispatch(setIsBioVerified(true));
        return;
      }
      if (!user.isLoggedIn) {
        dispatch(setIsBioVerified(true));
        return;
      }

      const resultObject = rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      // .then(resultObject => {
      const {success} = await resultObject;

      if (success) {
        console.log('successful biometrics provided');
        dispatch(setIsBioVerified(true));
      } else {
        console.log('user cancelled biometric prompt');
      }
      // })
      // .catch(() => {

      // });
    } catch (error) {
      // Alert.alert('Biometrics Failed');
      console.log('biometrics failed');
    }
  };

  useEffect(() => {
    biometricLogin();
  }, []);

  return (
    <Pressable onPress={biometricLogin} flex={1}>
      <Splash />
    </Pressable>
  );
};

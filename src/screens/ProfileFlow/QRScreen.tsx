import React, {useEffect, useState} from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import QRScreenIcon from '../../assets/QRScreenIcon.svg';
import Button from 'newComponents/Button';
import {Linking, Platform, StyleSheet} from 'react-native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import QRCode from 'react-native-qrcode-svg';
import {RNCamera} from 'react-native-camera';
import {request, PERMISSIONS} from 'react-native-permissions';
import SimpleToast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';

const QRScreen = () => {
  const {colors} = useTheme();

  const [permissionsAllowed, setPermissionsAllowed] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      checkPermission();
    });

    return unsubscribe;
  }, []);

  const checkPermission = async () => {
    const res = await request(
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );

    setPermissionsAllowed(res == 'granted');
  };

  const onBarcodeDetected = ({data}: any) => {
    navigation.navigate('MemberProfileScreen', {
      data: {id: data},
    });

    // navigation.navigate('ProviderProfileScreen', {
    //   proId: data,
    //   isNotification: false,
    // });
  };

  return (
    <View flex={1} alignItems={'center'} justifyContent={'center'}>
      {permissionsAllowed ? (
        <RNCamera
          style={StyleSheet.absoluteFill}
          onBarCodeRead={onBarcodeDetected}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
        />
      ) : (
        <>
          <FastImage
            style={{height: scale(105), width: scale(105)}}
            source={require('../../assets/cameraIconWithBox.png')}
          />
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text
              style={[
                textStyle.h1,
                textStyle.center,
                {color: colors.black, width: '60%', marginTop: scale(5)},
              ]}
            >
              Can we use your camera?
            </Text>
            <View height={verticalScale(5)} />
            <Text
              style={[
                textStyle.b3,
                {
                  textAlign: 'center',
                  width: '70%',
                  color: colors.black,
                },
              ]}
            >
              To scan QR codes for adding friends and trusted Pros to Kazzah,
              allow us to use your camera.
            </Text>
          </View>

          <View style={styles.proBtn}>
            <Button
              label="Open Settings"
              width={'50%'}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  proBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(20),
  },
});

export default QRScreen;

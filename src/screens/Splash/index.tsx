import React, {useEffect} from 'react';
import {View} from 'ui';
import {StyleSheet, Dimensions, Easing, Animated} from 'react-native';
import SplashBackground from '../../assets/SplashBackground.svg';
import SplashLogo from '../../assets/SplashLogo.svg';
const {height, width} = Dimensions.get('screen');

export const Splash = () => {
  const scaleValue = new Animated.Value(0.8);
  const opacityValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);
  return (
    <View flex={1}>
      <Animated.View style={[StyleSheet.absoluteFill, {position: 'absolute'}]}>
        <SplashBackground height={height} width={width} />
      </Animated.View>

      <Animated.View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{scale: scaleValue}],
            opacity: opacityValue,
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <SplashLogo />
      </Animated.View>
    </View>
  );
};

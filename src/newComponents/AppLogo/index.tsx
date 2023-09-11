import React from 'react';
import AppLogoSVG from '../../assets/AppLogo.svg';
import AppLogoWhite from '../../assets/AppLogoWhite.svg';
import {Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';

const AppLogo = () => {
  const {colors} = useTheme();
  const {colorScheme} = useColorScheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {colorScheme == 'dark' ? (
        <AppLogoWhite stroke={'#000000'} height={scale(24)} width={scale(25)} />
      ) : (
        <AppLogoSVG height={scale(24)} width={scale(25)} />
      )}

      <Text
        style={{
          fontFamily: 'Calibre',
          fontSize: 21,
          fontWeight: '600',
          top: 3,
          start: 2,
          color: colors.black,
        }}
      >
        KAZZAH
      </Text>
    </View>
  );
};

export default AppLogo;

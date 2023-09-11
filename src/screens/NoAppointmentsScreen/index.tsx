import React from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import AppInnerHeader from 'newComponents/AppHeader';
import NoAppointmentScreenIcon from '../../assets/NoAppointmentScreenIcon.svg';
import Button from 'newComponents/Button';
import {StyleSheet} from 'react-native';

const NoAppointmentsScreen = () => {
  const {colors} = useTheme();
  return (
    <Screen
      edges={['right', 'top', 'left']}
      backgroundColor={colors.background}>
      <AppInnerHeader />
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <NoAppointmentScreenIcon />
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text
            style={[
              textStyle.h1,
              textStyle.center,
              {color: colors.black, width: '70%', marginTop: scale(5)},
            ]}>
            Access to all your Pros in one platform.
          </Text>
          <View height={verticalScale(5)} />
          <Text
            style={[
              textStyle.b3,
              textStyle.center,
              {
                width: '70%',
                color: colors.black,
                marginTop: scale(3),
              },
            ]}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore.
          </Text>
        </View>

        <View style={styles.proBtn}>
          <Button label="Add Pro" width={'42%'} onPress={() => {}} />
        </View>
      </View>
    </Screen>
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

export default NoAppointmentsScreen;

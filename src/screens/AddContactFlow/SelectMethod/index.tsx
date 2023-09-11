import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import AppInnerHeader from 'newComponents/AppHeader';
import {Title} from 'newComponents/TextComponents';
import CustomSearch from 'newComponents/CustomSearch';
import {CalendarView} from 'screens/CalendarView';
import AddAppointment from 'newComponents/AddAppointment';
import AppBackHeader from 'newComponents/AppBackHeader';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import MethodContainer from './MethodContainer';
import QRCodeScannerContainer from './QRCodeScannerContainer';

export const SelectMethod = (props: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const addPro = props?.route?.params?.addPro;
  console.log('AddPro', addPro);

  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
        <BackButtonHeader showPages={false} />

        <Title title={'Select method'} />
        <View style={{paddingHorizontal: '6%', flex: 1}}>
          <MethodContainer navigation={props.navigation} addPro={addPro} />
        </View>
        <View style={{paddingHorizontal: '6%'}}>
          <QRCodeScannerContainer />
          <View height={verticalScale(50)} />
        </View>
      </Screen>

      {/* <AddAppointment
        onPress={() => {
          props.navigation.navigate('ChooseProStack');
        }}
      /> */}
    </>
  );
};

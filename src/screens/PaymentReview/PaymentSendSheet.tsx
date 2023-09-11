import {FlatList, StyleSheet, ScrollView, Platform} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import CrossIcon from '../../../src/assets/CrossIcon.svg';
import PaymentSendIcon from '../../../src/assets/PaymentSendIcon.svg';

import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
// import AppointmentApprovalCard from './AppointmentApprovalCard';
import {getAddAppointment} from 'reducers/addAppointmentReducer';
import AppointmentApprovalCard from 'screens/AddAppoinmentFlow/ReviewDetails/AppointmentApprovalCard';
import PaymentPaidCard from './PaymentPaidCard';
import {useDispatch} from 'react-redux';
import {
  setEmptyPaymentCashResponse,
  setEmptyPaymentResponse,
} from 'reducers/PaymentReducer';

const PaymentSendSheet = ({visible, setVisible}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    dispatch(setEmptyPaymentResponse());
    dispatch(setEmptyPaymentCashResponse());

    navigation.navigate('Paid');
  };
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View
        flexDirection={'column'}
        alignSelf="center"
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={Platform.OS == 'android' ? '65%' : '75%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <CrossIcon
          onPress={onClose}
          style={{color: colors.black, width: scale(40), height: scale(40)}}
        />

        <View
          style={{
            width: '100%',
            marginTop: verticalScale(20),
            alignItems: 'center',
          }}
        >
          <PaymentSendIcon style={{width: scale(40), height: scale(40)}} />
          <View height={verticalScale(10)} />
          <View style={{marginHorizontal: scale(30)}}>
            <Text
              style={[textStyle.h1, {textAlign: 'center', color: colors.black}]}
            >
              Payment sent.
            </Text>
            <View height={verticalScale(5)} />

            <Text style={[textStyle.b4, {textAlign: 'center'}]}>
              Your payment has been sent to your Pro.
            </Text>
          </View>
        </View>
        <View height={verticalScale(10)} />
        <PaymentPaidCard />

        <View height={verticalScale(20)} />
        <Button
          label="Return to Appointments"
          width={'100%'}
          onPress={onClose}
        />
      </View>
    </BottomSheet>
  );
};

export default PaymentSendSheet;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });

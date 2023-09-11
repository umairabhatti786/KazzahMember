import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import CrossIcon from '../../../../src/assets/CrossIcon.svg';
import Approval from '../../../../src/assets/Approval.svg';

import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import AppointmentApprovalCard from './AppointmentApprovalCard';
import {getAddAppointment} from 'reducers/addAppointmentReducer';

const AppointmentApprovalSheet = ({visible, setVisible}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const onClose = () => {
    setVisible(false), navigation.navigate('Pending');
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
        height={'71%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <Pressable style={styles.crossIcon} onPress={onClose}>
          <CrossIcon
            style={{
              color: colors.black,
              width: scale(40),
              height: scale(40),
            }}
          />
        </Pressable>

        <View
          style={{
            width: '100%',
            marginTop: verticalScale(5),
            alignItems: 'center',
          }}
        >
          <Approval style={{width: scale(35), height: scale(35)}} />
          <View style={{marginHorizontal: scale(20)}}>
            <Text
              style={[textStyle.h1, {textAlign: 'center', color: colors.black}]}
            >
              Request sent for Pro approval.
            </Text>
            <View height={verticalScale(5)} />

            <Text style={[textStyle.b4, {textAlign: 'center'}]}>
              This booking is pending until your pro accepts appointment. You
              will receive a notification when accepteded.
            </Text>
          </View>
        </View>
        <View height={verticalScale(10)} />
        <AppointmentApprovalCard />
        <View height={verticalScale(10)} />
        <Button
          label="Return to Appointments"
          width={'100%'}
          onPress={() => navigation.navigate('Pending')}
        />
      </View>
    </BottomSheet>
  );
};

export default AppointmentApprovalSheet;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(30),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
    crossIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: scale(40),
      width: scale(40),
      marginTop: scale(-10),
      marginLeft: scale(-10),
    },
  });

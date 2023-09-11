import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import CrossIcon from '../../../src/assets/CrossIcon.svg';
import Approval from '../../../src/assets/Approval.svg';

import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import {getAddAppointment} from 'reducers/addAppointmentReducer';

const ContactInvitationSheet = ({
  visible,
  setVisible,
  onReturn,
  onReturnAddAnother,
  AddTeam,

  isPro,
}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onReturn}
      onBackdropPress={onReturn}>
      <View
        flexDirection={'column'}
        alignSelf="center"
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={'62%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Pressable width={scale(50)} height={scale(50)} onPress={onReturn}>
          <CrossIcon
            onPress={onReturn}
            style={{color: colors.black, width: scale(40), height: scale(40)}}
          />
        </Pressable>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Approval style={{width: scale(40), height: scale(40)}} />
          <View height={verticalScale(10)} />
          <View style={{marginHorizontal: scale(30)}}>
            <Text style={[textStyle.h1, {textAlign: 'center', color: 'black'}]}>
              Invitations sent.
            </Text>
            <View height={verticalScale(5)} />

            <Text style={[textStyle.b4, {textAlign: 'center'}]}>
              Your invitations have been sent. Once accepted, you’ll be
              notified.
            </Text>
          </View>
        </View>
        <View height={verticalScale(10)} />

        <View height={verticalScale(10)} />
        <Button
          label={isPro ? 'Add another Pro' : 'Add another Friend'}
          width={'100%'}
          onPress={onReturnAddAnother}
        />
        <View height={verticalScale(10)} />

        <Button
          width={'100%'}
          onPress={onReturn}
          variant="secondary"
          label={AddTeam ? 'Return to Team' : 'Return to Contacts'}
        />
      </View>
    </BottomSheet>
  );
};

export default ContactInvitationSheet;

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

import {StyleSheet, ScrollView} from 'react-native';
import {Screen, View} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import ProDetailInfo from './ProDetailInfo';
import {useDispatch} from 'react-redux';
import {
  fetchAppointmentDetails,
  getAppointmentDetails,
  getAppointmentDetailsLoading,
} from 'reducers/appoinmentReducer';
import AppointmentService from 'newComponents/AppointmentService';
const AppointmentDetail = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const appointmetDetails = useSelector(getAppointmentDetails);
  const isLoading = useSelector(getAppointmentDetailsLoading);

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const pros = useSelector(getSelectedPro);
  const AppointmentId = route.params?.id;

  useEffect(() => {
    dispatch(fetchAppointmentDetails(AppointmentId));
  }, []);

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}>
        <BackButtonHeader showPages={false} />
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '5%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingBottom: scale(150),
                backgroundColor: 'transparent',
                width: '100%',
              }}>
              <View height={verticalScale(30)} />
              <ProDetailInfo
                navigation={navigation}
                ProviderDetail={appointmetDetails?.provider}
              />

              <AppointmentService
                appointmentDetail={appointmetDetails}
                paymentDetail={true}
              />
            </View>
          </ScrollView>
        </View>
      </View>
      {appointmetDetails?.status == 'completed' &&
      appointmetDetails?.isPaid != 1 ? (
        <View style={styles.proBtn}>
          <Button
            label="Pay now"
            width={'90%'}
            onPress={() => {
              navigation.navigate('PayReservationFess', {
                choosePayment: true,
                appointmentId: appointmetDetails.id,
                paymentType: 'af',
              });
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
};

export default AppointmentDetail;

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

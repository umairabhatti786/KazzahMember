import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import ProInfo from 'newComponents/ProInfo';
import textStyle from 'theme/typoGraphy';
import TimeCounter from 'newComponents/TimeCounter';
import ServiceDetails from './ServiceDetails';
import AppointmentApprovalSheet from './AppointmentApprovalSheet';
import {useToast} from 'react-native-toast-notifications';
import {getAddAppointment} from 'reducers/addAppointmentReducer';
import services from 'services';
import {
  getApponintmentCashFeeLoading,
  getApponintmentFeeResponse,
  getSelectedCard,
  payAppointmentFee,
} from 'reducers/PaymentReducer';
import {useDispatch} from 'react-redux';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';

const ReviewDetails = (props: any) => {
  const [ApprovalSheet, setApprovalSheet] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const AddTipProp = props?.route?.params?.AddTip;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const appointment = useSelector(getAppointmentDetails);
  const selectedCard = useSelector(getSelectedCard);

  const serverAppointment = useSelector(getAppointmentDetails);
  const loading = useSelector(getApponintmentCashFeeLoading);

  const toggleBottomSheet = () => {
    setApprovalSheet(!ApprovalSheet);
  };
  const toast = useToast();
  const submit = async () => {
    try {
      setIsBooking(true);
      let res;

      if (appointment.isReservationFee == 1) {
        res = await dispatch(payAppointmentFee(selectedCard)).unwrap();
        await services.appointmentStatusUpdate(appointment.id, 'pending');
      } else {
        res = (
          await services.appointmentStatusUpdate(appointment.id, 'pending')
        ).data;
      }

      console.log(
        '🚀 ~ file: index.tsx:48 ~ submit ~ res:',
        JSON.stringify(res, null, 2),
        appointment.id,
      );
      if (res.success) {
        toast.show('Appointment Booked!', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        toggleBottomSheet();
        setIsBooking(false);

        //  navigation.navigate("Home")
      }
    } catch (error) {
      setIsBooking(false);

      toast.show('Server Error, Something went wrong!', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{paddingHorizontal: '6%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: scale(300),
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
              >
                <View height={verticalScale(30)} />
                <ProInfo />
                <View height={verticalScale(20)} />

                <View
                  style={{backgroundColor: colors.silverChalice, height: 0.5}}
                />
                <ServiceDetails />
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.proBtn}>
          <Button
            disabled={isBooking ? true : false}
            label="Book now"
            width={'90%'}
            onPress={submit}
          />
        </View>
      </Screen>
      <AppointmentApprovalSheet
        visible={ApprovalSheet}
        setVisible={toggleBottomSheet}
      />
    </>
  );
};

export default ReviewDetails;

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

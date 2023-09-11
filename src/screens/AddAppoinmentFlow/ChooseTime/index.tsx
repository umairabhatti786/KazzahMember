import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, View} from 'ui';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import AppointmentTime from './AppointmentTime';
import TimeCounter from 'newComponents/TimeCounter';
import {useSelector} from 'react-redux';
import {
  getAddAppointment,
  setAppointmentCreatedAt,
  setAppointmentId,
} from 'reducers/addAppointmentReducer';
import {useToast} from 'react-native-toast-notifications';
import services from 'services';
import {useDispatch} from 'react-redux';
import {
  getAppointmentDetails,
  getAppointmentReserved,
  setAppointmentDetails,
  setAppointmentReserved,
} from 'reducers/appoinmentReducer';
import {fetchReservationTimeConfig} from 'reducers/configurationReducer';

const ChooseTime = ({navigation, route}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const scheduleTime = useSelector(getAddAppointment).startTime;
  const isReservationFee = useSelector(getAddAppointment).isReservationFee;
  const [isBooking, setIsBooking] = useState(false);

  const toast = useToast();
  const dispatch = useDispatch();
  const appointment = useSelector(getAddAppointment);
  const serverAppointment = useSelector(getAppointmentDetails);

  useEffect(() => {
    dispatch(fetchReservationTimeConfig());
  }, []);

  const submit = () => {
    if (scheduleTime == '') {
      toast.show('Please select a time', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      return;
    } else {
      createAppointment();
    }
  };

  const createAppointment = async () => {
    try {
      setIsBooking(true);
      let res;
      if (appointment.appointmentId == 0) {
        res = await services.postAppointment(appointment);
      } else {
        res = await services.patchAppointment(appointment);
      }

      if (res.data.success) {
        setIsBooking(false);

        dispatch(setAppointmentId(res.data.data.id));
        dispatch(setAppointmentCreatedAt(res.data.data.createdAt));

        toast.show('Appointment Reserved!', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        dispatch(setAppointmentDetails(res.data.data));
        dispatch(setAppointmentReserved(true));

        if (isReservationFee == 1) {
          navigation.navigate('PayReservationFess', {
            paymentType: 'rf',
            appointmentId: res.data?.data?.id,
            choosePayment: false,
          });
        } else {
          navigation.navigate('ReviewDetails');
        }
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
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <View height={verticalScale(10)} /> */}
        <View style={{paddingHorizontal: '6%'}}>
          {/* <TimeCounter
            time={time}
            setTime={setTime}
            setSeconds={setSeconds}
            seconds={seconds}
          /> */}
          <AppointmentTime />
        </View>
        <View style={styles.proBtn}>
          <Button
            disabled={isBooking ? true : false}
            label="Continue"
            width={'90%'}
            onPress={submit}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ChooseTime;

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

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Screen, View} from 'ui';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import ServiceCalendar from './ServiceCalendar';
import {GetVacations} from 'services/schedule';
import moment from 'moment';
import {
  fetchTimeSlots,
  getAddAppointment,
  getAppointmentProvider,
  getProviderSchedule,
  getSelectedServices,
} from 'reducers/addAppointmentReducer';
import {useToast} from 'react-native-toast-notifications';
import services from 'services';
import {useDispatch} from 'react-redux';
import TimeCounter from 'newComponents/TimeCounter';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';

const SelectDate = ({navigation}: any) => {
  const schedule = useSelector(getProviderSchedule);

  const scheduleDate = useSelector(getAddAppointment).date;

  const toast = useToast();

  const isFocused = useIsFocused();

  const [vacations, setVacations] = useState<any[]>([]);

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const provider = useSelector(getAppointmentProvider);
  const selectedServices = useSelector(getSelectedServices);
  const isReservationFee = useSelector(getAddAppointment).isReservationFee;
  const serverAppointment = useSelector(getAppointmentDetails);

  const appointment = useSelector(getAddAppointment);

  const dispatch = useDispatch();
  const getSchedule = async () => {
    const vacationsRes = await services.getVacations(provider?.id);

    const vacationList = vacationsRes?.data?.data?.map(e => {
      return {
        startDateTime: moment(e.startDateTime).format('YYYY-MM-DD'),
        endDateTime: moment(e.endDateTime).format('YYYY-MM-DD'),
      };
    });

    setVacations(vacationList);
  };

  useEffect(() => {
    getSchedule();
  }, [isFocused]);
  const next = () => {
    if (!scheduleDate) {
      toast.show('Please select a date', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      return;
    }

    dispatch(
      fetchTimeSlots({
        servicesId: selectedServices.map(e => e.service.id).toString(),
        date: scheduleDate,
        providerId: provider.id,
      }),
    );

    navigation.navigate('ChooseTime');
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View flex={1}>
        <View>
          <ServiceCalendar
            isWeekly={!schedule?.isWeekly}
            days={schedule?.days}
            vacations={vacations}
          />
        </View>
      </View>

      <View style={styles.proBtn}>
        <Button label="Continue" width={'90%'} onPress={next} />
      </View>
    </Screen>
  );
};

export default SelectDate;

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

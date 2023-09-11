import React from 'react';
import {StyleSheet} from 'react-native';
import {Screen, View, Text} from 'ui';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import ProInfo from 'newComponents/ProInfo';
import textStyle from 'theme/typoGraphy';
import ProSecvicesForm from './ProSecvicesForm';
import {useSelector} from 'react-redux';
import {
  getAddAppointment,
  getSelectedServices,
} from 'reducers/addAppointmentReducer';
import {useToast} from 'react-native-toast-notifications';
import TimeCounter from 'newComponents/TimeCounter';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';

const SelectServices = ({navigation, route}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const toast = useToast();
  const appointment = useSelector(getAddAppointment);
  const serverAppointment = useSelector(getAppointmentDetails);

  const selectedServicesId = useSelector(getSelectedServices).map(
    e => e.service.id,
  );

  const submit = () => {
    if (selectedServicesId.length == 0) {
      toast.show('Please select at least one service', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else {
      navigation.navigate('SelectDate');
    }
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{paddingHorizontal: '6%'}}>
          <ProInfo />

          <View
            style={{
              backgroundColor: colors.gallery,
              height: 1,
              marginVertical: verticalScale(20),
            }}
          />

          <Text
            style={[
              textStyle.cta1,
              {color: colors.black, marginBottom: verticalScale(10)},
            ]}
          >
            Services
          </Text>
          {appointment?.isReservationFee == 1 && (
            <Text
              style={[
                textStyle.b5,
                {color: colors.black, marginBottom: verticalScale(5)},
              ]}
            >
              {`This Pro includes a reservation fee of $${Number(
                appointment.reservationFee,
              ).toFixed(2)} that you will pay today upon check-out.`}
            </Text>
          )}
        </View>
        <ProSecvicesForm />
      </View>

      <View style={styles.proBtn}>
        <Button label="Continue" width={'90%'} onPress={submit} />
      </View>
    </Screen>
  );
};

export default SelectServices;

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

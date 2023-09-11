import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  fetchProviderLastAppointment,
  fetchProviderNextAppointment,
  getProviderId,
  getProviderLastAppointment,
  getProviderNextAppointment,
} from 'reducers/providerReducer';
import {GetLastAppointments} from 'services/ProviderProfile';
import {View} from 'ui';
import LastAppointmentsCard from './LastAppointmentCard';
import NextAppointmentsCard from './NextAppointmentsCard';

const ProfileAppointments = () => {
  const lastAppointment = useSelector(getProviderLastAppointment);
  const nextAppointment = useSelector(getProviderNextAppointment);

  const dispatch = useDispatch();
  const providerId = useSelector(getProviderId);
  useEffect(() => {
    dispatch(fetchProviderLastAppointment(providerId));
    dispatch(fetchProviderNextAppointment(providerId));
  }, []);

  return (
    <View flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(100)}}>
        {!nextAppointment?.Found && (
          <NextAppointmentsCard label="Next"  nextAppointment={nextAppointment} />
        )}
        {!lastAppointment?.Found && (
          <NextAppointmentsCard  label="Last" nextAppointment={lastAppointment} />
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileAppointments;

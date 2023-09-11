import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  fetchProviderSchedule,
  resetAddAppointment,
  setAppointmentProvider,
  setSelectedServices,
} from 'reducers/addAppointmentReducer';
import {setAppointmentReserved} from 'reducers/appoinmentReducer';

const useService = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleBookAppointment = (provider: any) => {
    dispatch(resetAddAppointment());
    dispatch(setAppointmentReserved(false));
    dispatch(fetchProviderSchedule(provider?.id));

    dispatch(
      setAppointmentProvider({
        id: provider?.id,
        name: `${provider?.firstName} ${provider?.lastName}`,
        firstName: provider?.firstName,
        lastName: provider?.lastName,
        profilePicture: provider?.thumbnailUrl,
        channel: provider?.rootService,
        address: provider?.address,
      }),
    );

    navigation.navigate('AddAppointmentStack', {
      screen: 'SelectServices',
    });
  };

  const setServicesForRebook = (services: any) => {
    dispatch(setSelectedServices(services));
  };

  return {
    handleBookAppointment,
    setServicesForRebook,
  };
};

// Export
export default useService;

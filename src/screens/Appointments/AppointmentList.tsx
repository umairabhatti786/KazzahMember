import AppointmentCard from 'newComponents/AppointmentCard';
import AppointmentViewType from 'newComponents/AppointmentViewType';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import NoAppointmentsScreen from 'screens/NoAppointmentsScreen';
import {View} from 'ui';

type Props = {
  appointments: any[];
  loading?: boolean;
};

const AppointmentList = ({appointments, loading = false}: Props) => {
  const {colors} = useTheme();

  const [ismodalVisible, setModalVisible] = useState(false);
  const [lastAppointment, setLastAppointment] = useState<any>();
  const [prov, setProv] = useState<any>();
  const [rebookState, setRebookState] = useState(false);

  const toggleModal = () => {
    setModalVisible(!ismodalVisible);
  };

  const onPressRebook = (item: any) => {
    const p = {
      categoryId: 5,
      categoryName: 'Hair',
      firstName: item.provider.firstName,
      lastName: item.provider.lastName,
      id: item.provider.id,
      image: item.provider.profileImage,
      address: item.provider.address,
      street: item.provider.street,
      city: item.provider.city,
      state: item.provider.state,
      zip: item.provider.zip,
      appointmentId: item.id,
      schedules: item.provider.schedules,
    };

    setProv(p);
    setLastAppointment(item);
    toggleModal();
  };

  return (
    <React.Fragment>
      <FlatList
        data={appointments}
        renderItem={({item, index}) => {
          return (
            <AppointmentCard
              onPressRebook={onPressRebook}
              item={item}
              index={index}
            />
          );
        }}
        keyExtractor={(item, index) => item + index.toString()}
        ListEmptyComponent={
          <>
            {
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}
              >
                <AppointmentViewType />
              </View>
            }
          </>
        }
      />
    </React.Fragment>
  );
};

export default AppointmentList;

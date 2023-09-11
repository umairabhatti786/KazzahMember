import React, {useEffect, useState} from 'react';
import {Screen, View, Text, theme} from 'ui';
import {scale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import _ from 'lodash';

import {useFocusEffect} from '@react-navigation/native';
import AppInnerHeader from 'newComponents/AppHeader';
import {Title} from 'newComponents/TextComponents';
import CustomSearch from 'newComponents/CustomSearch';
import {CalendarView} from 'screens/CalendarView';
import AddAppointment from 'newComponents/AddAppointment';
import AppointmentList from './AppointmentList';
import {
  getAppointmentFilter,
  getAllAppointmentList,
  getAppointmentView,
  getActiveAppointmentList,
  getPastAppointmentList,
  getDeclinedAppointmentList,
  getPendingAppointmentList,
  setAllAppointmentsList,
  setActiveAppointmentsList,
  setDeclinedAppointmentsList,
  setPendingAppointmentsList,
  fetchAllAppointmentsList,
  fetchActiveAppointmentsList,
  fetchDeclinedAppointmentsList,
  fetchPastAppointmentsList,
  fetchPendingAppointmentsList,
  setPastAppointmentsList,
} from 'reducers/appoinmentReducer';
import {resetAddAppointment} from 'reducers/addAppointmentReducer';
import {EmptyAppointment} from './EmptyAppointment';
import useService from './services';

export const Appointments = props => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const AppointmentViewType = useSelector(getAppointmentView);
  const allAppointments = useSelector(getAllAppointmentList);
  const activeAppointments = useSelector(getActiveAppointmentList);
  const pendingAppointments = useSelector(getPendingAppointmentList);
  const declinedAppointments = useSelector(getDeclinedAppointmentList);
  const pastAppointments = useSelector(getPastAppointmentList);
  const selectedFilter = useSelector(getAppointmentFilter);
  const [searchText, setSearchText] = useState('');

  const [loading, setLoading] = useState(false);

  const {loadAppointments} = useService();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      loadAppointments();
    });

    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        props.navigation.setParams({data: null});

        props.navigation.setParams({event: null});
      };
    }, []),
  );
  const getAppointmentFromStatus = (selectedFilter: string) => {
    switch (selectedFilter) {
      case 'All':
        return allAppointments;
      case 'Active':
        return activeAppointments;
      case 'Declined':
        return declinedAppointments;
      case 'Past':
        return pastAppointments;

      default:
        return pendingAppointments;
    }
  };

  async function searchArray(text: any) {
    if (text === '') {
      if (selectedFilter == 'All') {
        dispatch(fetchAllAppointmentsList());
      } else if (selectedFilter == 'Active') {
        dispatch(fetchActiveAppointmentsList());
      } else if (selectedFilter == 'Declined') {
        dispatch(fetchDeclinedAppointmentsList());
      } else if (selectedFilter == 'Past') {
        dispatch(fetchPastAppointmentsList());
      } else dispatch(fetchPendingAppointmentsList());

      return;
    }

    const filterData = getAppointmentFromStatus(selectedFilter)?.filter(el => {
      return `${el.provider?.firstName}  ${
        el.provider?.lastName
      }  ${el?.services.map(item => item?.service?.name)} `
        .toLowerCase()
        .trim()
        .includes(text.toLowerCase().trim());
    });

    dispatch(
      selectedFilter == 'All'
        ? setAllAppointmentsList(filterData)
        : selectedFilter == 'Active'
        ? setActiveAppointmentsList(filterData)
        : selectedFilter == 'Declined'
        ? setDeclinedAppointmentsList(filterData)
        : selectedFilter == 'Past'
        ? setPastAppointmentsList(filterData)
        : setPendingAppointmentsList(filterData),
    );
  }

  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
        <AppInnerHeader />

        {allAppointments.length == 0 ? (
          <EmptyAppointment />
        ) : (
          <>
            <View flex={1} style={{backgroundColor: colors.background}}>
              <Title
                style={{fontSize: scale(42), marginTop: scale(-10)}}
                title={'Appointments'}
              />

              <CustomSearch
                onChangeFilterSearch={searchArray}
                width={'90%'}
                value={searchText}
                placeholder={'Search appointments'}
              />

              <View height={scale(20)} />
              {AppointmentViewType.isList ? (
                <AppointmentList
                  loading={loading}
                  appointments={getAppointmentFromStatus(selectedFilter)}
                />
              ) : (
                <CalendarView appointments={allAppointments} />
              )}
            </View>
            <AddAppointment
              onPress={() => {
                dispatch(resetAddAppointment());
                props.navigation.navigate('ChooseProStack');
              }}
            />
          </>
        )}
      </Screen>
    </>
  );
};

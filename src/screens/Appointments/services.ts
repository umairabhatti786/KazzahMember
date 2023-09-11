import React from 'react';
import {useDispatch} from 'react-redux';
import {
  fetchActiveAppointmentsList,
  fetchAllAppointmentsList,
  fetchDeclinedAppointmentsList,
  fetchPastAppointmentsList,
  fetchPendingAppointmentsList,
} from 'reducers/appoinmentReducer';

const useService = () => {
  const dispatch = useDispatch();

  const loadAppointments = () => {
    dispatch(fetchPendingAppointmentsList());
    dispatch(fetchActiveAppointmentsList());
    dispatch(fetchDeclinedAppointmentsList());
    dispatch(fetchAllAppointmentsList());
    dispatch(fetchPastAppointmentsList());
  };

  return {
    loadAppointments,
  };
};

// Export
export default useService;

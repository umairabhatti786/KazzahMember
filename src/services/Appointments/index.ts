import {client, clientJson} from 'api/client';
import URLS from 'api/Urls';

export const PostAppointment = async (token: string, data: any) => {
  try {
    const response = await clientJson.post(URLS.POST_APPOINTMENT, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
export const GetAppointment = async (id: any) => {
  return client.get(`${URLS.POST_APPOINTMENT}/${id}`);
};
export const getTimeSlots = async (
  servicesId: any,
  date: any,
  providerId: any,
) => {
  const url = `${URLS.GET_TIME_SLOTS}servicesId=${servicesId}&date=${date}&providerId=${providerId}`;
  return client.get(url);
};
export const RescheduleAppointment = async (token: string, data: any) => {
  try {
    const response = await clientJson.put(
      URLS.POST_RESCHEDULE_APPOINTMENT,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const CheckTimeSlots = async (
  startTime: any,
  endTime: any,
  date: any,
) => {
  const url = `${URLS.CHECK_TIME_SLOT}startTime=${startTime}&endTime=${endTime}&date=${date}`;
  console.log('🚀 ~ file: index.ts:28 ~ url:', url);
  return client.get(url);
};
export const appointmentStatusUpdateDissmiss = async (id: any, data: any) => {
  try {
    return await client.put(
      `${URLS.POST_APPOINTMENT_DISSMISS}${id}/status/dismissedByMember`,
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
  } catch (error) {
    return error.response;
  }
};

export const appointmentStatusUpdate = async (id: any, status: any) => {
  return clientJson.put(
    `${URLS.POST_APPOINTMENT}/${id}/status/${status}`,
    null,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export const checkVIC = async id => {
  try {
    return client.get(`${URLS.CHECK_VIC}/${id}`);
  } catch (error) {
    return error.response;
  }
};

export const fetchBookingByDateRequest = (date: any, providerId: string) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    throw new Error(
      'Invalid date format. Date should be in the format of 2023-02-09.',
    );
  }
  return client.get(URLS.GET_APPOINTMENT_BY_DATE, {
    params: {date, providerId, cancelAppointments: 1},
  });
};

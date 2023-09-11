import axios from 'axios';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {getCoords} from 'reducers/searchReducer';

export const convertDatetimeToAMPM = (date: any) => {
  const myDate = moment.utc(date);

  // Convert the time to local time and format it as a string
  return myDate.format('h:mm A');
};
export const appontmentStatus = {
  ALL: 'all',
  ACTIVE:
    'approved,rescheduleByProvider,approveByProvider,completed&isPaid=0,2',
  PENDING: 'pending,underTimeReserve,rescheduleByMember',
  DECLINED:
    'expiredTimeReserve,cancelledByMember,dismissedByMember,declineByProvider,cancel',
  PAST: 'completed&isPaid=1',
};
export const checkPasswordValidate = (value: any) => {
  if (!value?.match(/^(?=.*[A-Z])/)) {
    return;
  }
  if (!value?.match(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/)) {
    return;
  }
  if (!value?.match(/^(?=.*[0-9])/)) {
    return;
  }
  if (value?.length < 8) {
    return;
  }

  return true;
};
export const groupTeamPros = (arr: any) => {
  const grouped = arr.reduce((acc, curr) => {
    const index = acc.findIndex(
      innerArr => innerArr[0].categoryId === curr.categoryId,
    );
    if (index === -1) {
      acc.push([curr]);
    } else {
      acc[index].push(curr);
    }
    return acc;
  }, []);

  return grouped;
};

export const getContactFilterType = (item: any) => {
  return item == 'Friends'
    ? 'cc'
    : item == 'Providers'
    ? 'cp'
    : item == 'favourites'
    ? 'isFav'
    : 'all';
};
export const getAppointmentStatusText = (item: any) => {
  return item?.status?.toUpperCase() == 'CANCELLEDBYMEMBER'
    ? 'CANCELLED BY MEMBER'
    : item.status == 'approveByProvider'
    ? 'Confirmed by Pro'
    : item.status == 'declineByProvider'
    ? 'declined By Provider'
    : item.status == 'pending' && item.isPaid == 0 && item.isReservationFee != 0
    ? 'reservation fee not paid'
    : item.status == 'rescheduleByProvider'
    ? 'Confirmed by Pro'
    : item.status == 'rescheduleByMember'
    ? 'Pending Pro Approval'
    : item.status == 'completed' && item.isPaid != 1
    ? 'completed & Unpaid'
    : item.status == 'dismissedByMember'
    ? 'dismissed By Member'
    : item.status == 'completed' && item.isPaid == 1
    ? 'Completed & Paid'
    : item.status == 'expiredTimeReserve'
    ? 'Declined'
    : 'Pending Pro Approval';
};
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#DFD36A';
    case 'declineByProvider' || 'expiredTimeReserve' || 'dismissedByMember':
      return '#FF5555';
    case 'expiredTimeReserve':
      return '#FF5555';
    case 'approveByProvider':
      return '#74BC62';
    case 'completed':
      return '#74BC62';

    default:
      return '#000000';
  }
};

export * from './colors';
export * from './fonts';
export * from './sizes';
export * from './appStyles';

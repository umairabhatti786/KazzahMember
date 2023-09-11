import React from 'react';
import {Text, theme, View} from 'ui';
import Modal from 'react-native-modal';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {color} from 'react-native-reanimated';
import {
  convertInto12hourTime,
  dateTime,
} from 'screens/LastAppoinmentCalender/time';
import {useDispatch} from 'react-redux';
import {
  getAddAppointment,
  setAppointmentTimeDate,
} from 'reducers/addAppointmentReducer';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';

import {getAppointmentReserved} from 'reducers/appoinmentReducer';

const TimeList = ({item}: any) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const appointmentReserved = useSelector(getAppointmentReserved);

  const selectedTime = useSelector(getAddAppointment).startTime;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        if (appointmentReserved) {
          // toast.show(
          //   'If you change your time then it will discard your previous reserved appointment.',
          //   {
          //     type: 'error_custom',
          //     placement: 'bottom',
          //     duration: 4000,
          //     animationType: 'slide-in',
          //   },
          // );
          // return;
        }
        dispatch(setAppointmentTimeDate(item));
        console.log('uyut88', JSON.stringify(item, null, 2));
      }}
      style={{
        paddingHorizontal: scale(20),
        alignItems: 'center',
        paddingVertical: scale(12),
        borderRadius: scale(20),
        borderWidth: 1,
        backgroundColor:
          selectedTime == item.startTime ? colors.green : colors.background,
        borderColor:
          selectedTime == item.startTime ? colors.green : colors.black,
        justifyContent: 'center',
        margin: scale(5),
      }}
    >
      <Text
        style={[
          textStyle.b4,
          {
            color:
              selectedTime == item.startTime ? colors.background : colors.black,
          },
        ]}
      >
        {/* {convertInto12hourTime(dateTime('1970-01-01', item.startTime)).replace(
          'm',
          '',
        )} */}
        {moment(item?.startTime, 'hh:mm:ss').format('hh:mm a').replace('m', '')}
        {/* {item.startTime} */}
      </Text>
    </TouchableOpacity>
  );
};

export default TimeList;

const styles = StyleSheet.create({
  selectedText: {
    color: theme.colors.black,
    fontSize: scale(12),
    fontWeight: 'bold',
    letterSpacing: scale(0.2),
  },
  UnselectedText: {
    color: theme.colors.grey2,
    fontSize: scale(12),
    // fontWeight: 'bold',
    letterSpacing: scale(0.2),
  },
  selectTime: {
    flexDirection: 'row',
    height: scale(35),
    width: '100%',
    paddingHorizontal: scale(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    paddingLeft: scale(30),
  },
  selected: {
    height: scale(14),
    width: scale(14),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: scale(20),
    backgroundColor: theme.colors.primary,
  },
  Unselected: {
    height: scale(14),
    width: scale(14),
    borderWidth: 1,
    borderColor: theme.colors.grey3,
    borderRadius: scale(20),
    backgroundColor: theme.colors.white,
  },
});

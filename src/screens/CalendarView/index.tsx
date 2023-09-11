import _ from 'lodash';
import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
  WeekCalendar,
} from 'react-native-calendars';
import {View, Pressable, Text, theme, Screen} from 'ui';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CalanderDayView from 'newComponents/Calander/CalanderDayView';
import AppointmentViewType from 'newComponents/AppointmentViewType';
import textStyle from 'theme/typoGraphy';
import moment from 'moment';
import CalanderWeekView from 'newComponents/Calander/CalanderWeekView';
import CalanderMonthView from 'newComponents/Calander/CalanderMonthView';
import {colors, getStatusColor} from 'utils';
import ArrowDown from 'assets/ArrowDown.svg';
import MonthPicker from 'react-native-month-year-picker';

const today = new Date();

export const CalendarView = ({navigation, appointments}: any) => {
  const [CalnderEvents, setCalanderEvents] = useState([]);
  const [Calndermode, setCalndermode] = useState('Daily');
  const [dateSelected, setdateSelected] = useState(today);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || dateSelected;

      setDatePickerVisibility(false);
      setdateSelected(selectedDate);
    },
    [dateSelected, isDatePickerVisible],
  );
  useEffect(() => {
    console.log(appointments);
    const Array = [];

    appointments.map((item: any) => {
      let providerName = `${item.provider.firstName} ${item.provider.lastName}`;
      var newEndTime = item.endTime.split(':');
      var newStartTime = item.startTime.split(':');
      Array.push({
        title: providerName,
        start: new Date(
          parseInt(moment(item.appointmentDate).format('yyyy')),
          parseInt(moment(item.appointmentDate).format('M')) - 1,
          parseInt(moment(item.appointmentDate).format('D')),
          parseInt(newStartTime[0]),
          parseInt(newStartTime[1]),
        ),
        end: new Date(
          parseInt(moment(item.appointmentDate).format('yyyy')),
          parseInt(moment(item.appointmentDate).format('M')) - 1,
          parseInt(moment(item.appointmentDate).format('D')),
          parseInt(newEndTime[0]),
          parseInt(newEndTime[1]),
        ),
        description: item.appointmentAddress,
        is_approved: item.status,
        data: item,
      });
    });
    setCalanderEvents(Array);

    const newArray = appointments.map((item: any) => ({
      title: item.bookedBy,
      start: new Date(2023, 6, 21, 6, 0),
      end: new Date(2023, 6, 21, 7, 0),
      description: item.appointmentAddress,
      is_approved: item.status,
    }));
  }, [appointments]);

  return (
    <View flex={1}>
      {isDatePickerVisible && (
        <MonthPicker
          onChange={onValueChange}
          value={dateSelected}
          minimumDate={new Date()}
          maximumDate={new Date(2025, 5)}
          locale="us"
        />
      )}
      <View
        paddingVertical={'s'}
        flexDirection={'row'}
        alignItems={'center'}
        alignSelf={'flex-end'}
        width={'94%'}
        style={{zIndex: 9999}}
        justifyContent={'space-between'}
      >
        <View flex={1.8}>
          <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
            style={{flexDirection: 'row'}}
          >
            <Text style={[textStyle.h3, {color: colors.black}]}>
              {moment(dateSelected).format('MMMM YYYY')}
            </Text>
            <ArrowDown
              color={colors.black}
              width={scale(7.6)}
              height={scale(4.6)}
              style={{alignSelf: 'center', marginHorizontal: scale(5)}}
            />
          </TouchableOpacity>
          {/* // ) : (
          //   <View flex={1.8}>
          //     <Text style={[textStyle.h3, {color: colors.black}]}>
          //       {moment(today).format('MMMM YYYY')}
          //     </Text>
          //   </View>
          // )} */}
        </View>
        <View flex={1}>
          <AppointmentViewType setCalenderType={setCalndermode} />
        </View>
      </View>
      {Calndermode == 'Monthly' ? (
        <CalanderMonthView today={dateSelected} UserEvent={CalnderEvents} />
      ) : Calndermode == 'Weekly' ? (
        <CalanderWeekView today={dateSelected} UserEvent={appointments} />
      ) : (
        <CalanderDayView today={dateSelected} UserEvent={appointments} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeText: {
    color: 'black',
  },
  timeContainer: {
    height: 20,
    backgroundColor: 'red',
  },
  detailContainer: {
    height: 20,
    backgroundColor: 'red',
  },
  eventContainer: {
    height: 20,
    backgroundColor: 'red',
  },
  separator: {
    height: 20,
    backgroundColor: 'red',
  },
  selectedDayWeekCal: {
    backgroundColor: 'rgb(217,71,25)', // '#33d8b6',
    borderRadius: moderateScale(10),
    height: moderateScale(20),
    width: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  unSelectedDayWeekCal: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    height: moderateScale(20),
    width: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtWeekAppoint: {
    textAlign: 'center',
    color: '#111',
    fontSize: scale(8),
  },
  selectWeekAppoint: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: scale(8),
  },
  txtDate: {
    textAlign: 'center',
    color: '#fff',
  },
  txtDateSelected: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  displayContainer: {
    height: verticalScale(500),
  },
});

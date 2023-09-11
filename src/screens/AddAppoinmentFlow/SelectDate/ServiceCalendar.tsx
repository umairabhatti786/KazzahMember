import React, {useEffect, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import moment from 'moment';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import {getDaysBetween} from 'screens/LastAppoinmentCalender/time';
import {useSelector} from 'react-redux';
import {
  getAddAppointment,
  setAppointmentDate,
} from 'reducers/addAppointmentReducer';
import {useDispatch} from 'react-redux';
import {getAppointmentReserved} from 'reducers/appoinmentReducer';
import {useToast} from 'react-native-toast-notifications';

interface Props {
  horizontalView?: boolean;
  days: any;
  isWeekly: any;
  vacations: any;
}

const ServiceCalendar: React.FC<Props> = ({
  days,
  isWeekly,
  vacations,
  horizontalView,
}) => {
  const [availableDays, setAvailableDays] = useState({});
  const [selectData, setSelectData] = useState();
  const currentData = moment(new Date()).format('YYYY-MM-DD');
  const appointmentReserved = useSelector(getAppointmentReserved);
  const toast = useToast();

  const selectedDate = useSelector(getAddAppointment).date;
  const {colors} = useTheme();

  const availableDatesColor = {textColor: colors.background};
  const selectedDateColor = {
    selectedTextColor: colors.background,
    color: colors.green,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    let vacationDays = [];

    vacations.forEach(e => {
      vacationDays = [
        ...vacationDays,
        ...getDaysBetween(e.startDateTime, e.endDateTime),
      ];
    });

    if (days) {
      days = days.map(item => {
        return item.scheduleDays;
      });
      const d = getWeeks(days).filter(e => !vacationDays.includes(e));

      var availableD = {};
      d.forEach((element, index) => {
        availableD[element] = availableDatesColor;
        if (element == selectedDate) {
          availableD[element] = selectedDateColor;
        }
      });

      setAvailableDays(availableD);
    }
  }, [days, selectedDate]);

  const handleAvalibleDays = async ({dateString}: any) => {
    dispatch(setAppointmentDate(dateString));

    days = days?.map(item => {
      return item.scheduleDays;
    });
    let vacationDays = [];
    vacations.forEach(e => {
      vacationDays = [
        ...vacationDays,
        ...getDaysBetween(e.startDateTime, e.endDateTime),
      ];
    });

    const d = getWeeks(days).filter(e => !vacationDays.includes(e));
    if (d.includes(dateString)) {
      var avalibleD = {};
      d.forEach(element => {
        avalibleD[element] = availableDatesColor;
        if (element == dateString) {
          avalibleD[element] = selectedDateColor;
        }
      });
      setSelectData(dateString);
      setAvailableDays(avalibleD);
    }
  };

  function getWeeks(days: []) {
    var currentDate = moment();
    var weekStart = currentDate.clone();
    // var weekStart = currentDate.clone().startOf('isoWeek');
    var week = [];
    var daysLeft = !isWeekly ? 360 : 6;
    for (var i = 0; i <= daysLeft; i++) {
      week.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
    }
    week = week.filter(item => {
      return days?.includes(moment(item, 'YYYY-MM-DD').format('dddd'));
    });
    return week;
  }

  function renderCustomHeader(date: any) {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');

    return (
      <View style={styles.header}>
        <Text
          style={[{marginLeft: scale(5), color: colors.black}, textStyle.b3]}
        >{`${month}`}</Text>
        <Text
          style={[
            {marginRight: scale(5), color: colors.silverChalice},
            textStyle.b3,
          ]}
        >
          {year}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '82%',
          justifyContent: 'space-between',
          height: verticalScale(50),

          alignSelf: 'center',
        }}
      >
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(item => {
          return (
            <Text
              style={[
                textStyle.labe2,
                {color: colors.silverChalice, marginRight: scale(3)},
              ]}
            >
              {item}
            </Text>
          );
        })}
      </View>
      <View style={{backgroundColor: colors.silverChalice, height: 1}} />
      <CalendarList
        style={{
          width: '100%',
          height: '100%',
        }}
        markingType={'period'}
        markedDates={availableDays}
        firstDay={1}
        horizontal={false}
        pastScrollRange={50}
        futureScrollRange={50}
        pagingEnabled={horizontalView}
        renderHeader={!horizontalView ? renderCustomHeader : undefined}
        hideDayNames={true}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={false}
        onDayPress={handleAvalibleDays}
        dayComponent={data => {
          const {date, state, marking} = data;
          return (
            <TouchableOpacity
              onPress={() => {
                if (appointmentReserved) {
                  // toast.show(
                  //   'If you change your date then it will discard your previous reserved appointment.',
                  //   {
                  //     type: 'error_custom',
                  //     placement: 'bottom',
                  //     duration: 4000,
                  //     animationType: 'slide-in',
                  //   },
                  // );
                  // return;
                }
                handleAvalibleDays(date);
              }}
              disabled={!marking}
              style={{
                backgroundColor: marking ? marking.color : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                height: scale(30),
                width: scale(30),
                borderRadius: 30,
                borderWidth: date.dateString == currentData ? 1 : 0,
              }}
            >
              <Text
                style={[
                  textStyle.cta1,
                  {
                    color:
                      date.dateString == selectData
                        ? colors.background
                        : marking
                        ? colors.black
                        : colors.silverChalice,
                    marginTop: Platform.OS === 'ios' ? scale(5) : 0,
                  },
                ]}
              >
                {date?.day}
              </Text>
            </TouchableOpacity>
          );
        }}
        calendarHeight={!horizontalView ? 390 : undefined}
        staticHeader={horizontalView}
        theme={{
          // calendarBackground: '#eee',
          // selectedDayBackgroundColor: '#aaa',
          // todayBackgroundColor: 'white',
          // selectedDayTextColor: 'red',
          // todayTextColor: '#000',
          // dayTextColor: '#000',
          // dotColor: '#00adf5',
          arrowColor: '#000',
          // textDisabledColor:"#00adf5",

          // disabledArrowColor: '#d9e1e8',
          // monthTextColor: '#000',
          // indicatorColor: 'blue',
          textDayFontWeight: '900',
          textMonthFontWeight: '400',
          textDayHeaderFontWeight: '500',
          textDayFontSize: moderateScale(100),
          textMonthFontSize: moderateScale(18),
          textDayHeaderFontSize: moderateScale(14),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ServiceCalendar;

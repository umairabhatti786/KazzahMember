import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text} from 'ui';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {getStatusColor} from 'utils';
import {
  Calendar,
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  WeekCalendar,
} from 'react-native-calendars';
import {Platform, Pressable, StyleSheet} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

type Props = {
  today?: any;
  UserEvent?: any;
  showPages?: boolean;
};

const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset),
  );

const INITIAL_TIME = {hour: 9, minutes: 0};

const CalanderWeekView = ({
  today = new Date(),
  UserEvent = [],
  showPages = true,
}: Props) => {
  const {colors} = useTheme();
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState({});
  const navigation = useNavigation();

  const currentData = new Date();

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
  };
  useEffect(() => {
    const dateSelected = CalendarUtils.getCalendarDateString(
      new Date().setDate(today.getDate() + 0),
    );
    setCurrentDate(dateSelected);
    let makeEventsArray = UserEvent?.map((element: any, index: any) => {
      const serviceColr = element?.services
        ?.map((item: any) => item?.service?.name)
        ?.toString();

      const txtColor = () => {
        return (
          <View height={'100%'} style={{zIndex: 100}} flexDirection={'column'}>
            <Text style={{height: '100%'}} color={'white'}>
              {`${
                element?.provider?.firstName ===
                element?.provider?.firstName?.split(' ')[0]
                  ? element?.provider?.firstName?.charAt(0).toUpperCase()
                  : element?.client?.firstName?.charAt(0).toUpperCase()
              } ${
                element?.provider?.lastName ===
                element?.provider?.lastName?.split(' ')[0]
                  ? element?.provider?.lastName?.charAt(0).toUpperCase()
                  : element?.provider?.lastName?.charAt(0).toUpperCase()
              }`}
            </Text>
          </View>
        );
      };

      return {
        id: element?.id,
        start: `${element?.appointmentDate} ${element?.startTime}`,
        end: `${element?.appointmentDate} ${element?.endTime}`,
        title: txtColor(),
        color: getStatusColor(element?.status),
      };
    });

    let makeEvent = _.groupBy(makeEventsArray, e =>
      CalendarUtils.getCalendarDateString(e?.start),
    ) as {
      [key: string]: TimelineEventProps[];
    };

    setEventsByDate(makeEvent);
  }, [UserEvent, today]);

  const onMonthChange = (month: any, updateSource: any) => {};
  const timelineProps = {
    format24h: false,
    onEventPress: (event: any) => {
      navigation.navigate('AppointmentDetail', {
        id: event?.id,
      });
    },
  };

  const styles = makeStyles(colors);
  return (
    <CalendarProvider
      style={{flex: 1}}
      numberOfDays={7}
      date={moment(currentDate).startOf('isoWeek').toString()}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      disabledOpacity={0.6}>
      <ExpandableCalendar
        firstDay={1}
        hideDayNames={false}
        theme={{textSectionTitleColor: 'black'}}
        style={{
          marginTop: scale(-40),
          zIndex: -9999,
          elevation: 0,
          shadowOpacity: 0,
        }}
        // date={currentData}
        renderHeader={() => {
          return <></>;
        }}
        renderArrow={() => {
          return (
            <View>
              <Text></Text>
            </View>
          );
        }}
        markedDates={{
          [currentDate]: {
            marked: true,
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red',
          },
        }}
        dayComponent={({date, state}) => {
          return (
            console.log(
              'currentDatecurrentDate',
              date?.dateString,
              currentDate,
            ),
            (
              <Pressable onPress={() => setCurrentDate(date?.dateString)}>
                <View
                  style={
                    date?.dateString == currentDate
                      ? styles.selectedDayWeekCal
                      : styles.unSelectedDayWeekCal
                  }>
                  <Text
                    style={[
                      date?.dateString == currentDate
                        ? textStyle.cta1
                        : textStyle.cta1,
                      {
                        color: 'black',
                        marginTop: Platform.OS === 'ios' ? scale(5) : 0,
                      },
                    ]}>
                    {date?.day}
                  </Text>
                </View>
              </Pressable>
            )
          );
        }}
      />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        scrollToFirst
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
};

export default CalanderWeekView;

const makeStyles = (colors: any) =>
  StyleSheet.create({
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
      borderRadius: moderateScale(50),
      borderColor: 'black',
      borderWidth: 1,
      height: moderateScale(28),
      width: moderateScale(28),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: moderateScale(30),
    },
    unSelectedDayWeekCal: {
      backgroundColor: '#fff',
      borderRadius: moderateScale(50),
      height: moderateScale(28),
      width: moderateScale(28),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.silverChalice,
      borderWidth: 0.5,
      marginHorizontal: moderateScale(30),
    },
    txtWeekAppoint: {
      textAlign: 'center',
      color: 'black',
      fontSize: scale(8),
    },
    selectWeekAppoint: {
      textAlign: 'center',
      color: 'black',
      fontSize: scale(8),
    },
    txtDate: {
      textAlign: 'center',
      color: 'black',
    },
    txtDateSelected: {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
    },
    displayContainer: {
      height: verticalScale(500),
    },
  });

import React, {useEffect, useState} from 'react';
import Calendar from 'react-native-big-calendar';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, theme} from 'ui';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {colors, getStatusColor} from 'utils';
import {
  CalendarProvider,
  CalendarUtils,
  TimelineEventProps,
  TimelineList,
  TimelineProps,
  WeekCalendar,
} from 'react-native-calendars';
import {Image, Platform, Pressable, StyleSheet} from 'react-native';
import _ from 'lodash';
import InitialNameLetters from 'newComponents/InitialNameLetters';

type Props = {
  today?: Date;
  UserEvent?: any;
  showPages?: boolean;
};

const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset),
  );

const INITIAL_TIME = {hour: 9, minutes: 0};

const CalanderDayView = ({
  today = new Date(),
  UserEvent = [],
  showPages = true,
}: Props) => {
  const {colors} = useTheme();
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState({});
  const navigation = useNavigation();

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
  };
  useEffect(() => {
    const dateSelected = CalendarUtils.getCalendarDateString(
      new Date().setDate(today.getDate() + 0),
    );
    setCurrentDate(dateSelected);

    let makeEventsArray = UserEvent?.map((element, index) => {
      const serviceColr = element?.services
        ?.map(item => item?.service?.name)
        ?.toString();
      const txtColor = () => {
        return (
          <View
            style={{
              padding: scale(20),
              backgroundColor: getStatusColor(element?.status),
            }}
            height={'90%'}
            flexDirection={'row'}
            borderRadius={scale(10)}
            width={scale(250)}
          >
            {element?.provider?.profileImage ? (
              <Image
                style={{
                  height: scale(30),
                  width: scale(30),
                  borderRadius: scale(8),
                }}
                source={{uri: element?.provider?.profileImage}}
              />
            ) : (
              <InitialNameLetters
                width={scale(30)}
                fontSize={scale(10)}
                height={scale(30)}
                borderRadius={scale(8)}
                firstName={`${element?.provider?.firstName}`}
                lastName={`${element?.provider?.lastName}`}
              />
            )}

            <View width={scale(10)} />
            <View flexDirection={'column'}>
              <Text
                color={'white'}
              >{`${element?.provider?.firstName} ${element?.provider?.lastName}`}</Text>
              <Text color={'white'}>{serviceColr}</Text>
            </View>
          </View>
        );
      };
      return {
        id: element?.id,
        start: `${element?.appointmentDate} ${element?.startTime}`,
        end: `${element?.appointmentDate} ${element?.endTime}`,
        title: txtColor(),
        color: 'transparent',
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
    theme: {timeLabel: {color: theme.colors.black}},
    format24h: false,
    onEventPress: event => {
      navigation.navigate('AppointmentDetail', {
        id: event?.id,
      });
    },
  } as TimelineProps;
  const customTheme = {
    // Example of custom colors
    arrowColor: 'blue',
    todayTextColor: 'green',
    dayTextColor: 'purple',
    textDayFontWeight: 'bold',
    textSectionTitleColor: 'black',
    // Add other properties as needed
  };
  const styles = makeStyles(colors);
  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      disabledOpacity={0.6}
    >
      <WeekCalendar
        theme={customTheme}
        allowShadow={false}
        date={currentDate}
        markedDates={{
          [currentDate]: {
            marked: true,
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red',
          },
        }}
        firstDay={1}
        dayComponent={({date, state}) => {
          return (
            <Pressable onPress={() => setCurrentDate(date.dateString)}>
              <View
                style={
                  date?.dateString == currentDate
                    ? styles.selectedDayWeekCal
                    : styles.unSelectedDayWeekCal
                }
              >
                <Text
                  style={[
                    date?.dateString == currentDate
                      ? textStyle.cta1
                      : textStyle.cta1,
                    {
                      color: colors.black,
                      marginTop: Platform.OS === 'ios' ? scale(5) : 0,
                    },
                  ]}
                >
                  {date?.day}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />

      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        scrollToNow
        scrollToFirst
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
};

export default CalanderDayView;

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
      height: moderateScale(32),
      width: moderateScale(32),
      justifyContent: 'center',
      alignItems: 'center',
    },
    unSelectedDayWeekCal: {
      backgroundColor: colors.background,
      borderRadius: moderateScale(50),
      height: moderateScale(32),
      width: moderateScale(32),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.silverChalice,
      borderWidth: 0.5,
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

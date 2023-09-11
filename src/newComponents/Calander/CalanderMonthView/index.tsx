import React from 'react';
import Calendar from 'react-native-big-calendar';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import moment from 'moment';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {getStatusColor} from 'utils';

type Props = {
  today?: Date;
  UserEvent?: any;
  showPages?: boolean;
};

const CalanderMonthView = ({
  today = new Date(),
  UserEvent = [],
  showPages = true,
}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const txtColor = () => {
    return (
      <View
        style={{
          padding: scale(20),
          backgroundColor: 'green',
        }}
        height={'90%'}
        flexDirection={'row'}
        borderRadius={scale(10)}
        width={scale(250)}></View>
    );
  };
  const customTheme = {
    palette: {
      // primary: {
      //   main: colors.black,
      //   contrastText: 'white',
      // },
      gray: {
        100: colors.silverChalice,
        200: 'white',
        300: colors.black,
        800: colors.black,
      },
    },
  };
  return (
    <View>
      <Calendar
        maxVisibleEventCount={2}
        // hideNowIndicator={false}
        // dayHeaderHighlightColor={{backgroundcolor: 'red'}}
        theme={customTheme}
        date={today}
        headerContainerStyle={{height: scale(30)}}
        bodyContainerStyle={{
          backgroundColor: colors.background,
        }}
        calendarCellTextStyle={[textStyle.cta2, {color: colors.black}]}
        showAllDayEventCell={true}
        step={20}
        eventCellStyle={(event: any) => {
          const backgroundColor = getStatusColor(event.is_approved);

          return {
            backgroundColor,
          };
        }}
        calendarCellStyle={{
          borderLeftColor: colors.background,
          borderRightColor: colors.background,
        }}
        mode={'month'}
        weekStartsOn={1}
        events={UserEvent}
        height={verticalScale(500)}
        onPressCell={Date => {}}
        dayHeaderHighlightColor={colors.white}
        hideNowIndicator={false}
        onPressEvent={event => {
          console.log('sdbcj', JSON.stringify(event, null, 2));
          navigation.navigate('AppointmentDetail', {
            id: event?.data?.id,
          });
        }}
      />
    </View>
  );
};

export default CalanderMonthView;

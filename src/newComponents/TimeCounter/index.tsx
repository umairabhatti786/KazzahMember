import React, {useState, useEffect} from 'react';
import {Text, View} from 'ui';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import TimeIcon from 'assets/TimeIcon.svg';
import {useSelector} from 'react-redux';
import {getAppointmentReservationTime} from 'reducers/configurationReducer';
import {useToast} from 'react-native-toast-notifications';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';
import {getAddAppointment} from 'reducers/addAppointmentReducer';

const TimeCounter = React.memo(({createdAt}: any) => {
  const timeLimitInMins = useSelector(getAppointmentReservationTime);

  const givenDatetime = new Date(createdAt);
  givenDatetime.setMinutes(givenDatetime.getMinutes() + timeLimitInMins);
  const currentDatetime = new Date();

  const differenceInSeconds = Math.floor(
    (givenDatetime - currentDatetime) / 1000,
  );

  const {colors} = useTheme();

  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    if (differenceInSeconds) {
      setSeconds(differenceInSeconds);
    }
  }, [createdAt]);

  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    let interval = null;

    console.log('🚀 ~ file: index.tsx:41 ~ useEffect ~ seconds:', seconds);
    if (differenceInSeconds) {
      if (seconds > 0) {
        interval = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
      } else {
        toast.show('Time is up!, Appointment is declined', {
          type: 'error_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('Pending');
      }
    }

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes
      .toString()
      .padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <View
        style={{
          padding: scale(10),
          flexDirection: 'row',
          height: verticalScale(45),
          borderRadius: scale(10),
          backgroundColor: colors.background,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: 3,
          },

          shadowOpacity: 0.13,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: scale(10),
          }}
        >
          <TimeIcon
            style={{
              marginRight: scale(5),
              marginBottom: scale(2),
            }}
            width={scale(18)}
            height={scale(18)}
          />

          <Text style={[textStyle.b3, {color: colors.black}]}>Book in</Text>
          <Text
            style={[
              textStyle.b4,
              {color: colors.green, marginLeft: scale(7), width: scale(35)},
            ]}
          >
            {formatTime(seconds)}
          </Text>
          <Text style={[textStyle.b4, {color: colors.black}]}>
            to secure appointment.
          </Text>
        </View>
      </View>
    </View>
  );
});

export default TimeCounter;

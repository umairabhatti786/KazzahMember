import {FlatList, StyleSheet} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import textStyle from 'theme/typoGraphy';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Card from '../../../../src/assets/Card.svg';
import moment from 'moment';
import {ConvertMinutesHours} from 'services/common';
import {
  getAddAppointment,
  getAppointmentProvider,
  getSelectedServices,
} from 'reducers/addAppointmentReducer';
import {
  convertInto12hourTime,
  dateTime,
} from 'screens/LastAppoinmentCalender/time';
import {useToast} from 'react-native-toast-notifications';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';

const ServiceDetails = ({
  appointmentDetail,
  paymentDetail,
  AddTipProp,
}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const appointment = useSelector(getAppointmentDetails);
  console.log(
    '🚀 ~ file: ServiceDetails.tsx:35 ~ appointment:',
    appointment?.createdAt,
  );

  const selectedServices = appointment?.services;
  const reservationFee = appointment?.isReservationFee;

  const totalHours = ConvertMinutesHours(
    appointment?.services?.reduce((accumulator, currentValue) => {
      return parseInt(accumulator) + parseInt(currentValue.service.duration);
    }, 0),
  );

  const totalCost = appointment?.services?.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue.service.price;
    },
    0,
  );

  return (
    <View>
      <Text
        style={[
          textStyle.cta1,
          {color: colors.black, marginTop: verticalScale(20)},
        ]}
      >
        Service details
      </Text>

      <View style={styles.detailContainer}>
        <Text style={[textStyle.b4, {color: colors.black}]}>Job</Text>

        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={[
            textStyle.b4,
            {color: colors.black, width: scale(170), textAlign: 'right'},
          ]}
        >
          {selectedServices?.map(e => e.service.name).toString()}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[textStyle.b4, {color: colors.black}]}>Date</Text>
        <Text style={[textStyle.b4, {color: colors.black}]}>
          {moment(new Date(appointment?.appointmentDate)).format(
            'MMMM DD, YYYY',
          )}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[textStyle.b4, {color: colors.black}]}>Time</Text>

        <Text style={[textStyle.b4, {color: colors.black}]}>
          {`${moment(appointment?.startTime, 'hh:mm:ss')
            .format('hh:mm a')
            .replace('m', '')} ${moment(appointment?.endTime, 'hh:mm:ss')
            .format('hh:mm a')
            .replace('m', '')}`}

          {/* {`${convertInto12hourTime(
            dateTime('1970-01-01', appointment.startTime),
          ).replace('m', '')} - ${convertInto12hourTime(
            dateTime('1970-01-01', appointment.endTime),
          ).replace('m', '')}`} */}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={[textStyle.b4, {color: colors.black}]}>Duration</Text>

        <Text style={[textStyle.b4, {color: colors.black}]}>{totalHours}</Text>
      </View>
      {!reservationFee && (
        <View style={styles.detailContainer}>
          <Text style={[textStyle.b4, {color: colors.black}]}>
            Service cost
          </Text>

          <Text style={[textStyle.b4, {color: colors.black}]}>
            {' '}
            {`$${Number(totalCost).toFixed(2)}`}
          </Text>
        </View>
      )}

      <View
        style={{
          backgroundColor: colors.silverChalice,
          height: 0.5,
          marginTop: verticalScale(20),
        }}
      />

      {paymentDetail && (
        <View>
          <Text
            style={[
              textStyle.cta1,
              {color: colors.black, marginTop: verticalScale(20)},
            ]}
          >
            Payment details
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: verticalScale(10),
            }}
          >
            <View style={{width: '90%'}}>
              <Text style={[textStyle.b4, {color: colors.black}]}>
                This pro can be paid by credit card once the service is
                completed.
              </Text>
            </View>

            <Card width={22} height={22} />
          </View>
        </View>
      )}

      {reservationFee ? (
        <View>
          <Text
            style={[
              textStyle.cta1,
              {color: colors.black, marginTop: verticalScale(20)},
            ]}
          >
            Due today
          </Text>

          <View style={styles.detailContainer}>
            <Text style={[textStyle.b4, {color: colors.black}]}>
              Reservation fee
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[textStyle.b4, {color: colors.black}]}
            >
              {`$${Number(appointment.reservationFee).toFixed(2)}`}
            </Text>
          </View>

          <View style={styles.detailContainer}>
            <Text
              style={[
                textStyle.cta1,
                {color: colors.black, marginTop: verticalScale(20)},
              ]}
            >
              Total
            </Text>

            <Text
              style={[
                textStyle.cta1,
                {color: colors.black, marginTop: verticalScale(20)},
              ]}
            >
              {`$${Number(appointment.grandTotal).toFixed(2)}`}
            </Text>
          </View>
          <Text style={[textStyle.b5, {color: colors.silverChalice}]}>
            {`You will pay a Service fee of $${Number(
              appointment.grandTotal,
            ).toFixed(2)} on ${moment(appointment?.appointmentDate).format(
              'MMMM DD, YYYY',
            )} when the service is completed.`}
          </Text>
          <View
            style={{
              backgroundColor: colors.silverChalice,
              height: 0.5,
              marginTop: verticalScale(20),
            }}
          />
        </View>
      ) : null}

      <Text
        style={[
          textStyle.cta1,
          {color: colors.black, marginVertical: verticalScale(20)},
        ]}
      >
        Location
      </Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: verticalScale(180),
          width: '100%',
          borderRadius: scale(10),
        }}
      ></MapView>
    </View>
  );
};

export default ServiceDetails;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    detailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: scale(8),
    },
  });

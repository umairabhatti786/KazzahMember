import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {Pressable, Text, View, theme} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import LocationIcon from 'assets/LocationIcon.svg';
import {useNavigation} from '@react-navigation/native';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import moment from 'moment';
import {ConvertMinutesHours} from 'services/common';
import {useDispatch} from 'react-redux';
import {setAppointmentDetails} from 'reducers/appoinmentReducer';
import {setProviderId} from 'reducers/providerReducer';

const UnpaidAppointmentCard = (props: any) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const TotalHours = ConvertMinutesHours(props.item?.totalDuration);
  console.log("itemProvider",props.item)

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      key={props.index}
      style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => {
              dispatch(setProviderId(props.item?.provider?.id));
              navigation.navigate('ConnectedProviderProStack');
            }}
            alignItems={'flex-end'}>
            {props.item?.provider?.profileImage ? (
              <Image
                source={{uri: props.item?.provider?.profileImage}}
                style={styles.image}
              />
            ) : (
              <InitialNameLetters
                firstName={`${props.item?.provider?.firstName}`}
                lastName={`${props.item?.provider?.lastName}`}
              />
            )}
          </Pressable>

          <View style={styles.categoryName}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}>
              {props?.item?.provider?.firstName}{' '}
              {props?.item?.provider?.lastName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.label,
                {
                  color: colors.silverChalice,
                  marginLeft: scale(3),
                  marginTop: scale(2),
                },
              ]}>
              {`${props.item?.provider?.service?.service?.name}`}
            </Text>
          </View>

          <Button
            onPress={() => {
              dispatch(setAppointmentDetails(props.item));
              navigation.navigate('PayReservationFess', {
                choosePayment: true,
                appointmentId: props?.item?.id,
                paymentType: 'af',
              });
            }}
            height={verticalScale(30)}
            label="Pay"
            width={'30%'}
          />
        </View>
      </View>
      <View height={verticalScale(20)} />
      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />
      <View height={verticalScale(20)} />

      <View style={{height:"62%"}}>
        <View style={styles.detailContainer}>
          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            Job
          </Text>
          <View style={{width: '60%', alignItems: 'flex-end'}}>
            <Text
              numberOfLines={1}
              style={[textStyle.b4, {color: colors.black}]}>
              {props.item?.services[0]?.service.name}
            </Text>
          </View>
        </View>
        <View height={verticalScale(10)} />
        <View style={styles.detailContainer}>
          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}>
            Date
          </Text>

          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}>
            {moment(props.item?.appointmentDate).format('dddd, MMMM Do, YYYY')}
          </Text>
        </View>
        <View height={verticalScale(10)} />

        <View style={styles.detailContainer}>
          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            Time
          </Text>

          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            {`${moment(props.item?.startTime, 'hh:mm:ss')
              .format('h:mm a')
              .replace('m', '')} - ${moment(props.item?.endTime, 'hh:mm:ss')
              .format('h:mm a')
              .replace('m', '')}`}
          </Text>
        </View>
        <View height={verticalScale(10)} />

        <View style={styles.detailContainer}>
          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            Duration
          </Text>

          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            {TotalHours}
          </Text>
        </View>
        <View height={verticalScale(10)} />

        <View style={styles.detailContainer}>
          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            Unpaid balance
          </Text>

          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            {`$${Number(
              props.item?.grandTotal - props?.item?.reservationFee,
            ).toFixed(2)}`}
          </Text>
        </View>

        <View height={verticalScale(20)} />

      
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LocationIcon
            style={{alignSelf: 'flex-start', marginRight: scale(5)}}
            width={scale(10)}
            height={scale(10)}
          />

          {props.item?.appointmentAddress ? (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.label,
                {
                  color: colors.silverChalice,
                  width: '90%',
                },
              ]}>
              {props.item?.appointmentAddress}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.label,
                {color: colors.silverChalice, width: '90%'},
              ]}>
              {`${props.item?.provider?.street} ${props.item?.provider?.city}`}
            </Text>
          )}
        </View>
    </TouchableOpacity>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    KeyboardAvoiding: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
    },
    image: {
      borderRadius: scale(8),
      height: scale(33),
      width: scale(33),
      marginRight: scale(10),
    },
    BackIcon: {
      width: scale(50),
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
    mainContainer: {
      padding: scale(20),
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(310),
      margin: scale(10),
      height: verticalScale(245),
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.13,
      shadowRadius: 10,
      elevation: 3,
    },
  });

export default UnpaidAppointmentCard;

import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import LocationIcon from 'assets/LocationIcon.svg';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import moment from 'moment';
import {getAppointmentStatusText, getStatusColor} from 'utils';
import FastImage from 'react-native-fast-image';
const ProfileImage = require('../../assets/ProfileImage.png');

const NextAppointmentsCard = ({label, index, nextAppointment}: any) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <React.Fragment>
      <View height={scale(40)} />
      <Text
        style={[textStyle.h3, {color: colors.black, paddingHorizontal: '7%'}]}
      >
        {label}
      </Text>

      <TouchableOpacity
        activeOpacity={0.6}
        key={index}
        style={styles.mainContainer}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              // backgroundColor:"red"
            }}
          >
            <Pressable
              marginRight={'m'}
              onPress={() => {}}
              alignItems={'flex-end'}
            >
              {nextAppointment?.provider?.profileImage ? (
                <FastImage
                  source={{uri: nextAppointment?.provider?.profileImage}}
                  style={styles.image}
                />
              ) : (
                <InitialNameLetters
                  firstName={`${nextAppointment?.provider?.firstName}`}
                  lastName={`${nextAppointment?.provider?.lastName}`}
                />
              )}
            </Pressable>

            <View style={styles.categoryName}>
              <Text
                numberOfLines={1}
                style={[textStyle.b3, {color: colors.black}]}
              >
                {nextAppointment?.provider?.firstName}{' '}
                {nextAppointment?.provider?.lastName}
              </Text>

              {nextAppointment?.services &&
              nextAppointment?.services?.length === 1 ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{width: 160}}
                >
                  {nextAppointment?.services?.reduce(
                    (accumulator, item, index) => {
                      return [
                        ...accumulator,
                        <Text
                          key={item.id}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={[
                            textStyle.label,
                            {
                              color: colors.silverChalice,
                              marginLeft: scale(3),
                              marginTop: scale(2),
                            },
                          ]}
                        >
                          {`${item.service?.name}`}
                        </Text>,
                      ];
                    },
                    [],
                  )}
                </Text>
              ) : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{width: 160}}
                >
                  {nextAppointment?.services?.reduce(
                    (accumulator, item, index) => {
                      return [
                        ...accumulator,
                        <Text
                          key={item.id}
                          numberOfLines={1}
                          ellipsizeMode={'tail'}
                          style={[
                            textStyle.label,
                            {
                              color: colors.silverChalice,
                              marginLeft: scale(3),
                              marginTop: scale(2),
                            },
                          ]}
                        >
                          {`${item.service?.name},`}
                        </Text>,
                      ];
                    },
                    [],
                  )}
                </Text>
              )}
            </View>
            <Text
              textTransform={'capitalize'}
              style={{
                color: getStatusColor(nextAppointment?.status),
                width: scale(62),
              }}
              fontSize={scale(10)}
              ellipsizeMode={'tail'}
              numberOfLines={1}
            >
              {getAppointmentStatusText(nextAppointment)}
            </Text>

            {/* <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.labe2,

                {
                  color: colors.yellow,
                },
              ]}>
              Pending
            </Text> */}
          </View>
        </View>
        <View height={verticalScale(16)} />

        <View
          flex={1}
          justifyContent={'center'}
          style={{
            borderTopColor: colors.gallery,
            borderTopWidth: 1,
            borderBottomColor: colors.gallery,
            borderBottomWidth: 1,
          }}
        >
          <Text style={[textStyle.h1, {color: colors.black}]}>
            {moment(nextAppointment?.appointmentDate).format('MMMM DD, YYYY')}
          </Text>
          <Text style={[textStyle.b1, {color: colors.black}]}>
            {`${moment(nextAppointment?.startTime, 'hh:mm:ss')
              .format('hh:mm a')
              .replace('m', '')} `}
          </Text>
        </View>
        <View height={verticalScale(16)} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LocationIcon
            style={{alignSelf: 'center', marginRight: scale(5)}}
            width={scale(10)}
            height={scale(10)}
          />
          {nextAppointment?.appointmentAddress ? (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.label,
                {
                  color: colors.silverChalice,
                  width: scale(180),
                },
              ]}
            >
              {nextAppointment?.appointmentAddress}
            </Text>
          ) : (
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.label,
                {color: colors.silverChalice, width: scale(180)},
              ]}
            >
              {`${nextAppointment?.provider?.street} ${nextAppointment?.provider?.city} ${nextAppointment?.provider?.state} ${nextAppointment?.provider?.zip}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </React.Fragment>
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
      backgroundColor: 'red',
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
      width: '65%',
      marginTop: verticalScale(2),
    },
    mainContainer: {
      padding: scale(20),
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(310),
      alignSelf: 'center',
      marginTop: scale(10),
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

export default NextAppointmentsCard;

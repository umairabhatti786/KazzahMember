import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, Platform, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {Pressable, Text, View, theme} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import LocationIcon from 'assets/LocationIcon.svg';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {useDispatch} from 'react-redux';
import useService from 'utils/services';

const ProsAppointmentList = ({index, item}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const {handleBookAppointment, setServicesForRebook} = useService();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      key={index}
      style={styles.mainContainer}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.provider?.profileImage ? (
            <Image
              source={{uri: item?.provider?.profileImage}}
              style={{
                borderRadius: scale(8),
                height: scale(33),
                width: scale(33),
                marginRight: scale(10),
              }}
            />
          ) : (
            <InitialNameLetters
              // index={index}
              firstName={`${item?.provider?.firstName}`}
              lastName={`${item?.provider?.lastName}`}
            />
          )}
          <View width={scale(10)} />

          <View style={styles.categoryName}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
            >
              {item?.provider?.firstName} {item?.provider?.lastName}
            </Text>
            <Text
              variant={'info'}
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: scale(3)},
              ]}
            >
              {item?.provider?.service?.service?.name}
            </Text>
          </View>

          <Button
            onPress={() => {
              handleBookAppointment(item?.provider);
              setServicesForRebook(item?.services);
            }}
            height={verticalScale(30)}
            label="Rebook"
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

      <View>
        <View style={styles.detailContainer}>
          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}
          >
            Service
          </Text>

          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}
          >
            {item?.services[0]?.service?.name}
          </Text>
        </View>
        <View height={verticalScale(10)} />

        <View style={styles.detailContainer}>
          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}
          >
            Duration
          </Text>

          <Text
            variant={'info'}
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[textStyle.b4, {color: colors.black}]}
          >
            {item?.totalDuration} minutes
          </Text>
        </View>
        <View height={verticalScale(10)} />

        <View style={styles.detailContainer}>
          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            Cost
          </Text>

          <Text numberOfLines={1} style={[textStyle.b4, {color: colors.black}]}>
            $ {item?.totalPrice}
          </Text>
        </View>
        <View height={verticalScale(20)} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LocationIcon
            style={{alignSelf: 'flex-start'}}
            width={scale(10)}
            height={scale(10)}
          />
          <Text
            numberOfLines={1}
            style={[
              textStyle.label,
              {
                color: colors.silverChalice,
                marginLeft: scale(4),
                marginTop: verticalScale(1),
              },
            ]}
          >
            {item?.provider?.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProsAppointmentList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    KeyboardAvoiding: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
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
      // paddingRight: scale(18),
      // paddingLeft: scale(30),
      padding: scale(20),
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(310),
      margin: scale(10),
      height: verticalScale(200),
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

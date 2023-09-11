import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {Pressable, Text, View} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import SelectIcon from '../../assets/SelectIcon.svg';
import {useDispatch} from 'react-redux';
import {
  getSelectedServices,
  updateSelectedServices,
} from 'reducers/addAppointmentReducer';
import {useSelector} from 'react-redux';
import {getAppointmentReserved} from 'reducers/appoinmentReducer';
import {useToast} from 'react-native-toast-notifications';

const ProServicesList = ({item}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const toast = useToast();
  const dispatch = useDispatch();
  const appointmentReserved = useSelector(getAppointmentReserved);

  const selectedServicesId = useSelector(getSelectedServices).map(
    e => e.service.id,
  );

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        if (appointmentReserved) {
          // toast.show(
          //   'If you change your service then it will discard your previous reserved appointment.',
          //   {
          //     type: 'error_custom',
          //     placement: 'bottom',
          //     duration: 4000,
          //     animationType: 'slide-in',
          //   },
          // );
          // return;
        }
        dispatch(updateSelectedServices(item));
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View
          style={{width: '14%', alignItems: 'center', marginRight: scale(5)}}
        >
          {selectedServicesId.includes(item.service.id) ? (
            <SelectIcon
              style={{marginTop: scale(-15)}}
              width={scale(70)}
              height={scale(70)}
            />
          ) : (
            <View
              style={{borderColor: colors.black, borderWidth: 2}}
              height={scale(25)}
              width={scale(25)}
              borderRadius={scale(50)}
            />
          )}
        </View>
        <View style={{flex: 1}}>
          <View style={styles.categoryContainer}>
            <Text
              numberOfLines={1}
              style={[textStyle.cta1, {color: colors.black}]}
            >
              {item.service.name}
            </Text>
            <Text
              variant={'info'}
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[textStyle.cta1, {color: colors.black}]}
            >
              {`$${item.service.price.toFixed(2)}`}
            </Text>
          </View>
          <View style={{marginTop: verticalScale(5)}}>
            <Text
              numberOfLines={3}
              style={[
                textStyle.b5,
                {color: colors.black, height: verticalScale(40)},
              ]}
            >
              {item.service.description}
            </Text>

            <Text
              numberOfLines={3}
              style={[textStyle.b5, {color: colors.silverChalice}]}
            >
              {`${item.service.duration} minutes`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProServicesList;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    mainContainer: {
      padding: scale(15),
      flexDirection: 'row',
      margin: '6%',
      alignSelf: 'center',

      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: '90%',
      height: verticalScale(100),
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.13,
      shadowRadius: 10,
      elevation: 3,
    },
    categoryContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    BookContainer: {
      backgroundColor: colors.background,
      borderColor: colors.black,
      borderWidth: 1,
      flex: 0.9,
    },
  });

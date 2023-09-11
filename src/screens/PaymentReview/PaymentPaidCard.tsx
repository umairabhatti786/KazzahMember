import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import MapIcon from '../../../src/assets/MapIcon.svg';
import AppointmentViewType from 'newComponents/AppointmentViewType';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {getStatusColor} from 'utils';
import {useSelector} from 'react-redux';
import {
  getAddAppointment,
  getAppointmentProvider,
} from 'reducers/addAppointmentReducer';
import {
  convertInto12hourTime,
  dateTime,
} from 'screens/LastAppoinmentCalender/time';
import { getAppointmentDetails } from 'reducers/appoinmentReducer';
import FastImage from 'react-native-fast-image';
const PaymentPaidCard = () => {
  const {colors} = useTheme();

  const appointment = useSelector(getAppointmentDetails);

  const provider = useSelector(getAppointmentProvider);
  

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <View style={styles.innerContainer}>
      {provider?.profilePicture ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}

          

          style={{marginRight: scale(10),marginTop:scale(10)}}
          overflow="hidden">
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{uri: provider?.profilePicture}}
          />
        </Pressable>
      ) : (
        <View style={{marginTop:scale(10)}}>
          <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          
          firstName={`${provider?.firstName}`}
          lastName={`${provider?.lastName}`}
        />

        </View>
        
      )}
      
        <Pressable
          // onPress={() => {
          //   navigation.navigate('ProviderProfile', {
          //     data: item?.provider,
          //     arrow: 'arrow',
          //   });
          // }}
          style={{
            marginTop: scale(14),
            height: scale(40),
          }}
          flex={2}
          flexDirection={'column'}
          alignItems={'flex-start'}>
          <Text
            style={[
              textStyle.b3,
              {
                width: scale(130),
                color: colors.black,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {provider?.name}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              width: scale(150),
              marginTop: verticalScale(3),
            }}>
            <Text
              style={[textStyle.b5, {color: colors.silverChalice}]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {provider?.channel}
            </Text>
          </View>
        </Pressable>

        <View
          flex={1.5}
          flexDirection={'column'}
          style={{marginTop: scale(13)}}
          alignItems={'flex-end'}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[
              textStyle.b4,
              {
                color: colors.black,
              },
            ]}>
                {
                   ` ${moment(appointment?.startTime, 'hh:mm:ss')
                    .format('hh:mm a').replace("m","")}`
                }
           
          </Text>
          <Text
            textTransform={'capitalize'}
            style={{color:colors.green}}
            fontSize={scale(10)}
            ellipsizeMode={'tail'}
            numberOfLines={1}>
            Paid
          </Text>
        </View>
      </View>

     
    </TouchableOpacity>
  );
};

export default PaymentPaidCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    marginVertical: scale(10),
    borderRadius: scale(8),
    width: '100%',
    height: scale(90),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 3,
  },
  innerContainer: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
  },
  image: {
    borderRadius: scale(8),
    height: scale(33),
    width: scale(33),
    marginRight: scale(10),
    backgroundColor: 'red',
  },
  search_image: {
    width: scale(9),
    height: scale(11),
    tintColor: 'gray',
  },
});

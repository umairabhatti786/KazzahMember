import {
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import textStyle from 'theme/typoGraphy';
import CalendarIcon from '../../../../src/assets/CalendarIcon.svg';
import BagIcon from '../../../../src/assets/BagIcon.svg';
import MessageIcon from '../../../../src/assets/MessageIcon.svg';
import EmailIcon from '../../../../src/assets/EmailIcon.svg';
import CallIcon from '../../../../src/assets/CallIcon.svg';
import {GetAppointment} from 'services/Appointments';
import {Appointment} from 'services/Types';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import moment from 'moment';

const ProDetailInfo = ({ProviderDetail,navigation}: any) => {
  const {token} = useSelector(authSelector).currentUser;


  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const dialCall = (number: any) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const sentEmail = async (email: any) => {
    const url = `mailto:${email}`;
    await Linking.openURL(url);
  };
  return (
    <View style={{alignItems: 'center'}}>
      {ProviderDetail?.profileImage ? (
        <View style={styles.imageContainer}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            source={{uri: ProviderDetail?.profileImage}}
          />
        </View>
      ) : (
        <InitialNameLetters
          width={scale(85)}
          height={scale(85)}
          fontSize={20}
          firstName={`${ProviderDetail?.firstName}`}
          lastName={`${ProviderDetail?.lastName}`}
        />
      )}

      <View
        style={{
          width: '70%',
          alignItems: 'center',
          marginTop: verticalScale(10),
        }}>
        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {ProviderDetail?.firstName}
        </Text>

        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {ProviderDetail?.lastName}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.rowContainer}>
          <CalendarIcon  style={{color:colors.silverChalice}} width={scale(15)} height={scale(15)} />

          <Text
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                marginTop: verticalScale(3),
                marginLeft: scale(3),
              },
            ]}>
              {`${ProviderDetail?.service?.service?.name}`}
            
          </Text>
        </View>
        <View width={scale(10)} />

        <BagIcon width={scale(15)} height={scale(15)} />

        <Text
          style={[
            textStyle.b5,
            {
              color: colors.silverChalice,
              marginTop: verticalScale(3),
              marginLeft: scale(3),
            },
          ]}>
          {`Member since ${moment(ProviderDetail?.createdAt).format(
            'MMMM YYYY',
          )}`}
        </Text>
      </View>

      <View
        style={{
          ...styles.rowContainer,
          width: '65%',
          height: verticalScale(60),
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: verticalScale(20),
        }}>
        <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>dialCall(ProviderDetail.mobileNo)}
         style={styles.mediaContainer}>
          <CallIcon width={22} height={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.mediaContainer}>
          <EmailIcon
          onPress={()=>sentEmail(ProviderDetail?.email)}
           width={22} height={22} />
        </TouchableOpacity>
        <TouchableOpacity 
        activeOpacity={0.6}
        onPress={()=>{
          navigation.navigate('ChatDetail', {
            userId: ProviderDetail?.id,
            userType: "provider",
          });

        }}
        style={styles.mediaContainer}>
          <MessageIcon width={22} height={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProDetailInfo;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
    imageContainer: {
      width: scale(85),
      height: scale(85),
      borderRadius: scale(10),
      overflow: 'hidden',
    },
    mainInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      justifyContent: 'center',
      marginTop: verticalScale(5),
    },
    rowContainer: {flexDirection: 'row', alignItems: 'center'},
    mediaContainer: {
      width: scale(50),
      height: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: 100,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.13,
      shadowRadius: 10,
      elevation: 3,
    },
  });

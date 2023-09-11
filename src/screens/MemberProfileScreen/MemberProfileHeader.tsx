import {StyleSheet, Image} from 'react-native';
import {View, Text} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import MapIconOutline from '../../../src/assets/MapIconOutline.svg';
import PersonIcon from '../../../src/assets/PersonIcon.svg';
import BagIcon from '../../../src/assets/BagIcon.svg';
import CalendarIcon from '../../../src/assets/CalendarIcon.svg';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import moment from 'moment';

type Props = {
  ProviderDetail: any;
};

const MemberProfileHeader = ({memberDetail}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{alignItems: 'center'}}>
      {memberDetail?.profileImage ? (
        <View style={styles.imageContainer}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            source={{uri: memberDetail?.profileImage}}
          />
        </View>
      ) : (
        <InitialNameLetters
          width={scale(85)}
          height={scale(85)}
          fontSize={30}
          firstName={`${memberDetail?.firstName}`}
          lastName={`${memberDetail?.lastName}`}
        />
      )}

      <View
        style={{
          width: '70%',
          alignItems: 'center',
          marginTop: verticalScale(15),
        }}>
        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {memberDetail?.firstName}
        </Text>

        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {memberDetail?.lastName}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.rowContainer}>
          <PersonIcon
            style={{color: colors.silverChalice}}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                marginTop: verticalScale(3),
                marginLeft: scale(3),
              },
            ]}>
            {`${memberDetail?.username}`}
          </Text>
        </View>
        <View height={scale(3)} />
        <View style={styles.rowContainer}>
          <MapIconOutline
            style={{color: colors.silverChalice}}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                marginTop: verticalScale(3),
                marginLeft: scale(3),
              },
            ]}>
            {`${memberDetail?.street ? memberDetail?.street + ', ' : ''} ${
              memberDetail?.city ? memberDetail?.city + ', ' : ''
            } ${memberDetail?.state ? memberDetail?.state + ', ' : ''} ${
              memberDetail?.zip ? memberDetail?.zip + ', ' : ''
            }`}
          </Text>
        </View>
        <View height={scale(3)} />
        <View style={styles.rowContainer}>
          <CalendarIcon
            style={{color: colors.silverChalice}}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                marginTop: verticalScale(3),
                marginLeft: scale(3),
              },
            ]}>
            {`Member since ${moment(memberDetail?.createdAt).format(
              'MMMM YYYY',
            )}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MemberProfileHeader;

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

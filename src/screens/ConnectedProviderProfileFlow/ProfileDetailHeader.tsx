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

const ProfileDetailHeader = ({ProviderDetail}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

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
          fontSize={30}
          firstName={`${ProviderDetail?.firstName}`}
          lastName={`${ProviderDetail?.lastName}`}
        />
      )}

      <View
        style={{
          width: '70%',
          alignItems: 'center',
          marginTop: verticalScale(15),
        }}
      >
        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {ProviderDetail?.firstName}
        </Text>

        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {ProviderDetail?.lastName}
        </Text>
      </View>

      <View style={styles.mainInfo}>
        <View height={scale(3)} />
        <View style={{...styles.rowContainer, alignSelf: 'center'}}>
          <MapIconOutline
            style={{color: colors.silverChalice}}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            numberOfLines={3}
            style={[
              textStyle.b5,
              {
                color: colors.silverChalice,
                marginTop: verticalScale(3),
                width: scale(150),
                marginLeft: scale(3),
              },
            ]}
          >
            {`${
              ProviderDetail?.street == null ? '' : ProviderDetail?.street
            }, ${ProviderDetail?.city == null ? '' : ProviderDetail?.city}, ${
              ProviderDetail?.state == null ? '' : ProviderDetail?.state
            }, ${ProviderDetail?.zip == null ? '' : ProviderDetail?.zip}`}

            {/* {`${ProviderDetail?.location}`} */}
          </Text>
        </View>
        <View height={scale(3)} />
        <View flexDirection={'row'}>
          <View style={styles.rowContainer}>
            <BagIcon
              style={{color: colors.silverChalice}}
              width={scale(16)}
              height={scale(16)}
            />

            <Text
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,
                  marginTop: verticalScale(3),
                  marginLeft: scale(3),
                },
              ]}
            >
              {ProviderDetail?.firstLevelService?.service?.name}
            </Text>
          </View>
          <View width={scale(15)} />
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
              ]}
            >
              {`Member since ${moment(ProviderDetail?.createdAt).format(
                'MMM YYYY',
              )}`}
            </Text>
          </View>
        </View>
        <View height={scale(15)} />
        <View flexDirection={'row'}>
          <View
            style={{
              flexDirection: 'column',
              paddingHorizontal: scale(10),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={[
                textStyle.b3,
                {
                  color: colors.black,
                  marginTop: verticalScale(3),
                  marginLeft: scale(3),
                },
              ]}
            >
              {ProviderDetail?.totalClientConnections}
            </Text>
            <Text
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,
                  marginTop: verticalScale(3),
                  marginLeft: scale(3),
                },
              ]}
            >
              {'Friend(s)'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetailHeader;

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
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
    },
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

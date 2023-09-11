import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import LocationIcon from 'assets/LocationIcon.svg';
import InitialNameLetters from 'newComponents/InitialNameLetters';
const ProfileImage = require('../../assets/ProfileImage.png');

const LastAppointmentsCard = props => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <React.Fragment>
      <View height={scale(40)} />
      <Text
        style={[textStyle.h3, {color: colors.black, paddingHorizontal: '7%'}]}>
        Last
      </Text>

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
            <Pressable onPress={() => {}} alignItems={'flex-end'}>
              {ProfileImage ? (
                <View style={styles.image}></View>
              ) : (
                <InitialNameLetters
                  firstName={`${props?.item?.firstName}`}
                  lastName={`${props?.item?.lastName}`}
                />
              )}
            </Pressable>

            <View style={styles.categoryName}>
              <Text
                numberOfLines={1}
                style={[textStyle.b3, {color: colors.black}]}>
                Amy Fisher
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
                serviceName
              </Text>
            </View>
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
          }}>
          <Text style={[textStyle.h1, {color: colors.black}]}>
            Jun 25, 2023
          </Text>
          <Text style={[textStyle.b1, {color: colors.black}]}>12:30p</Text>
        </View>
        <View height={verticalScale(16)} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LocationIcon
            style={{alignSelf: 'center', marginRight: scale(5)}}
            width={scale(10)}
            height={scale(10)}
          />

          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[
              textStyle.label,
              {color: colors.silverChalice, width: '90%'},
            ]}>
            21 First Parish Road, Scituate, MA 02066
          </Text>
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
      width: '90%',
      marginLeft: scale(10),
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

export default LastAppointmentsCard;

import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {Pressable, Text, View} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import InitialNameLetters from 'newComponents/InitialNameLetters';

const TrustedFriendsPros = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      key={props.index}
      style={styles.mainContainer}
      // onLongPress={() => props?.onCrossPress(props?.item)}
      // onPress={() => props?.onPress(props?.item)}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 0.9,
        }}>
        <View
          height={scale(45)}
          width={scale(45)}
          justifyContent={'center'}
          alignItems={'center'}>
          {props?.item?.profileImage ? (
            <Image
              style={{
                width: scale(35),
                height: scale(35),
                borderRadius: scale(50),
                marginRight: scale(10),
              }}
              source={{uri: props?.item?.profileImage}}
              resizeMode="cover"
            />
          ) : (
            <InitialNameLetters
              // index={index}
              firstName={`${props?.item?.firstName}`}
              lastName={`${props?.item?.lastName}`}
            />
          )}
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text numberOfLines={1} style={[textStyle.b3, {color: colors.black}]}>
          {props?.item?.firstName} {props?.item?.lastName}
        </Text>
        <Text
          variant={'info'}
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[
            textStyle.b5,
            {color: colors.silverChalice, marginTop: scale(3)},
          ]}>
          {props?.item?.rootService?.service?.name}
        </Text>
      </View>
      <Pressable
        height={scale(25)}
        width={scale(40)}
        borderRadius={scale(20)}
        alignItems={'center'}
        justifyContent={'center'}
        style={styles.BookContainer}>
        <Text style={[textStyle.cta2, {color: colors.black}]}>Connect</Text>
      </Pressable>
    </TouchableOpacity>
  );
};

export default TrustedFriendsPros;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      paddingRight: scale(20),
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(310),
      margin: scale(10),
      height: verticalScale(70),
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
      justifyContent: 'center',
      flex: 2.3,
      marginTop: verticalScale(5),
    },
    BookContainer: {
      backgroundColor: colors.background,
      borderColor: colors.black,
      borderWidth: 1,
      flex: 0.9,
    },
  });

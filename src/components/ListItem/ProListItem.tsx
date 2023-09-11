import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {SvgUri} from 'react-native-svg';
import {View} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import FastImage from 'react-native-fast-image';

const ProListItem = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      key={props.index}
      style={{
        flexDirection: 'column',
        borderRadius: scale(8),
        backgroundColor: colors.background,
        width: scale(105),
        margin: scale(10),
        height: verticalScale(180),
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3,
        },

        shadowOpacity: 0.13,
        shadowRadius: 10,
        elevation: 3,
      }}
      onLongPress={() => props?.onCrossPress(props?.item)}
      onPress={() => props?.onPress(props?.item)}
    >
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          numberOfLines={2}
          style={[
            textStyle.b3,
            {
              color: colors.black,
              textAlign: 'center',
              width: '80%',
            },
          ]}
        >
          {props?.item?.categoryName.charAt(0).toUpperCase() +
            props?.item?.categoryName.slice(1)}
        </Text>
      </View>
      <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
        {props?.item?.firstName ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {props?.item?.profileImage == null ? (
              <InitialNameLetters
                height={scale(50)}
                width={scale(50)}
                firstName={props?.item?.firstName}
                lastName={props?.item?.lastName}
                marginRight={0}
                borderRadius={15}
              />
            ) : (
              <FastImage
                style={{height: scale(50), width: scale(50), borderRadius: 15}}
                source={{
                  uri: props?.item?.profileImage,
                }}
              />
            )}
          </View>
        ) : (
          <View
            style={{
              height: scale(50),
              width: scale(50),
              opacity: 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgUri
              width={scale(40)}
              height={scale(40)}
              uri={props?.item?.image}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          ellipsizeMode="tail"
          numberOfLines={2}
          style={[
            textStyle.b4,
            {
              color: colors.silverChalice,
              marginTop: scale(3),
              width: '90%',
              textAlign: 'center',
            },
          ]}
        >
          {props?.item?.firstName
            ? props?.item?.firstName?.charAt(0).toUpperCase() +
              props?.item?.firstName?.slice(1)
            : '< Add Pro >'}{' '}
          {props?.item?.lastName
            ? props?.item?.lastName?.charAt(0).toUpperCase() +
              props?.item?.lastName?.slice(1)
            : ''}
        </Text>
      </View>
      <View style={{flex: 1}}></View>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      key={props.index}
      style={styles.mainContainer}
      onLongPress={() => props?.onCrossPress(props?.item)}
      onPress={() => props?.onPress(props?.item)}
    >
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
        }}
      >
        <View
          height={scale(45)}
          width={scale(45)}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <View flexDirection={'row'}>
            <View
              style={[
                {
                  backgroundColor: colors.black,
                  borderRadius: 70,
                },
              ]}
            >
              <SvgUri
                width={scale(30)}
                height={scale(30)}
                uri={props?.item?.image}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text numberOfLines={1} style={[textStyle.b3, {color: colors.black}]}>
          {props?.item?.categoryName.charAt(0).toUpperCase() +
            props?.item?.categoryName.slice(1)}
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
          {props?.item?.firstName
            ? props?.item?.firstName?.charAt(0).toUpperCase() +
              props?.item?.firstName?.slice(1)
            : '+ Add professional'}{' '}
          {props?.item?.lastName
            ? props?.item?.lastName?.charAt(0).toUpperCase() +
              props?.item?.lastName?.slice(1)
            : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProListItem;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      paddingRight: scale(18),
      paddingLeft: scale(5),
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(250),
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
      width: '80%',
      marginTop: verticalScale(5),
    },
  });

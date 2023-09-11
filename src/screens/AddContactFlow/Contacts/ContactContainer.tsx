import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {
  setIsKazzahUser,
  setMobileNumber,
  setName,
} from 'reducers/addProReducer';
import InitialNameLetters from 'newComponents/InitialNameLetters';

const ContactContainer = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={props.onPressContact}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          // justifyContent: 'space-between',
          height: verticalScale(50),
        }}>
        {props?.item?.connection?.profileImage ? (
          <Pressable
            width={scale(35)}
            height={scale(35)}
            borderRadius={10}
            style={{marginRight: scale(10)}}
            overflow="hidden">
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: props?.item?.connection?.profileImage}}
            />
          </Pressable>
        ) : (
          <InitialNameLetters
            width={scale(35)}
            height={scale(35)}
            firstName={`${props?.item?.connection?.firstName}`}
            lastName={`${props?.item?.connection?.lastName}`}
          />
        )}

        <View
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <View width={'70%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[textStyle.b3, {color: colors.black}]}>
              {props?.item?.connection?.lastName == null
                ? `${props?.item?.connection?.firstName}`
                : `${
                    props?.item?.connection?.firstName +
                    ' ' +
                    props?.item?.connection?.lastName
                  }`}
            </Text>
            {props?.item?.connection?.username ? (
              <Text
                numberOfLines={1}
                style={[textStyle.b5, {color: colors.doveGray}]}>
                {props?.item?.connection?.username}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ContactContainer;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
  });

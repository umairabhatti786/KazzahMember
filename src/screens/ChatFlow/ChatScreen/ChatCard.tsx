import React, {useEffect, useState} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import FastImage from 'react-native-fast-image';
import {firebaseService} from 'services/firebase/firebaseService';

const ChatCard = (props: any) => {
  const {colors} = useTheme();
  const [textLength, setTextLength] = useState();
  let date = firebaseService.dateFormat(props?.item?.ChatTime);
  console.log('textLengthfirstName', date);

  return (
    <Pressable
      onPress={props.onPress}
      style={{
        backgroundColor: colors.background,
        borderBottomWidth: 0.5,
        width: '100%',
        flexDirection: 'row',

        borderBottomColor: colors.silverChalice,
        paddingVertical: verticalScale(5),
        height: verticalScale(60),
      }}>
      <View flexDirection={'row'} alignItems="center" style={{width: '100%'}}>
        {props?.item?.image ? (
          <Pressable
            width={scale(35)}
            height={scale(35)}
            borderRadius={10}
            overflow="hidden">
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={props?.item?.image}
            />
          </Pressable>
        ) : (
          <InitialNameLetters
            width={scale(35)}
            height={scale(35)}
            firstName={`${props?.item?.firstName}`}
            lastName={`${props?.item?.lastName}`}
          />
        )}

        <View
          alignItems={'center'}
          justifyContent={'space-between'}
          marginLeft={'s'}
          flexDirection={'row'}>
          <View width={'73%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[textStyle.b3, {color: colors.black}]}>
              {props?.item?.lastName == null
                ? `${props?.item?.firstName}`
                : `${props?.item?.firstName + ' ' + props?.item?.lastName}`}
            </Text>

            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {props?.item?.message}
            </Text>
          </View>

          <View
            style={{
              height: '100%',
            }}>
            <View
              style={{
                width: scale(8),
                height: scale(8),
                borderRadius: 100,
                backgroundColor: colors.red,
                alignSelf: 'flex-end',
              }}></View>
            <View height={verticalScale(7)} />
            <Text
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,
                  alignSelf: 'flex-end',
                },
              ]}>
              {date == 'Today' ? props?.item?.time : date}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatCard;

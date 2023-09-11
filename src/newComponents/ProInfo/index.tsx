import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  setIsKazzahUser,
  setMobileNumber,
  setName,
} from 'reducers/addProReducer';
import {getAppointmentProvider} from 'reducers/addAppointmentReducer';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';
import moment from 'moment';
import {getDaysDifference} from 'services/common';

type Props = {
  AddTipProp: any;
};

const ProInfo = ({AddTipProp}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const provider = useSelector(getAppointmentProvider);
  const completedDate = useSelector(getAppointmentDetails)?.completedStatusTime;

  return (
    <View>
      <Text style={[textStyle.cta1, {color: colors.black}]}>Pro</Text>
      <View height={verticalScale(10)} />
      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          height={scale(60)}
          width={scale(60)}
          borderRadius={10}
          overflow="hidden"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {provider?.profilePicture ? (
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: provider?.profilePicture}}
            />
          ) : (
            <InitialNameLetters
              width={'100%'}
              height={'100%'}
              borderRadius={10}
              fontSize={20}
              firstName={`${provider?.firstName}`}
              lastName={`${provider?.lastName}`}
            />
            // <Text
            //   numberOfLines={1}
            //   style={[
            //     textStyle.cta2,
            //     {color: colors.black, fontSize: scale(20)},
            //   ]}>
            //   {provider?.name}
            // </Text>
          )}
        </View>

        <View
          marginLeft={'s'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <View width={'75%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}>
              {provider?.name}
            </Text>
            {provider?.channel ? (
              <Text
                numberOfLines={1}
                style={[textStyle.b5, {color: colors.doveGray}]}>
                {provider?.channel}
              </Text>
            ) : null}
          </View>
        </View>
      </Pressable>
      <View height={scale(15)} />
      {AddTipProp ? (
        <View
          style={{
            // alignSelf: 'center',
            width: '100%',
            height: scale(52),
            borderRadius: scale(8),
            paddingHorizontal: scale(15),
            // justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: colors.concrete,
          }}>
          <View height={'100%'} width={'91%'} justifyContent={'center'}>
            <Text
              numberOfLines={2}
              lineHeight={17}
              ellipsizeMode={'tail'}
              style={[
                textStyle.b5,
                {color: colors.black, fontStyle: 'italic'},
              ]}>
              Your prompt payment is appreciated and I look forward to
              connecting again. Thank you.”
            </Text>
          </View>
          <View
            style={{
              // flex: 1,
              marginTop: scale(10),
              alignItems: 'flex-end',
            }}>
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,
                },
              ]}>
              {getDaysDifference(completedDate) == 0
                ? 'Today'
                : `${getDaysDifference(completedDate)}d`}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ProInfo;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
  });

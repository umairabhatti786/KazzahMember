import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {useDispatch} from 'react-redux';
import {
  fetchProviderSchedule,
  getAppointmentProvider,
  setAppointmentProvider,
} from 'reducers/addAppointmentReducer';
import {useSelector} from 'react-redux';
const ProsList = (props: any) => {
  const {colors} = useTheme();

  const dispatch = useDispatch();

  const selectedProvider = useSelector(getAppointmentProvider);

  const provider = props.item?.provider;

  return (
    <Pressable
      onPress={() => {
        dispatch(fetchProviderSchedule(provider.id));
        // console.log('🚀 ~ file: index.tsx:29 ~ ProsList ~ provider:', provider);
        dispatch(
          setAppointmentProvider({
            id: provider.id,
            name: `${provider.firstName} ${provider.lastName}`,
            firstName: provider?.firstName,
            lastName: provider?.lastName,
            profilePicture: provider.thumbnailUrl,
            channel: provider.rootService,
            address: provider.address,
          }),
        );
      }}
      style={{
        borderBottomColor: colors.gallery,
        borderBottomWidth: 1,
        borderTopColor: colors.gallery,
        borderTopWidth: 1,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: verticalScale(50),
      }}>
      {provider?.profileImage ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden">
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{uri: provider?.profileImage}}
          />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${provider?.firstName}`}
          lastName={`${provider?.lastName}`}
        />
      )}

      <View
        marginLeft={'s'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}>
        <View width={'70%'} flexDirection={'column'}>
          <Text
            numberOfLines={1}
            style={[textStyle.b3, {color: colors.black}]}
            ellipsizeMode={'tail'}>
            {provider?.firstName} {provider?.lastName}
          </Text>
          {provider?.rootService ? (
            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {provider?.rootService}
            </Text>
          ) : null}
        </View>

        {provider?.id == selectedProvider?.id ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null}
      </View>
    </Pressable>
  );
};

export default ProsList;

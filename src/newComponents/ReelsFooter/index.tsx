import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setProviderId} from 'reducers/providerReducer';
import textStyle from 'theme/typoGraphy';
import {Pressable, Text, View} from 'ui';
import ReelsHeaderShadow from '../../assets/ReelsHeaderShadow.svg';
import InitialNameLetters from 'newComponents/InitialNameLetters';

interface Props {
  media: any;
  navigation: any;
}

const ReelsFooter = ({media, navigation}: Props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  return (
    <View
      style={{transform: [{rotate: '180deg'}]}}
      height={scale(220)}
      justifyContent={'flex-end'}
      paddingBottom={'5xl'}
      width={'100%'}
    >
      <ReelsHeaderShadow height={scale(178)} width={'100%'} />
      <Pressable
        onPress={() => {
          const isMember = media?.client ? true : false;
          if (isMember) {
          } else {
            // dispatch(setProviderId(media?.provider.id))
            // navigation.navigate('ConnectedProviderProStack');

            dispatch(setProviderId(media?.provider?.id));
            navigation.navigate('ConnectedProviderProStack');
          }
        }}
        justifyContent={'flex-start'}
        flexDirection={'row'}
        paddingLeft={'3xl'}
        zIndex={100}
        style={{transform: [{rotate: '180deg'}]}}
        flex={1}
      >
        {media?.client?.profile_image || media?.provider?.profile_image ? (
          <FastImage
            style={{
              borderRadius: scale(8),
              height: scale(40),
              width: scale(40),
              marginTop: scale(80),
            }}
            source={
              media?.client?.profile_image
                ? {uri: media?.client?.profile_image}
                : media?.provider?.profile_image
                ? {uri: media?.provider?.profile_image}
                : require('../../../assets/Profile.png')
            }
            resizeMode="cover"
          />
        ) : (
          <View style={{marginRight: scale(-10), marginTop: scale(80)}}>
            <InitialNameLetters
              width={scale(40)}
              height={scale(40)}
              borderRadius={10}
              firstName={`${
                media?.client?.first_name.charAt(0).toUpperCase()
                  ? media?.client?.first_name.charAt(0).toUpperCase()
                  : media?.provider?.first_name.charAt(0).toUpperCase()
              }`}
              lastName={`${
                media?.client?.last_name.charAt(0).toUpperCase()
                  ? media?.client?.last_name.charAt(0).toUpperCase()
                  : media?.provider?.last_name.charAt(0).toUpperCase()
              }`}
            />
          </View>
        )}

        <View width={scale(8)} />
        <View
          style={{marginTop: scale(84)}}
          height={60}
          flexDirection={'column'}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[
              textStyle.b2,
              {
                color: colors.background,
                width: scale(200),
              },
            ]}
          >
            {`${
              media?.client?.first_name
                ? media?.client?.first_name
                : media?.provider?.first_name
            } ${
              media?.client?.last_name
                ? media?.client?.last_name
                : media?.provider?.last_name
            }`}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={'tail'}
            style={[
              textStyle.b5,
              {
                color: colors.background,
                width: scale(200),
                marginTop: scale(2),
              },
            ]}
          >
            {media?.location
              ? media?.location
              : `${
                  media?.provider?.address
                    ? `${media.provider.address}, `
                    : media?.client?.address
                    ? `${media.client.address}, `
                    : ''
                } ${
                  media?.provider?.city
                    ? `${media.provider.city}, `
                    : media?.client?.city
                    ? `${media.client.city}, `
                    : ''
                } ${
                  media?.provider?.state
                    ? `${media.provider.state}, `
                    : media?.client?.state
                    ? `${media.client.state}, `
                    : ''
                }`}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: scale(135),
            start: scale(20),
            width: scale(280),
            flexDirection: 'row',
          }}
        >
          {(media?.tags || []).reduce((accumulator, item, index) => {
            const mediaLength = index === media?.tags.length - 1;

            return [
              <Text
                key={item.id}
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  textStyle.cta2,
                  {
                    color: colors.background,
                    marginLeft: scale(3),
                    marginTop: scale(2),
                  },
                ]}
              >
                {`@${item.service.name}`}
                {mediaLength ? '' : ','}
              </Text>,
            ];
          }, [])}
        </View>
      </Pressable>
    </View>
  );
};

export default ReelsFooter;

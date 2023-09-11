import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View} from 'ui';
import {useNavigation, useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import textStyle from 'theme/typoGraphy';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {useDispatch} from 'react-redux';
import {setProviderId} from 'reducers/providerReducer';

const MediaView = ({media, index}: any) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const navigateToFeeds = () => {
    return navigation.navigate('KazzahFeeds', {index});
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: scale(420),
          width: scale(305),
          marginHorizontal: scale(15),
          alignSelf: 'center',
          marginVertical: scale(2),
        }}
        overflow="hidden"
      >
        <View borderRadius={scale(15)} height={scale(320)} width={scale(300)}>
          <Pressable onPress={navigateToFeeds}>
            <FastImage
              style={{
                borderRadius: scale(15),
                height: '100%',
                width: '100%',
              }}
              source={{
                uri: media?.url,
              }}
              resizeMode="cover"
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            dispatch(setProviderId(media?.provider?.id));

            navigation.navigate('ConnectedProviderProStack');
          }}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flexDirection={'row'}
          paddingLeft={'3xl'}
          paddingTop={'3xl'}
          flex={1}
        >
          {media?.client?.profile_image || media?.provider?.profile_image ? (
            <FastImage
              style={{
                borderRadius: scale(8),
                height: scale(40),
                width: scale(40),
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
            <View style={{marginRight: scale(-10)}}>
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
          <View width={scale(10)} />
          <View flexDirection={'column'} style={{marginTop: verticalScale(5)}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.b3,
                {
                  color: colors.black,

                  width: scale(230),
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
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[
                textStyle.b5,
                {
                  color: colors.silverChalice,

                  width: scale(230),
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
              top: scale(70),
              start: scale(20),
              width: scale(280),
              flexDirection: 'row',
            }}
          >
            {(media?.tags || []).reduce((accumulator, item, index) => {
              const mediaLength = index === media?.tags.length - 1;

              return [
                ...accumulator,
                <Text
                  key={item.id}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[
                    textStyle.label,
                    {
                      color: colors.doveGray,
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
    </SafeAreaView>
  );
};

export default MediaView;

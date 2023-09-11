import React from 'react';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Marker} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';

type Props = {
  coords: any;
  userDetails: any;
};
const UserMarker = ({coords, userDetails}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  return (
    <View
      flexDirection={'row'}
      width={'100%'}
      style={{
        height: verticalScale(50),
      }}
    >
      <Marker
        coordinate={{
          latitude: coords?.lat,
          longitude: coords?.long,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
        }}
        title="My Location"
        identifier={'mk2'}
      >
        {userDetails?.profileImage ? (
          <Pressable
            width={scale(35)}
            height={scale(35)}
            borderRadius={10}
            style={{
              marginRight: scale(10),
            }}
            overflow="hidden"
          >
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{uri: userDetails?.profileImage}}
            />
          </Pressable>
        ) : (
          <InitialNameLetters
            width={scale(35)}
            height={scale(35)}
            firstName={`${userDetails?.firstName}`}
            lastName={`${userDetails?.lastName}`}
          />
        )}
      </Marker>
    </View>
  );
};

export default UserMarker;

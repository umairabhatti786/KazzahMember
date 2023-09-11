import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Marker} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';

type Props = {
  allProviders: any;
};
const ProMarker = ({allProviders}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    console.log('allProvidersallProvidersallProviders', allProviders);
  }, [allProviders]);

  const renderItems_marker = (item, i) => {
    return (
      <Marker
        key={item?.id}
        coordinate={{
          latitude: item?.latitude,
          longitude: item?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        title={`${item?.firstName} ${item?.lastName}`}
        identifier={item?.id.toString()}>
        <View
          style={{
            elevation: 8,
            shadowColor: colors?.black,
            shadowOpacity: 0.3,
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowRadius: 8, // <- Radius of the shadow
            backgroundColor: colors?.black,
            height: scale(15),
            width: scale(15),
            borderRadius: scale(15 / 2),
          }}></View>
      </Marker>
    );
  };

  return (
    <View
      flexDirection={'row'}
      width={'100%'}
      style={{height: verticalScale(50)}}>
      {allProviders.map(renderItems_marker)}
    </View>
  );
};

export default ProMarker;

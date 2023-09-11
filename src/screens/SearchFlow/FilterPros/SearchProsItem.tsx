import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getDistanceInMiles} from 'utils';
import {getCoords} from 'reducers/searchReducer';
import axios from 'axios';
import {setProviderId} from 'reducers/providerReducer';
const SearchProsItem = (props: any) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const userCoords = useSelector(getCoords);
  const [distance, setDistance] = useState();

  console.log('RootServicesData', distance);

  const getDistanceInMiles = async () => {
    const apiKey = 'AIzaSyDXoHO79vxypTv8xL4V10cf5kFpIYDO9Rk';

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userCoords?.lat},${userCoords?.long}&destinations=${props?.item.latitude},${props?.item?.longitude}&key=${apiKey}`,
      );
      const data = response.data;

      // Check if the API returned a valid response
      if (data.status === 'OK') {
        const distance = data?.rows[0]?.elements[0]?.distance?.text;

        setDistance(distance);
      } else {
        console.log('Error:', data.status);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getDistanceInMiles();
  }, []);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProviderProfileScreen', {
          proId: props?.item?.id,
          isNotification: false,
        });
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
      {props.item?.profileImage ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden">
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{uri: props.item?.profileImage}}
          />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${props.item?.firstName}`}
          lastName={`${props.item?.lastName}`}
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
            {props.item?.firstName} {props.item?.lastName}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {props.item?.rootService ? (
              <Text
                numberOfLines={1}
                style={[textStyle.b5, {color: colors.doveGray}]}>
                {`${props.item?.rootService?.service?.name} | `}
              </Text>
            ) : null}
            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {`${distance}les`} away
            </Text>
          </View>
        </View>

        {/* {item?.id == selectedProvider?.id ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null} */}
      </View>
    </Pressable>
  );
};

export default SearchProsItem;

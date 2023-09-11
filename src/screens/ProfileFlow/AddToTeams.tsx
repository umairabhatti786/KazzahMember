import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, Screen, Text, View} from 'ui';
import _ from 'lodash';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from '../../newComponents/Button';
import AlphabetSort from '../../assets/AlphabetSort.svg';
import AppBackHeader from 'newComponents/AppBackHeader';
import {ProviderListData} from './SettingListData';
import AddToTeamsList from './AddToTeamsList';
import textStyle from 'theme/typoGraphy';
import {useSelector} from 'react-redux';
import {categorySelector} from 'reducers/categoryReducer';
import {
  getSelectedMediaDetails,
  getUploadMediaLoading,
  uploadMedia,
} from 'reducers/updateProfileReducer';
import {useDispatch} from 'react-redux';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {
  cameraPermissionError,
  fomateDateTime,
  locationPermissionError,
  updateMedia,
} from 'services/common';
import Geocoder from 'react-native-geocoding';
import {useToast} from 'react-native-toast-notifications';
import AlphabetOrder from 'newComponents/AlphabetOrder';
Geocoder.init('AIzaSyAglXrV92BziSRF9cMUTcNMiPWw5rpp9To');

const AddToTeams = (props: any) => {
  const [location, setLocation] = useState('');

  const isEdit = props?.route?.params?.isEdit;

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState();
  const dispatch = useDispatch();
  const mediaDetails = useSelector(getSelectedMediaDetails);
  const {colors} = useTheme();
  const getCategoryFromStore = useSelector(categorySelector)?.categories;
  // const loading = useSelector(getUploadMediaLoading);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(false);
  const [teamList, setTeamList] = useState([]);

  console.log('isSelected', isSelected);

  const toast = useToast();

  useEffect(() => {
    getTeam();
    getCurrentLocation();
  }, []);

  const getTeam = () => {
    const sortedTeam = _.orderBy(
      getCategoryFromStore,
      item => item?.name?.toLowerCase(),
      ['asc'],
    );
    setTeamList(sortedTeam);
  };

  const getCurrentLocation = () => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
        if (result == 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);

              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                  let addressComponent = json.results[0]?.formatted_address;
                  setLocation(json.results[0]?.formatted_address);
                })
                .catch(error => console.log('geocode error,', error));
            },
            error => {
              console.log(
                '🚀 ~ file: index.tsx:173 ~ request ~ error:3',
                JSON.stringify(error, null, 2),
              );

              locationPermissionError();
            },
            {enableHighAccuracy: true, timeout: 1000000, maximumAge: 3600000},
          );
        } else {
          console.log(
            '🚀 ~ file: index.tsx:173 ~ request ~ error:3',
            JSON.stringify(result, null, 2),
          );
          locationPermissionError();
        }
      });
    } else {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
        if (result == 'granted') {
          Geolocation.getCurrentPosition(
            position => {
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                  let addressComponent = json.results[0]?.formatted_address;
                  setLocation(json.results[0]?.formatted_address);
                })
                .catch(error => console.log('geocode error,', error));
            },
            error => {
              locationPermissionError();
            },
            {enableHighAccuracy: false, timeout: 50000},
          );
        } else {
          locationPermissionError();
        }
      });
    }
  };
  const [activeButton, setActiveButton] = useState(false);
  const submit = () => {
    setLoading(true);
    setActiveButton(true);
    const arr = mediaDetails?.media.fileName.split('.');
    arr.reverse();
    const file = {
      uri: mediaDetails?.media.uri,
      type: mediaDetails?.media.type,
      // : `image/${arr[0]}`,
      name: mediaDetails?.media?.fileName,
    };

    let tags = {
      label: mediaDetails?.tags[0]?.label,
      value: mediaDetails?.tags[0]?.value,
    };
    const data = {
      location: location,
      latitude: latitude,
      longitude: longitude,
      tags: JSON.stringify(tags),
      caption: mediaDetails?.description,
      isPrivate: 0,
      dateTime: fomateDateTime(new Date()),
      type: mediaDetails?.media.type.includes('video') ? 'video' : 'image',
      file: file,
    };

    dispatch(uploadMedia(data))
      .unwrap()
      .then(originalPromiseResult => {
        setLoading(false);

        toast.show(
          file.type.includes('video' || 'Video')
            ? 'Movie has been added.'
            : 'Photo has been added.',
          {
            type: 'success_custom',
            placement: 'bottom',
            duration: 4000,
            animationType: 'slide-in',
          },
        );
        navigation.navigate('PhotoScreen');

        // handle result here
      })
      .catch(rejectedValueOrSerializedError => {
        setLoading(false);

        console.log(
          'rejectedValueOrSerializedError',
          rejectedValueOrSerializedError,
        );
        toast.show(rejectedValueOrSerializedError, {
          type: 'error_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        // handle error here
      });
  };

  const onSort = () => {
    setSortOrder(!sortOrder);

    const newSortOrder = !sortOrder ? 'desc' : 'asc';

    const sortedTeam = _.orderBy(teamList, item => item?.name?.toLowerCase(), [
      newSortOrder,
    ]);
    setTeamList(sortedTeam);
  };
  return (
    <Screen edges={['right', 'top', 'left']}>
      <AppBackHeader navigation={props.navigation} label="Add to Team" />
      <View height={verticalScale(10)} />
      <View style={{paddingHorizontal: '6%'}}>
        <Pressable onPress={() => {}}>
          <AlphabetOrder onPress={onSort} sortOrder={sortOrder} />
        </Pressable>

        <FlatList
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: Platform.OS == 'ios' ? '55%' : '59%',
            marginBottom: 10,
          }}
          data={teamList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <AddToTeamsList
                isEdit={isEdit}
                item={item}
                index={index}
                isSelected={isSelected}
                setSelection={setSelection}
              />
            );
          }}
        />

        {!isEdit && (
          <View>
            <Button
              loading={loading}
              disabled={isSelected ? false : true}
              label="Add to team"
              width={'100%'}
              onPress={() => {
                submit();
              }}
            />

            <View height={scale(16)} />

            <TouchableOpacity
              disabled={isSelected ? false : true}
              style={{marginBottom: verticalScale(20)}}
              onPress={() =>
                navigation.navigate('AddDescription', {
                  locationData: {
                    location: location,
                    latitude: latitude,
                    longitude: longitude,
                  },
                })
              }
            >
              <Text
                style={[
                  textStyle.h3,
                  {
                    color: isSelected ? colors.black : colors.silverChalice,
                    textAlign: 'center',
                  },
                ]}
              >
                Add description (optional)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  proBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});

export default AddToTeams;

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, Dimensions, Platform, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';

import {useNavigation, useTheme} from '@react-navigation/native';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import MapFilter from './MapFilter';
import {
  getAllFriendsProviders,
  getAllProviders,
  getBottomSheetState,
  getCoords,
  getMyProviders,
  getSearchProvidersList,
  getSearchText,
  setBottomSheetActive,
  setSearchText,
} from 'reducers/searchReducer';
import {authSelector} from 'reducers/authReducer';
import {
  getZoomLevelAndCoords,
  loadCorrds,
  locationPermissionError,
} from 'services/common';
import UserMarker from './UserMarker';
import {getSearchedProviders} from 'reducers/providerReducer';
import ProviderProfileScreen from 'screens/ProviderProfileScreen';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import BackArrow from '../../../assets/BackArrow.svg';

const {height, width} = Dimensions.get('screen');

export const MapSearch = (props: any) => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [providers, setProviders] = useState([]);
  const [locationPermission, setLocationPermission] = useState(false);

  const [selectedPro, setSelectedPro] = useState<any>();

  const authState = useSelector(authSelector);

  const [activeFilter, setActiveFilter] = useState(1);

  const allProviders = useSelector(getAllProviders);
  const friendsProviders = useSelector(getAllFriendsProviders);
  const myProviders = useSelector(getMyProviders);

  const userCoords = useSelector(getCoords);

  const searchProviderList = useSelector(getSearchProvidersList);

  const {colors} = useTheme();

  const searchText = useSelector(getSearchText);
  const bottomSheetActive = useSelector(getBottomSheetState);

  useEffect(() => {
    if (searchText.length == 0) {
      if (activeFilter == 2) {
        setProviders(friendsProviders);
      } else if (activeFilter == 0) {
        setProviders(myProviders);
      } else {
        setProviders(allProviders);
      }
    } else {
      setProviders([]);
    }
  }, [activeFilter, searchText]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result == 'granted') {
        setLocationPermission(true);
        loadCorrds();
      } else {
        setLocationPermission(false);

        locationPermissionError();
      }
    });
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

  const markersList = searchText.length == 0 ? providers : searchProviderList;
  return (
    <View style={[StyleSheet.absoluteFill]}>
      <View
        position={'absolute'}
        width={'100%'}
        alignItems={'center'}
        style={{
          top: Platform.OS == 'ios' ? '15%' : '15%',
          paddingHorizontal: '6%',
          zIndex: 1,
        }}
      >
        {searchText.length == 0 && !bottomSheetActive ? (
          <MapFilter
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        ) : null}
      </View>

      <View style={styles.container}>
        <MapView
          zoomControlEnabled
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{
            height: '125%',
          }}
          scrollEnabled={true}
          showsBuildings={false}
          // showsMyLocationButton
          // showsUserLocation
          initialRegion={
            userCoords.lat && userCoords.long
              ? getZoomLevelAndCoords(10, userCoords.lat, userCoords.long)
              : undefined
          }
          region={
            userCoords.lat && userCoords.long
              ? getZoomLevelAndCoords(10, userCoords.lat, userCoords.long)
              : undefined
          }
          mapPadding={
            Platform.OS === 'ios'
              ? {
                  top: 0,
                  right: 0,
                  bottom: verticalScale(160),
                  left: 0,
                }
              : {
                  top: verticalScale(70),
                  right: 0,
                  bottom: 0,
                  left: 0,
                }
          }
        >
          {userCoords.lat && userCoords.long ? (
            <UserMarker
              userDetails={authState.currentUser}
              coords={userCoords}
            />
          ) : null}
          {locationPermission &&
            markersList?.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(item?.latitude),
                    longitude: parseFloat(item?.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={() => {
                    setSelectedPro(item);
                    handlePresentModalPress();
                    // navigation.navigate('ProviderProfileScreen', {
                    //   proId: item?.id,
                    //   isNotification: false,
                    // });
                  }}
                  // title={`${item?.firstName} ${item?.lastName}`}
                  identifier={item?.id.toString()}
                >
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
                      borderWidth: 1,
                      borderColor: colors?.black,
                    }}
                  ></View>
                </Marker>
              );
            })}
        </MapView>
      </View>
      <BottomSheetModalProvider>
        <View style={{marginTop: verticalScale(100)}}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            onChange={state => {
              if (state == -1) {
                dispatch(setBottomSheetActive(false));
              } else {
                dispatch(setBottomSheetActive(true));
              }
            }}
            snapPoints={snapPoints}
          >
            <>
              <TouchableOpacity
                style={{
                  padding: '6%',
                  marginTop:
                    Platform.OS == 'ios' && bottomSheetActive ? '7%' : 0,
                }}
                onPress={() => {
                  bottomSheetModalRef.current?.close();
                }}
              >
                <BackArrow
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: scale(10),
                    color: colors.black,
                  }}
                  width={scale(20)}
                  height={scale(15)}
                />
              </TouchableOpacity>
              <BottomSheetScrollView>
                <ProviderProfileScreen
                  isMap={true}
                  bottomSheetModalRef={bottomSheetModalRef}
                  route={{
                    params: {
                      proId: selectedPro?.id,
                      isNotification: false,
                    },
                  }}
                />
              </BottomSheetScrollView>
            </>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    width: width,
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

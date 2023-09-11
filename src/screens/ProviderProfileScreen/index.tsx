import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import AppointmentService from 'newComponents/AppointmentService';
import ProDetailInfo from 'screens/AddAppoinmentFlow/AppointmentDetail/ProDetailInfo';
import ProviderProfileHeader from './ProviderProfileHeader';
import textStyle from 'theme/typoGraphy';
import {ProviderServices} from 'newComponents/ProviderServices';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Button from 'newComponents/Button';
import {useDispatch} from 'react-redux';
import {
  fetchNoConnectionProviderProfile,
  fetchProviderProfile,
  getProviderProfile,
} from 'reducers/providerReducer';
import {getZoomLevelAndCoords} from 'services/common';
import {ActivityIndicator} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {getSelectContact, setSelectedContact} from 'reducers/contactReducer';

const ProviderProfileScreen = ({route, ...props}: any) => {
  const navigation = useNavigation();
  const isNotification = route.params?.isNotification;
  const providerId = route.params?.proId;

  const selectedcontact = useSelector(getSelectContact);

  const [providerProfile, setproviderProfile] = useState();
  const [isConnection, setIsConnection] = useState(false);

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProviderProfile(providerId))
      .unwrap()
      .then((originalPromiseResult: any) => {
        setproviderProfile(originalPromiseResult?.provider1);
      })
      .catch((rejectedValueOrSerializedError: any) => {
        dispatch(fetchNoConnectionProviderProfile(providerId))
          .unwrap()
          .then((originalPromiseResult: any) => {
            setIsConnection(true);

            setproviderProfile(originalPromiseResult);
          })
          .catch((rejectedValueOrSerializedError: any) => {
            setIsConnection(false);
          });
      });
  }, [providerId]);

  const submit = () => {
    console.log(
      'providerProfileproviderProfileproviderProfile',
      providerProfile,
    );

    const contactDetails = {
      ...selectedcontact,
      mobileNo: `+${providerProfile?.mobileNo}`,
      client_team_id: '',
      fullNumber: `+${providerProfile?.mobileNo}`,
      image: '',
      latitude: '',
      longitude: '',
      firstName: providerProfile?.firstName,
      lastName: providerProfile?.lastName,
    };

    dispatch(setSelectedContact(contactDetails));
    navigation.navigate('AddContactTeam', {
      addPro: true,
      mobileNo: `+${providerProfile?.mobileNo}`,
    });
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        {!props.isMap && <BackButtonHeader showPages={false} />}
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '6%'}}>
          {providerProfile ? (
            <ScrollView
              scrollEnabled={true}
              // style={{marginBottom: props.isMap ? 200 : 0}}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  paddingBottom: scale(100),
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
              >
                <View height={verticalScale(30)} />
                <ProviderProfileHeader
                  isConnection={isConnection}
                  isFromSearch={true}
                  navigation={navigation}
                  ProviderDetail={providerProfile}
                />

                <View height={verticalScale(50)} />
                <Text
                  style={[
                    textStyle.cta1,
                    {
                      color: colors.black,
                    },
                  ]}
                >
                  About
                </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    textStyle.b3,
                    {
                      color: colors.black,
                      marginTop: verticalScale(10),
                    },
                  ]}
                >
                  {providerProfile?.bio}
                  {/* {providerProfile} */}
                </Text>

                <View height={verticalScale(30)} />
                <Text
                  style={[
                    textStyle.cta1,
                    {
                      color: colors.black,
                      marginBottom: verticalScale(10),
                    },
                  ]}
                >
                  Services
                </Text>
                <View style={{height: verticalScale(120)}}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    // scrollEnabled={false}
                    horizontal
                    data={providerProfile?.secondLevelService}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      return <ProviderServices item={item} />;
                    }}
                  />
                </View>

                <Text
                  style={[
                    textStyle.cta1,
                    {
                      color: colors.black,
                      marginBottom: verticalScale(10),
                    },
                  ]}
                >
                  Address
                </Text>

                <MapView
                  region={
                    providerProfile.latitude && providerProfile.longitude
                      ? getZoomLevelAndCoords(
                          10,
                          parseFloat(providerProfile?.latitude),
                          parseFloat(providerProfile?.longitude),
                        )
                      : undefined
                  }
                  provider={PROVIDER_GOOGLE}
                  style={{
                    height: verticalScale(180),
                    width: '100%',
                    borderRadius: scale(10),
                  }}
                >
                  {providerProfile.latitude && providerProfile.longitude ? (
                    <Marker
                      key={providerProfile?.id}
                      coordinate={{
                        latitude: parseFloat(providerProfile?.latitude),
                        longitude: parseFloat(providerProfile?.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      // title={`${item?.firstName} ${item?.lastName}`}
                      identifier={providerProfile?.id.toString()}
                    ></Marker>
                  ) : null}
                </MapView>
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                alignSelf: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator color={colors?.black} />
            </View>
          )}
        </View>
      </View>
      {isNotification ? (
        <View style={styles.buttonsContainer}>
          <Button width={'45%'} label="Accept" />
          <Button width={'45%'} label="Decline" />
        </View>
      ) : (
        isConnection && (
          <View style={[styles.buttonsContainer, {justifyContent: 'center'}]}>
            <Button onPress={() => submit()} label="Connect with Pro" />
          </View>
        )
      )}
    </Screen>
  );
};

export default ProviderProfileScreen;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: verticalScale(40),
      paddingHorizontal: '6%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      left: 0,
    },
  });

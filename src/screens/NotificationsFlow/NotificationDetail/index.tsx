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
import Generator from '../../../assets/Generator.svg';
import Home from '../../../assets/Home.svg';
import HVAC from '../../../assets/HVAC.svg';
import ProviderProfileHeader from 'screens/ProviderProfileScreen/ProviderProfileHeader';

const NotificationDetail = ({route, ...props}: any) => {
  const navigation = useNavigation();

  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const providerProfile = {
    firstName: 'Phil',
    lastName: 'Zappone',
    createdAt: '2023-02-03T15:52:00.000000Z',
    rootService: 'HVAC',
  };

  const secondLevelService = [
    {
      service: {
        name: 'HVAC',
      },
    },
    {
      service: {
        name: 'Home Im...',
      },
    },
    {
      service: {
        name: 'Generator',
      },
    },
  ];

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        {<BackButtonHeader showPages={false} />}
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '6%'}}>
          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingBottom: scale(100),
                backgroundColor: 'transparent',
                width: '100%',
              }}
            >
              <View height={verticalScale(30)} />
              <ProviderProfileHeader
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
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore ...
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
                  data={secondLevelService}
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
                provider={PROVIDER_GOOGLE}
                style={{
                  height: verticalScale(180),
                  width: '100%',
                  borderRadius: scale(10),
                }}
              ></MapView>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button width={'45%'} label="Accept" />
        <Button width={'45%'} label="Decline" />
      </View>
    </Screen>
  );
};

export default NotificationDetail;

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

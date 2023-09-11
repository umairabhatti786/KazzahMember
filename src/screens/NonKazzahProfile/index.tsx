import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Button from 'newComponents/Button';
import ProviderProfileHeader from 'screens/ProviderProfileScreen/ProviderProfileHeader';
import textStyle from 'theme/typoGraphy';
import NonKazzahHeader from './NonKazzahHeader';

const NonKazzahProfile = ({navigation, route}: any) => {
  const {token} = useSelector(authSelector).currentUser;
  const ProDetail = route.params?.data;
  const [ProviderDetail, setProviderDetail] = useState({});

  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const appointmetDetails = {
    profileImage: '',
    firstName: 'Phil',
    lastName: 'Zappone',
    service: 'Attorney',
    createdAt: '2014-06-26 04:07:31',
  };
  const providerServices = [
    {id: 1, serviceName: 'Home'},
    {id: 2, serviceName: 'HVAC'},
    {id: 3, serviceName: 'Generator'},
  ];

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <View
          style={{
            flex: 1,
          }}>
          <BackButtonHeader showPages={false} />
          <View height={verticalScale(10)} />
          <View style={{paddingHorizontal: '6%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: scale(100),
                  backgroundColor: 'transparent',
                  width: '100%',
                }}>
                <View height={verticalScale(30)} />
                <NonKazzahHeader
                  navigation={navigation}
                  ProviderDetail={ProDetail}
                />

                <View height={verticalScale(50)} />
                <Text
                  style={[
                    textStyle.cta1,
                    {
                      color: colors.black,
                    },
                  ]}>
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
                  ]}>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore
                </Text>
              

                <Text
                  style={[
                    textStyle.cta1,
                    {
                      color: colors.black,
                      marginBottom: verticalScale(10),
                    },
                  ]}>
                  Address
                </Text>

                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{
                    height: verticalScale(180),
                    width: '100%',
                    borderRadius: scale(10),
                  }}></MapView>
              </View>
            </ScrollView>
          </View>
        </View>
       
      </Screen>
    </>
  );
};

export default NonKazzahProfile;

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

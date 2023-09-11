import {FlatList, Linking, Platform, ScrollView} from 'react-native';
import {Screen, View, Text} from 'ui';
import React, {useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import ProfileDetailHeader from './ProfileDetailHeader';
import textStyle from 'theme/typoGraphy';
import ConnectionType from '../MemberProfileScreen/ConnectionType';
import {ProviderServices} from 'newComponents/ProviderServices';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import {
  fetchNoConnectionProviderProfile,
  fetchProviderProfile,
  getProviderId,
  getProviderProfile,
  getProviderProfileLoading,
  setProviderFav,
} from 'reducers/providerReducer';
import {ActivityIndicator} from 'react-native-paper';

const ProfileDetail = () => {
  const {colors} = useTheme();
  const providerId = useSelector(getProviderId);
  const isLoading = useSelector(getProviderProfileLoading);

  const provider = useSelector(getProviderProfile);
  const providerFav = useSelector(getProviderProfile)?.providerFav == 1;
  console.log('providerMedai', provider);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProviderProfile(providerId));
  // }, []);

  useEffect(() => {
    dispatch(fetchProviderProfile(providerId))
      .unwrap()
      .then((originalPromiseResult: any) => {
        console.log('originalPromiseResult1', originalPromiseResult);

        // setproviderProfile(originalPromiseResult?.provider1);
      })
      .catch((rejectedValueOrSerializedError: any) => {
        dispatch(fetchNoConnectionProviderProfile(providerId))
          .unwrap()
          .then((originalPromiseResult: any) => {
            console.log('originalPromiseResult', originalPromiseResult?.media);

            // setproviderProfile(originalPromiseResult);
          })
          .catch((rejectedValueOrSerializedError: any) => {});
      });

    dispatch(setProviderFav(providerFav));
  }, [providerId]);
  const appointmetDetails = {
    profileImage: '',
    firstName: 'Phil',
    username: 'ccarnell',
    lastName: 'Zappone',
    service: 'Attorney',
    createdAt: '2014-06-26 04:07:31',
    location: '21 First Parish Road, Scituate, MA',
  };
  const providerServices = [
    {id: 1, serviceName: 'Home'},
    {id: 2, serviceName: 'HVAC'},
    {id: 3, serviceName: 'Generator'},
  ];

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${provider?.mobileNo}`;
    } else {
      phoneNumber = `telprompt:${provider?.mobileNo}`;
    }
    Linking.openURL(phoneNumber);
  };

  const sentEmail = async (email: any) => {
    const url = `mailto:${email}`;
    await Linking.openURL(url);
  };

  return (
    <Screen edges={['right', 'left']}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color="black" />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{paddingHorizontal: '6%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: scale(100),
                  backgroundColor: 'transparent',
                  width: '100%',
                }}
              >
                <View height={verticalScale(30)} />
                <ProfileDetailHeader ProviderDetail={provider} />
                <View width={'100%'} alignItems={'center'}>
                  <ConnectionType dialCall={dialCall} sentEmail={sentEmail} />
                </View>
                <View height={verticalScale(10)} />
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
                  {provider?.bio}
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
                    horizontal
                    data={provider?.secondLevelService}
                    keyExtractor={index => index.toString()}
                    renderItem={({item, index}) => {
                      return <ProviderServices item={item} />;
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Screen>
  );
};

export default ProfileDetail;

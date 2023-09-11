import {Alert, Linking, Platform, ScrollView} from 'react-native';
import {Screen, View, Text} from 'ui';
import React, {useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import MemberProfileHeader from './MemberProfileHeader';
import textStyle from 'theme/typoGraphy';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import TrustedProsList from './TrustedPros';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchMemberProfile,
  getMemberId,
  getMemberProfile,
  getMemberProfileLoading,
} from 'reducers/memberReducer';
import {useToast} from 'react-native-toast-notifications';
import {disConnectProvider} from 'reducers/providerReducer';
import CommunicationType from 'newComponents/CommunicationType';
import {ActivityIndicator} from 'react-native-paper';

const MemberProfileScreen = props => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const toast = useToast();

  const memberId = useSelector(getMemberId);
  const memberDetail = useSelector(getMemberProfile);
  const isLoading = useSelector(getMemberProfileLoading);
  const id = props?.route?.params?.data?.id;

  console.log('memberDetail', memberDetail);

  useEffect(() => {
    // dispatch(fetchMemberProfile(id))

    dispatch(fetchMemberProfile(id));
  }, []);

  const recentAppointments = [
    {
      name: 'Sonia Fraga',
      categoryName: 'Investment Planner',
      img: require('../../../assets/AddNewTeamCategoryUser/Profile.png'),
      Service: 'Bookkeeping',
      Duration: '3 hours',
      Cost: '$150.00',
      location: '21 First Parish Road, Scituate, MA',
    },
    {
      name: 'Sonia Fraga',
      categoryName: 'Investment Planner',
      img: require('../../../assets/AddNewTeamCategoryUser/Profile.png'),
      Service: 'Bookkeeping',
      Duration: '3 hours',
      Cost: '$150.00',
      location: '21 First Parish Road, Scituate, MA',
    },
  ];

  const handleTrash = async () => {
    Alert.alert('Remove Connection', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          dispatch(disConnectProvider({id, disconnectWtih: 'member'}))
            .unwrap()
            .then(originalPromiseResult => {
              console.log('originalPromiseResult', originalPromiseResult);
              toast.show('This member is deleted!', {
                type: 'success_custom',
                placement: 'bottom',
                duration: 4000,
                animationType: 'slide-in',
              });
              props.navigation.goBack();

              // handle result here
            })
            .catch(rejectedValueOrSerializedError => {
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
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Screen edges={['right', 'top', 'left']}>
          <View
            style={{
              flex: 1,
            }}
          >
            <BackButtonHeader
              onDelete={handleTrash}
              showDelete={true}
              showPages={false}
            />
            <View height={verticalScale(10)} />
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
                  <MemberProfileHeader memberDetail={memberDetail} />
                  <View width={'100%'} alignItems={'center'}>
                    <CommunicationType
                      email={memberDetail?.email}
                      number={memberDetail?.mobileNo}
                      navigateData={memberDetail}
                    />
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
                    {`${memberDetail?.bio ? memberDetail?.bio : ''}`}
                  </Text>
                  <View height={verticalScale(30)} />
                  <Text
                    style={[
                      textStyle.cta1,
                      {
                        color: colors.black,
                      },
                    ]}
                  >
                    Pros you trust
                  </Text>
                  <View height={scale(270)}>
                    <HorizontalFlatList
                      numRows={2}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={recentAppointments}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                        return <TrustedProsList item={item} />;
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Screen>
      )}
    </>
  );
};

export default MemberProfileScreen;

import React, {useState, useEffect, useRef} from 'react';
import {Screen, Text, Pressable, View, theme} from 'ui';
import {ScrollView, Alert, Image, FlatList, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  getProCategories,
  ProItem,
  setProCategory,
} from 'reducers/categoryReducer';
import {useSelector, useDispatch} from 'react-redux';
import {AddProForm} from './AddProForm';
import {authSelector, getFeeds} from 'reducers/authReducer';
import {GetTeam} from 'services/AddPro';
import {getAppointmentsAll, loadRootServices} from 'services/common';
import Button from 'newComponents/Button';
import NavigateArrowIcon from '../../assets/NavigateArrowIcon.svg';
import SimpleToast from 'react-native-simple-toast';
import {DeleteTeamMember} from 'services/Connections';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import MediaView from 'screens/Home/MediaView';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import {useTheme} from '@react-navigation/native';
import BackIcon from 'assets/BackIcon.svg';
import textStyle from 'theme/typoGraphy';
import {Title} from 'newComponents/TextComponents';
import ProsAppointmentList from './ProsAppointmentList';
import InnerScreenHeader from 'newComponents/InnerScreenHeader';
import Style from './Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TrustedFriendsPros from 'newComponents/TrustedFriendsPros';
import services from 'services';
import {
  getAddPro,
  setSelectedServiceId,
  setServiceId,
} from 'reducers/addProReducer';
import {setProviderId} from 'reducers/providerReducer';
import ProListItem from 'components/ListItem/ProListItem';
import {getAllFriendsProviders} from 'reducers/searchReducer';
import {getRecentAppointments} from 'reducers/appoinmentReducer';

const EmptyTag = () => {
  return (
    <View
      style={{
        flex: 1,
        height: scale(120),
        margin: 10,
      }}
    ></View>
  );
};

export const TeamDetails = props => {
  const [isModalVisible2, setModalVisible2] = useState(false);
  const {colors} = useTheme();
  const allProFriends = useSelector(getAllFriendsProviders);

  const addProState = useSelector(getAddPro);

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
  ];

  const navigation = useNavigation();

  const feeds = useSelector(getFeeds);

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const dispatch = useDispatch();

  const {token} = useSelector(authSelector).currentUser;
  const proCategories = useSelector(getProCategories);
  const recentAppointment = useSelector(getRecentAppointments);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data, numOfColumns) => {
    const totalRows = Math.floor(data?.length / numOfColumns);

    let array = [...data];

    let totalLastRow = data?.length - totalRows * numOfColumns;
    while (totalLastRow !== 0 && totalLastRow !== numOfColumns) {
      array.push({key: 'blank', empty: true});
      totalLastRow++;
    }
    return array;
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getPros();
    });

    return unsubscribe;
  }, []);

  const getPros = async () => {
    try {
      const res = await services.getTeamMembers(props.route.params.data.id);
      const {success} = res.data;

      let list = [];
      res.data.data.forEach(element => {
        // if (element.providerId != null && element.serviceId != null) {

        let itemToAdd = {
          address: element.providerId?.address,
          firstName: element.providerId?.first_name,
          lastName: element.providerId?.last_name,
          phone: element.providerId?.full_number,
          image: element.serviceId?.icon,
          createdAt: element.providerId?.created_at,
          categoryName: element.serviceId.name,
          userType: element.providerId?.user_type,
          categoryId: element.serviceId.id,
          id: element.providerId?.id,
          proServiceId: element.rootServiceId.id,
          profileImage: element.providerId?.profile_image,
        };
        list.push(itemToAdd);
        // }
      });

      const newList = [...list];

      list = list.filter((item: any) => {
        const foundProd = newList.some((item2: any) => {
          return item2.categoryId === item.categoryId && item2.id
            ? true
            : false;
        });
        return foundProd ? (foundProd && item.id ? true : false) : true;
      });

      list.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      let newCategories = [...list];
      dispatch(setProCategory(newCategories));
      setIsLoading(true);
    } catch (error) {
      console.log(
        '🚀 ~ file: index.tsx:357 ~ getPros ~ error:',
        JSON.stringify(error, null, 2),
      );
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deletePro = (item: any) => {
    Alert.alert(
      'Confirm if you want to remove',
      `${item.firstName} ${item.lastName} from ${props.route.params.data.name} team`,
      [
        {
          text: 'Yes',
          onPress: async () => {
            const res = await DeleteTeamMember(item.categoryId, item.id);

            if (res.data.success) {
              SimpleToast.show('This provider is deleted!');
              getPros();

              loadRootServices();
            }
          },
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
    );
  };

  const onPressProItem = (item: any) => {
    if (!item?.id) {
      dispatch(setServiceId(item?.categoryId));
      dispatch(setSelectedServiceId(item?.categoryId));

      onAddPros();
    } else {
      dispatch(setProviderId(item?.id));

      // ConnectedProviderProStack

      if (item.userType == 'non_kazzah') {
        props.navigation.navigate('NonKazzahProfile', {
          data: item,
        });
      } else {
        props.navigation.navigate('ConnectedProviderProStack', {
          data: item,
        });
      }

      // props.navigation.navigate('ProviderProfile', {
      //   data: item,
      //   channelData,
      // });
    }
  };

  const onAddPros = () => {
    props.navigation.navigate('AddProType');
  };

  return (
    <>
      {isLoading && (
        <Screen backgroundColor={'white'} edges={['right', 'top', 'left']}>
          <View
            style={{backgroundColor: colors.background}}
            flexDirection={'row'}
            alignItems="center"
            height={verticalScale(50)}
            paddingHorizontal={'xxl'}
          >
            <Pressable
              width={scale(35)}
              height={scale(35)}
              onPress={() => props.navigation.goBack()}
            >
              <BackIcon width={scale(20)} height={scale(15)} />
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // extraHeight={200}
            // extraScrollHeight={200}
            style={{
              marginBottom: verticalScale(60),
            }}
            contentContainerStyle={{
              flexDirection: 'column',
              // height: scale(1260),
              width: '100%',
              backgroundColor: colors.background,
            }}
          >
            <Text
              style={[
                textStyle.h1,
                {color: colors.black, marginHorizontal: '6%'},
              ]}
            >
              {props?.route?.params?.data?.name}
            </Text>
            <View height={verticalScale(20)} />
            <InnerScreenHeader
              onPressLeftHeading={() =>
                props.navigation.navigate('AllServices')
              }
              headingLabelRight="Pros"
              headingLabelLeft="See all"
            />

            <View height={scale(220)} paddingLeft={'s'}>
              <HorizontalFlatList
                numRows={1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={formatData(proCategories, 3)}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  if (item?.empty === true) {
                    return <View />;
                  }
                  return (
                    <ProListItem
                      onCrossPress={() => {
                        if (item?.name === 'Add' || !item?.firstName) {
                        } else {
                          deletePro(item);
                        }
                      }}
                      item={item}
                      onPress={onPressProItem}
                    />
                  );
                }}
              />
            </View>

            {recentAppointment.length > 0 && (
              <>
                <Text
                  style={[
                    textStyle.h3,
                    {color: colors.black, marginHorizontal: '6%'},
                  ]}
                >
                  Recent appointments
                </Text>
                <View height={verticalScale(5)} />

                <View height={scale(270)} paddingLeft={'s'}>
                  <HorizontalFlatList
                    numRows={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={recentAppointment}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      return <ProsAppointmentList item={item} />;
                    }}
                  />
                </View>
              </>
            )}
            {allProFriends.length > 0 && (
              <>
                <Text
                  style={[
                    textStyle.h3,
                    {color: colors.black, marginHorizontal: '6%'},
                  ]}
                >
                  Pros your friends trust
                </Text>
                <View height={scale(120)} paddingLeft={'s'}>
                  <FlatList
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={allProFriends}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                      if (item?.empty === true) {
                        return <View />;
                      }
                      return <TrustedFriendsPros item={item} />;
                    }}
                  />
                </View>
              </>
            )}

            {feeds.length > 0 && (
              <>
                <View>
                  <InnerScreenHeader
                    onPressLeftHeading={() =>
                      props.navigation.navigate('KazzahFeeds')
                    }
                    headingLabelRight="What’s happening"
                    headingLabelLeft="See more"
                  />
                </View>
                <View
                  marginHorizontal={'s'}
                  style={{
                    height: scale(420),
                    // paddingLeft: scale(20),
                  }}
                  flexDirection="column"
                >
                  <View style={{flex: 1}}>
                    <SwiperFlatList
                      nestedScrollEnabled={true}
                      vertical={false}
                      horizontal={true}
                      data={feeds}
                      renderItem={({item, index}) => {
                        return <MediaView index={index} media={item} />;
                      }}
                    />
                  </View>
                </View>
              </>
            )}
            {/* <AddProForm
              isModalVisible={isModalVisible}
              toggleModal={() => toggleModal()}
              teamId={props?.route?.params?.data?.teamId}
              serviceId={props?.route?.params?.data?.id}
              token={token}
              getPros={getPros}
              selectedDefaultService={selectedDefaultService}
            /> */}
          </ScrollView>
        </Screen>
      )}
      {!isLoading && (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text color={'black'} fontSize={scale(18)} fontWeight={'700'}>
            loading...
          </Text>
        </View>
      )}

      <View style={Style.proBtn}>
        <Button
          label="Connect your trusted Pro"
          width={'90%'}
          onPress={onAddPros}
        />
      </View>
    </>
  );
};

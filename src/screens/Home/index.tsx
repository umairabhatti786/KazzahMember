import React, {useState, useEffect} from 'react';
import {Text, View, Screen, Pressable} from 'ui';
import {FlatList, Platform, ScrollView} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import ListItem from 'components/ListItem';
import {categorySelector} from 'reducers/categoryReducer';
import {useSelector} from 'react-redux';
import {authSelector, getFeeds} from 'reducers/authReducer';
import {getAppointmentsAll, loadRootServices} from 'services/common';
import {
  useFocusEffect,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import MediaView from './MediaView';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {HorizontalFlatList} from '@idiosync/horizontal-flatlist';
import AppInnerHeader from 'newComponents/AppHeader';
import textStyle from 'theme/typoGraphy';
import NavigateArrowIcon from '../../assets/NavigateArrowIcon.svg';
import NoAppointmentCard from 'newComponents/NoAppointmentCard';
import InnerScreenHeader from 'newComponents/InnerScreenHeader';
import styles from './styles';
import AppointmentsCards from 'components/MultiProfileCrossol';
import {Title} from 'newComponents/TextComponents';
import {useDispatch} from 'react-redux';
import {setChannelId, setTeamId} from '../../reducers/addProReducer';
import HomeWelcomeModal from './WelcomeHomeModal';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController,
} from 'rn-tourguide';
import {fetchRecentAppointments} from 'reducers/appoinmentReducer';

export const Home = props => {
  const authState = useSelector(authSelector);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const WelcometoggleModal = () => {
    setShowWelcomeModal(!showWelcomeModal);
  };
  const getCategoryFromStore = useSelector(categorySelector);
  const [appointments, setAppointments] = useState([]);

  const dispatch = useDispatch();

  const getAppointments = async () => {
    const res = await getAppointmentsAll({
      time: 'present',
      status:
        'approveByProvider,pending,completed,rescheduleByProvider,rescheduleByMember',
    });
    const {success} = res.data;

    if (success) {
      let list = res.data.data.map((item: any) => {
        return {
          id: item.id,
          firstName: `${item.provider.firstName}`,
          lastName: `${item.provider.lastName}`,
          largetext: item.startTime,
          largetextsub: item.services[0].service.name,
          home: `${item.provider.street}, ${item.provider.city}`,
          imgUrl: item.provider.thumbnailUrl,
          isPaid: item.isPaid,
          appointmentDate: item.appointmentDate,
          status: item.status,
          provider: item.provider,
          isReservationFee: item.isReservationFee,
        };
      });

      list = list.filter(item => {
        return item.isPaid != 1;
      });

      setAppointments(list);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getAppointments();
    });
    const timer = setTimeout(() => {
      getAppointments();
    }, 10);

    return () => clearTimeout(timer && unsubscribe);
  }, []);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const feeds = useSelector(getFeeds);
  const {colors} = useTheme();
  const navigation = useNavigation();

  const iconProps = {size: 40, color: '#888'};

  const {canStart, start, stop, eventEmitter} = useTourGuideController();

  useEffect(() => {
    setShowWelcomeModal(true);
  }, []);

  const startGuide = () => {
    if (canStart) {
      start();
    }
  };
  const handleOnStart = () => console.log('start');
  const handleOnStop = () => console.log('stop');
  const handleOnStepChange = () => console.log(`stepChange`);

  React.useEffect(() => {
    eventEmitter?.on('start', handleOnStart);
    eventEmitter?.on('stop', handleOnStop);
    eventEmitter?.on('stepChange', handleOnStepChange);

    return () => {
      eventEmitter?.off('start', handleOnStart);
      eventEmitter?.off('stop', handleOnStop);
      eventEmitter?.off('stepChange', handleOnStepChange);
    };
  }, []);

  return (
    <Screen edges={['right', 'top', 'left']}>
      <AppInnerHeader />
      <ScrollView
        style={{
          flexDirection: 'column',
          backgroundColor: colors.background,
        }}
      >
        <Pressable>
          <Title title={`Hey, ${authState.currentUser.firstName}.`} />
        </Pressable>
        <View>
          <TourGuideZoneByPosition
            zone={1}
            shape={'rectangle'}
            text="Scroll through all of your appointments for the day."
            isTourGuide={true}
            containerStyle={{
              top:
                Platform.OS === 'android'
                  ? -verticalScale(80)
                  : -verticalScale(120),
            }}
          />
          <InnerScreenHeader
            onPressLeftHeading={() => props.navigation.navigate('Pending')}
            headingLabelRight="For today"
            headingLabelLeft="View appointments"
          />
        </View>

        {appointments.length > 0 ? (
          <AppointmentsCards data={appointments} />
        ) : (
          <NoAppointmentCard />
        )}

        <View>
          <TourGuideZoneByPosition
            containerStyle={{
              top:
                Platform.OS === 'android'
                  ? -verticalScale(80)
                  : -verticalScale(120),
            }}
            zone={2}
            shape={'rectangle'}
            text="Group all of your Pros by the line of business they belong to."
            isTourGuide={true}
          />

          <InnerScreenHeader
            onPressLeftHeading={() => props.navigation.navigate('YourTeams')}
            headingLabelRight="Your teams"
            headingLabelLeft="Manage"
          />
        </View>

        <View height={scale(210)} paddingHorizontal="s">
          {getCategoryFromStore?.categories?.length > 1 ? (
            <HorizontalFlatList
              numRows={2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={getCategoryFromStore.categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <ListItem
                    cardStyle={styles.channelContainerStyle}
                    item={item}
                    onPress={() => {
                      if (item.name === 'Add') {
                        toggleModal();
                      } else {
                        dispatch(setTeamId(item.teamId.toString()));
                        dispatch(setChannelId(item.id.toString()));

                        dispatch(fetchRecentAppointments(item.id));

                        props.navigation.navigate('TeamDetails', {
                          data: item,
                        });
                      }
                    }}
                  />
                );
              }}
            />
          ) : null}
        </View>
        {feeds.length > 0 && (
          <>
            <View>
              <TourGuideZoneByPosition
                containerStyle={{
                  top:
                    Platform.OS === 'android'
                      ? verticalScale(55)
                      : verticalScale(35),
                }}
                zone={3}
                shape={'rectangle'}
                text="See all of the best moments from the best Pros on Kazzah."
                isTourGuide={true}
              />
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
      </ScrollView>

      <HomeWelcomeModal
        isModalVisible={showWelcomeModal}
        toggleModal={WelcometoggleModal}
        onPressStart={startGuide}
      />
    </Screen>
  );
};

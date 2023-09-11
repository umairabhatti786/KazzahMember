import React, {useEffect, useState} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, Alert, Image, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SwipeListView} from 'react-native-swipe-list-view';
import NotificationCard from 'newComponents/NotificationCard';
import Animated from 'react-native-reanimated';
import HiddenCard from 'newComponents/HiddenCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import ViewNotificationSheet from 'newComponents/NotificationSheet';
import moment from 'moment';
import _ from 'lodash';
import {
  fetchAllNotifications,
  notificationsSelector,
  postNotificationStatus,
} from 'reducers/notificationsReducer';
import {authSelector} from 'reducers/authReducer';
import {useDispatch} from 'react-redux';

const GeneralNotification = () => {
  const notificationsList = useSelector(notificationsSelector);

  const authUser = useSelector(authSelector).currentUser;

  const dispatch = useDispatch();

  const {colors} = useTheme();
  const rowSwipeAnimatedValues = new Animated.Value(0);
  const [viewNotification, setViewNotification] = useState(false);
  const [selectNotification, setSelectNotification] = useState();
  const notification = _.orderBy(
    notificationsList,
    e => e.createdAt,
    'desc',
  ).map(e => {
    return {
      id: e.id,
      notificationClass: e.notificationClass,
      message: e.message,
      date: moment(new Date(e.createdAt)).fromNow(),
      isRead: e.isRead,
    };
  });
  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    rowSwipeAnimatedValues.setValue(Math.abs(value));
  };

  const toggleBottomSheet = () => {
    setViewNotification(!viewNotification);
  };

  const readNotifications = async (item: any) => {
    const body = {
      modelId: authUser.id,
      modelType: 'client',
      notificationId: item.id,
      isRead: 1,
    };

    await dispatch(postNotificationStatus(body)).unwrap();

    dispatch(fetchAllNotifications(authUser.id));
  };

  return (
    <>
      {/* <SafeAreaView> */}
      <View style={{paddingHorizontal: '6%'}}>
        <View height={scale(15)} />

        {/* <View height={0.5} style={{backgroundColor: colors.silverChalice}} /> */}
        <SwipeListView
          style={{marginBottom: 20}}
          data={notification}
          keyExtractor={item => item.id}
          leftOpenValue={75}
          rightOpenValue={-75}
          showsVerticalScrollIndicator={false}
          onSwipeValueChange={onSwipeValueChange}
          renderItem={({item, index}) => {
            return (
              <NotificationCard
                onPress={() => {
                  setSelectNotification(item);
                  toggleBottomSheet();
                  readNotifications(item);
                }}
                onReadMore={() => {
                  setSelectNotification(item);
                  toggleBottomSheet();
                  readNotifications(item);
                }}
                item={item}
                index={index}
              />
            );
          }}
          renderHiddenItem={({item}) => {
            return <HiddenCard />;
          }}
        />
      </View>

      {/* </SafeAreaView> */}

      <ViewNotificationSheet
        visible={viewNotification}
        data={selectNotification}
        setVisible={toggleBottomSheet}
      />
    </>
  );
};

export default GeneralNotification;

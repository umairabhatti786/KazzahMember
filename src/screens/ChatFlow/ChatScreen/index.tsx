import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {Alert, FlatList, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import _ from 'lodash';
import CustomSearch from 'newComponents/CustomSearch';
import SortFilterHeader from 'newComponents/SortFilterHeader/ContactHeader';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {SwipeListView} from 'react-native-swipe-list-view';
import ChatCard from './ChatCard';
import AddAppointment from 'newComponents/AddAppointment';
import HiddenCard from 'newComponents/HiddenCard';
import {EmptyChat} from './EmptyChat';
import {
  fetchChat,
  getChat,
  setSelectedConnectionId,
  setUserType,
} from 'reducers/chatReducer';
import {firebaseService} from 'services/firebase/firebaseService';
import moment from 'moment';
import {authSelector} from 'reducers/authReducer';
import {DeleteChat, GetChat} from 'services/chat';
import SimpleToast from 'react-native-simple-toast';
import {ActivityIndicator} from 'react-native-paper';

export const ChatScreen = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const {colors} = useTheme();
  const [sortOrder, setSortOrder] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [chatList, setChatList] = useState([]);
  const authState = useSelector(authSelector);
  const [list, setList] = useState([]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      get();
    });

    return unsubscribe;
  }, []);

  const get = async () => {
    const res = await GetChat(authState.currentUser.token);
    const {success, data} = res.data;

    if (success) {
      setIsLoading(true);
      var list = [...data];

      for (let index = 0; index < list?.length; index++) {
        const e = list[index];

        let fireData = (await firebaseService.getLastDoc(e.group))?.data();
        if (fireData) {
          if (fireData.isMedia) {
            list[index]['message'] = '[Attachment]';
          } else if (fireData.isSharePro) {
            list[index]['message'] = 'Shared Pro';
          } else {
            list[index]['message'] = fireData.message;
          }
          list[index]['date'] = moment(new Date(fireData.date.toDate()));
          list[index]['time'] = firebaseService.chatFormat(
            fireData.date,
            'h:mm a',
          );

          list[index]['ChatTime'] = moment(new Date(fireData.date.toDate()));
        }
      }
      var list = getCllChat(list);

      setList(_.orderBy(list, [obj => new Date(obj.ChatTime)], ['desc']));
    }
  };

  const getCllChat = (data: any) => {
    const providerChat = [];
    data.forEach(item => {
      const receiveUser =
        item?.senderId?.id == authState.currentUser.id
          ? item.receiverId
          : item.senderId;
      if (receiveUser) {
        providerChat.push({
          id: receiveUser?.id,
          // receiverType
          firstName: receiveUser?.first_name,
          lastName: receiveUser?.last_name,
          isPro: item.receiverType,
          receiverType: item.receiverType,
          message: item.message,
          date: item.date,
          ChatTime: item.ChatTime,
          time: item.time,
          image: {uri: receiveUser?.profile_image},
          name: `${receiveUser?.first_name} ${receiveUser?.last_name}`,
          firstName: receiveUser?.first_name,
          lastName: receiveUser?.last_name,
        });
      }
    });
    return providerChat;
  };

  const [collection, setCollection] = useState('');
  const handleCollection = async (receiverid: any) => {
    const collec = `Chat-${
      receiverid < authState.currentUser.id
        ? receiverid
        : authState.currentUser.id
    }-${
      receiverid < authState.currentUser.id
        ? authState.currentUser.id
        : receiverid
    }`;
    setCollection(collec);
    return collec;
  };
  const deleteUserChat = async (id: any) => {
    const collec = await handleCollection(id);
    console.log('CollectData', collec);

    const isDel = await firebaseService.deleteFirebaseChat(collec);
    if (isDel) {
      const response = await DeleteChat(authState.currentUser.token, collec);
      const {success} = response.data;
      if (success) {
        SimpleToast.show('Chat is deleted', SimpleToast.LONG);
        get();
      }
    } else {
    }
  };

  const onSort = () => {
    setSortOrder(!sortOrder);

    const newSortOrder = sortOrder ? 'asc' : 'desc';
    const sortedChat = _.orderBy(list, item => item?.firstName?.toLowerCase(), [
      newSortOrder,
    ]);

    setList(sortedChat);
  };

  return (
    <>
      {isLoading && (
        <>
          {list.length == 0 ? (
            <Screen edges={['top']} backgroundColor={colors.background}>
              <BackButtonHeader showPages={false} />

              <EmptyChat  navigation={props.navigation} />
            </Screen>
          ) : (
            <>
              <Screen edges={['top']} backgroundColor={colors.background}>
                <BackButtonHeader showPages={false} />

                {/* <EmptyChat/> */}

                <Title
                  style={{fontSize: scale(42), marginTop: scale(-10)}}
                  title={'Chat'}
                />
                <View style={{marginHorizontal: '6%'}}>
                  <CustomSearch
                    // onChangeFilterSearch={searchArray}
                    width={'100%'}
                    placeholder={'Search chat'}
                  />
                  <View height={verticalScale(10)} />
                  <SortFilterHeader
                    filterName="All"
                    onPress={onSort}
                    sortOrder={sortOrder}
                    //   filterName={selectedFilter}
                    //   filterContact={toggleBottomSheet}
                  />

                  <ScrollView nestedScrollEnabled={true}>
                    <View
                      style={{
                        backgroundColor: colors.background,
                        paddingBottom: scale(360),
                        width: '100%',
                      }}>
                      <SwipeListView
                        data={list}
                        keyExtractor={item => item.id}
                        rightOpenValue={-75}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => {
                          return (
                            <ChatCard
                              item={item}
                              onPress={() => {
                                dispatch(setSelectedConnectionId(item.id));
                                dispatch(setUserType(item.receiverType));
                                props.navigation.navigate('ChatDetailScreen', {
                                  userId: item.id,
                                  userType: item.receiverType,
                                });
                              }}
                              index={index}
                            />
                          );
                        }}
                        renderHiddenItem={({item}) => {
                          return (
                            <HiddenCard
                              onPress={() => {
                                Alert.alert(
                                  'Delete Chat',
                                  'Are you sure you want to Delete tis Chat?',
                                  [
                                    {
                                      text: 'Yes',
                                      onPress: async () => {
                                        deleteUserChat(item.id);
                                      },
                                    },
                                    {
                                      text: 'No',
                                      onPress: () => {
                                        return;
                                      },
                                    },
                                  ],
                                );
                              }}
                            />
                          );
                        }}
                      />
                    </View>
                  </ScrollView>
                </View>

                {/* )} */}
              </Screen>
              <AddAppointment
                bottom={'7%'}
                onPress={() => {
                  props.navigation.navigate('AddChat');
                }}
              />
            </>
          )}
        </>
      )}
      {!isLoading && (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator color={colors.black} />
        </View>
      )}
    </>
  );
};

import React, {useState, useEffect} from 'react';
import {Screen, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import MessageTextComponent from 'newComponents/MessageTextComponent';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import MessageTime from 'newComponents/MessageTime';
import SendMessage from 'newComponents/SendMessage';
import {launchImageLibrary} from 'react-native-image-picker';
import {firebaseService} from 'services/firebase/firebaseService';
import {authSelector} from 'reducers/authReducer';
import services from 'services';
import useService from '../services';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import {getMessage} from 'reducers/chatReducer';
import BackArrow from '../../../../src/assets/BackArrow.svg';

export const ChatDetailScreen = (props: any) => {
  let authState = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const message = useSelector(getMessage);
  const [mediaLoading, setMediaLoading] = useState(false);

  const {
    handleCollection,
    handleMessageSend,
    sendImage,
    sendMedia,
    sendShareMedia,
  } = useService();

  const receiverid = props.route?.params?.userId;
  const userType = props.route?.params?.userType;
  const mediaUrl = props.route?.params?.mediaUrl;
  const chatShare = props?.route?.params?.chatShare;

  const [chatList, setChatList] = useState([]);
  const uid = authState.currentUser.id;

  const [user, setUser] = useState();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const styles = makeStyles(colors);

  const getUser = async () => {
    try {
      let res;
      if (userType == 'client') {
        res = await services.getMemberProfileById(receiverid);
      } else {
        res = await services.getProviderProfileById(receiverid);
      }
      if (res.data.success) {
        setUser(res.data.data);
        setIsLoading(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
    get();
  }, [receiverid]);
  useEffect(() => {
    if (mediaUrl != undefined) {
      sendShareMedia(mediaUrl);
    }
  }, [mediaUrl]);

  const get = async () => {
    const collec = await handleCollection();
    console.log('🚀 ~ file: index.tsx:93 ~ get ~ collec:', collec);

    await firebaseService.fetchMessages(collec, (data: any) => {
      let messagesList = [
        ...data?.docs?.map((element: any) => element?._data),
      ].reverse();

      setChatList(messagesList);
    });
  };

  return (
    <>
      {isLoading && (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(0) : responsiveHeight(12)
          }>
          <Screen edges={['top']} backgroundColor={colors.background}>
            <TouchableOpacity
              style={{
                paddingHorizontal: '3%',
                marginTop: verticalScale(10),
              }}
              onPress={() => {
                if (chatShare) {
                  navigation.goBack();
                } else {
                  navigation.navigate('ChatScreen');
                }
              }}>
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
            <Title
              style={{fontSize: scale(42), marginTop: scale(-10)}}
              title={`${user?.firstName} ${user?.lastName}`}
            />
            <View
              style={{backgroundColor: colors.silverChalice, height: 0.5}}
            />
            <View style={styles.messageContainer}>
              <FlatList
                data={chatList}
                showsVerticalScrollIndicator={false}
                inverted={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  console.log('item', index);
                  const element = item;
                  let time = firebaseService.chatFormat(element.date, 'h:mm a');
                  const messageDate = moment(new Date(element.date.toDate()));
                  let LestMessageDate =
                    firebaseService.chatDateFormat(messageDate);

                  let showDateLabel = false;
                  if (index === chatList.length - 1) {
                    showDateLabel = true;
                  } else {
                    const nextMessage = chatList[index + 1];
                    const currentDate = new Date(item.date.toDate());
                    const nextDate = new Date(nextMessage.date.toDate());

                    if (currentDate.getDate() !== nextDate.getDate()) {
                      showDateLabel = true;
                    }
                  }

                  return (
                    <>
                      <MessageTextComponent time={time} item={item} uid={uid} />

                      {showDateLabel ? (
                        <MessageTime time={LestMessageDate} />
                      ) : null}
                    </>
                  );
                }}
              />
            </View>
            <View style={{paddingHorizontal: '6%', paddingBottom: scale(20)}}>
              <SendMessage
                textMessage={message}
                onPressSend={handleMessageSend}
                onOpenGallery={() => {
                  sendImage(setMediaLoading);
                }}
              />
            </View>
          </Screen>
        </KeyboardAvoidingView>
      )}
      {!isLoading && (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator color={colors.black} />
        </View>
      )}

      {mediaLoading && (
        <View
          flex={1}
          style={{position: 'absolute', top: '50%', left: '50%'}}
          justifyContent={'center'}
          alignItems={'center'}>
          <ActivityIndicator size={scale(30)} color={colors.black} />
        </View>
      )}
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    messageContainer: {
      flex: 5,
      marginHorizontal: '6%',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  });

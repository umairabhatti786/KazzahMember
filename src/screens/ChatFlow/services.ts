import {useCallback} from 'react';
import {Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import {
  getMessage,
  getSelectedConnectionId,
  getUserType,
  setMessage,
} from 'reducers/chatReducer';
import services from 'services';
import {PostChat, PostFile} from 'services/chat';
import {firebaseService} from 'services/firebase/firebaseService';
import {SendNotification} from 'services/notification';

const useService = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(authSelector).currentUser;

  const receiverid = useSelector(getSelectedConnectionId);
  const userType = useSelector(getUserType);

  const message = useSelector(getMessage);

  function uniqueid() {
    var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
    do {
      var ascicode = Math.floor(Math.random() * 42 + 48);
      if (ascicode < 58 || ascicode > 64) {
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);

    return idstr;
  }

  const handleCollection = async () => {
    const collec = `Chat-${
      receiverid < currentUser.id ? receiverid : currentUser.id
    }-${receiverid < currentUser.id ? currentUser.id : receiverid}`;
    return collec;
  };

  const handleMessageSend = useCallback(
    async function () {
      try {
        if (message.length != 0) {
          dispatch(setMessage(''));
          const senderName = `You have a new message from ${currentUser.firstName} ${currentUser.lastName}`;
          const body = {
            title: 'Message Received',
            body: senderName,
            recipientId: receiverid,
            recipientType: 'provider',
            Event: 'chat',
            device_type: Platform.OS,
          };
          await services.sendNotification(body);

          const collec = await handleCollection();
          const isAva = await firebaseService.isCollectionExists(collec);
          if (!isAva) {
            const messageBody = {
              group: collec,
              senderId: currentUser.id,
              senderType: 'client',
              receiverId: receiverid,
              receiverType: userType,
            };

            await services.postChat(messageBody);
          }

          await firebaseService.createMessage({
            message: {
              uid: currentUser.id,
              message: message,
              date: new Date(),
              id: uniqueid(),
              isSharePro: false,
            },
            collection: collec,
          });
        }
      } catch (error) {
        console.log('🚀 ~ file: services.ts:80 ~ error:', error);
      }
    },
    [message],
  );

  const sendImage = async (setMediaLoading: any) => {
    const res = await launchImageLibrary({mediaType: 'photo'});
    if (res.assets) {
      const imageFile = res.assets[0];

      const arr = imageFile?.fileName.split('.');

      arr.reverse();

      const file = {
        uri: imageFile?.uri,
        type:
          Platform.OS == 'ios'
            ? imageFile.type.replace('image/')
            : `image/${arr[0]}`,
        name: imageFile?.fileName,
      };

      const response = await services.postFile({file});
      sendMedia(response.data?.data?.url, setMediaLoading);
    }
  };

  const sendMedia = async (url: any, setMediaLoading: any) => {
    setMediaLoading(true);
    const collec = await handleCollection();
    const isAva = await firebaseService.isCollectionExists(collec);
    if (!isAva) {
      const body = {
        group: collec,
        senderId: currentUser.id,
        senderType: 'client',
        receiverId: receiverid,
        receiverType: userType,
        isMedia: true,
        mediaUrl: url,
      };

      const res = await services.postChat(body);
    }

    await firebaseService.createMessage({
      message: {
        uid: currentUser.id,
        message: message,
        date: new Date(),
        id: uniqueid(),
        isSharePro: false,
        isMedia: true,
        mediaUrl: url,
      },
      collection: collec,
    });
    setTimeout(() => {
      setMediaLoading(false);
    }, 2000);
  };

  const sendShareMedia = async (url: any, setMediaLoading: any) => {
    const collec = await handleCollection();
    const isAva = await firebaseService.isCollectionExists(collec);
    if (!isAva) {
      const body = {
        group: collec,
        senderId: currentUser.id,
        senderType: 'client',
        receiverId: receiverid,
        receiverType: userType,
        isMedia: true,
        mediaUrl: url,
      };

      const res = await services.postChat(body);
    }

    await firebaseService.createMessage({
      message: {
        uid: currentUser.id,
        message: message,
        date: new Date(),
        id: uniqueid(),
        isSharePro: false,
        isMedia: true,
        mediaUrl: url,
      },
      collection: collec,
    });
  };

  return {
    handleMessageSend,
    handleCollection,
    sendImage,
    sendMedia,
    sendShareMedia,
  };
};

// Export
export default useService;

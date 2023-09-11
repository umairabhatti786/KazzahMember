import React, {useState} from 'react';
import {Alert, Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {addMediaToFavourite} from 'services/Explore';
import {View} from 'ui';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, updateFeedByIndex} from 'reducers/authReducer';
import FastImage from 'react-native-fast-image';
import {downloadImage} from 'services/common';
import ReelsLeftIcon from 'newComponents/ReelsLeftIcon';
import ReelsHeader from 'newComponents/ReelsHeader';
import ReelsFooter from 'newComponents/ReelsFooter';
import {setEmptyImage} from 'reducers/providerReducer';

const MediaView = ({
  media,
  index,
  setMedia,
  profileMedia,
  providerMedia,
}: any) => {
  const [disableLike, setDisableLike] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  console.log('MediaIsFav', media.isFav);
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage(media);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage(media);
        } else {
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const authState = useSelector(authSelector);
  const token = authState?.currentUser?.token;
  const addToFav = async () => {
    try {
      setDisableLike(true);
      let formData = new FormData();
      let m = media.isFav ? 0 : 1;
      formData.append('isFav', m);
      formData.append('mediaId', media?.id.toString());

      const res = await addMediaToFavourite(token, formData);
      const {success, data} = res.data;

      console.log('MediaDataISsuccess', data);

      if (success) {
        if (profileMedia) {
          setMedia(data);
        }

        dispatch(updateFeedByIndex({index, feed: data}));
      }

      setDisableLike(false);
    } catch (error) {
      setDisableLike(false);
    }
  };

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
      }}
    >
      <View flex={1} style={{justifyContent: 'space-between'}}>
        <FastImage
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
          source={{
            uri: media?.url,
          }}
          resizeMode="cover"
        />
        <ReelsHeader
          media={media}
          onPress={() => {
            if (profileMedia) {
              setMedia?.('');
              dispatch(setEmptyImage());
              return;
            }
            navigation.goBack();
          }}
        />
        {!providerMedia && (
          <ReelsLeftIcon
            disableLike={disableLike}
            addToFav={addToFav}
            media={media}
            checkPermission={checkPermission}
            dispatch={dispatch}
          />
        )}

        <ReelsFooter navigation={navigation} media={media} />
      </View>
    </View>
  );
};

export default MediaView;

import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View, Pressable, Text} from 'ui';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import CrossIcon from '../../assets/CrossIcon.svg';
import {BottomSheet} from 'react-native-btr';
import {AddPhotoOptionList} from './SettingListData';
import textStyle from 'theme/typoGraphy';
import {
  launchImageLibrary,
  Asset,
  launchCamera,
} from 'react-native-image-picker';
import {ImageHeight, ImageWidth} from 'utils/constants';

import ImagePicker from 'react-native-image-crop-picker';

import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getSelectedMediaDetails,
  setSelectedMediaDetails,
} from 'reducers/updateProfileReducer';

const AddPhotoBottomSheet = ({visible, setVisible}: any) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mediaDetails = useSelector(getSelectedMediaDetails);
  const styles = makeStyles(colors);
  const [imageFile, setimageFile] = useState<Asset>();

  const onImagePick = async (type: string) => {
    let options = {
      height: ImageHeight,
      width: ImageWidth,
      mediaType: type,
    };

    const res = await ImagePicker.openPicker(options);

    if (res) {
      const file = {
        uri: res.path,
        fileName: res.path.split('/').reverse()[0],
        type: res.mime,
      };
      if (file.uri?.includes('video')) {
        if (res?.duration >= 5) {
          Alert.alert('Video length must be smaller than 5 seconds');
        } else {
          let mediaData = {
            ...mediaDetails,
            media: file,
          };
          dispatch(setSelectedMediaDetails(mediaData));
          onClose();
          navigation.navigate('AddToTeams');
        }
      } else {
        let mediaData = {
          ...mediaDetails,
          media: file,
        };
        dispatch(setSelectedMediaDetails(mediaData));
        onClose();
        navigation.navigate('AddToTeams');
      }
    }
  };
  const onCameraImage = async () => {
    let options = {
      height: ImageHeight,
      width: ImageWidth,
      mediaType: 'any',
    };

    const res = await ImagePicker.openCamera(options);

    if (res) {
      const file = {
        uri: res.path,
        fileName: res.path.split('/').reverse()[0],
        type: res.mime,
      };
      if (file.uri?.includes('video')) {
        if (res?.duration >= 5) {
          Alert.alert('Video length must be smaller than 5 seconds');
        } else {
          let mediaData = {
            ...mediaDetails,
            media: file,
          };
          dispatch(setSelectedMediaDetails(mediaData));
          onClose();
          navigation.navigate('AddToTeams');
        }
      } else {
        let mediaData = {
          ...mediaDetails,
          media: file,
        };
        dispatch(setSelectedMediaDetails(mediaData));
        onClose();
        navigation.navigate('AddToTeams');
      }
    }
  };
  const onCameraVideo = async () => {
    let options = {
      height: ImageHeight,
      width: ImageWidth,
      mediaType: 'video',
    };

    const res = await ImagePicker.openCamera(options);

    if (res) {
      const file = {
        uri: res.path,
        fileName: res.path.split('/').reverse()[0],
        type: res.mime,
      };
      if (file.uri?.includes('video')) {
        if (res?.duration >= 5000) {
          Alert.alert('Video length must be smaller than 5 seconds');
        } else {
          let mediaData = {
            ...mediaDetails,
            media: file,
          };
          dispatch(setSelectedMediaDetails(mediaData));
          onClose();
          navigation.navigate('AddToTeams');
        }
      } else {
        let mediaData = {
          ...mediaDetails,
          media: file,
        };
        dispatch(setSelectedMediaDetails(mediaData));
        onClose();
        navigation.navigate('AddToTeams');
      }
    }
  };
  const onClose = () => {
    setVisible();
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View
        flexDirection={'column'}
        alignSelf="center"
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={'52%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden">
        <Pressable style={styles.crossIcon} onPress={onClose}>
          <CrossIcon
            style={{
              color: colors.black,
              width: scale(40),
              height: scale(40),
            }}
          />
        </Pressable>
        <View height={scale(20)} />
        <Text style={[textStyle.h3, {color: colors.black}]}>Add</Text>
        <View height={scale(20)} />
        {AddPhotoOptionList.map((item, index) => {
          const onPress = () => {
            switch (index) {
              case 0:
                onCameraImage();
                break;
              case 1:
                onCameraVideo();

                break;
              case 2:
                onImagePick('image');

                break;
              case 3:
                onImagePick('video');

                break;
              default:
                break;
            }
          };
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              onPress={onPress}
              style={{
                borderBottomColor: colors.gallery,
                borderBottomWidth: 1,
                backgroundColor: colors.background,
                borderTopColor: colors.gallery,
                borderTopWidth: 1,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                height: verticalScale(55),
              }}>
              <Image
                style={
                  index == 0
                    ? styles.imageStyleCamera
                    : index == 3
                    ? styles.videoStyleGallery
                    : styles.imageStyleGallery
                }
                resizeMode="cover"
                source={item?.icon}
              />
              <View width={scale(20)} />
              <Text
                numberOfLines={1}
                style={[textStyle.b3, {color: colors.black}]}
                ellipsizeMode={'tail'}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomSheet>
  );
};

export default AddPhotoBottomSheet;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    crossIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: scale(40),
      width: scale(40),
      marginTop: scale(-10),
      marginLeft: scale(-10),
    },
    imageStyleCamera: {
      height: scale(16),
      width: scale(20),
    },
    imageStyleGallery: {
      height: scale(20),
      width: scale(20),
    },
    videoStyleGallery: {
      height: scale(22),
      width: scale(20),
    },
  });

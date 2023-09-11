import {FlatList, StyleSheet, Share as RNShare, Platform} from 'react-native';
import {View, Pressable, Text} from 'ui';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import CrossIcon from '../../assets/CrossIcon.svg';
import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import FastImage from 'react-native-fast-image';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import RNFS from 'react-native-fs';
import ProvidersList from 'screens/ProfileFlow/ProvidersList';
import {
  AddPhotoMenuList,
  AddPhotoMenuListSearch,
  ProviderListData,
} from 'screens/ProfileFlow/SettingListData';
import AddPhotoMenuLists from 'screens/ProfileFlow/AddPhotoMenuList';
import {getAllContactsList} from 'reducers/contactReducer';

const PhotoMenuBottom = ({
  visible,
  setVisible,
  selectedPhoto,
  setIsDeleted,
}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [showProviders, setShowProviders] = useState(false);
  const [showDeletePhoto, setShowDelete] = useState(false);
  const authState = useSelector(authSelector);
  const connectionList = useSelector(getAllContactsList);

  const onClose = () => {
    setVisible();
    setShowProviders(false);
  };
  const onSharePress = async () => {
    try {
      let imagePath = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', selectedPhoto?.url)
        .then(resp => {
          imagePath = resp.path();
          return resp.readFile('base64');
        })
        .then(base64Data => {
          var imageBase64 = 'data:image/png;base64,' + base64Data;

          let shareImage = {
            type: 'image/png',
            message: `${authState?.currentUser?.firstName} ${authState?.currentUser?.lastName} has shared content with you from Kazzah! Connect with ${authState?.currentUser?.firstName} ${authState?.currentUser?.lastName} in Kazzah to view more and discover the local pros your friends trust. kazzah.com`,
            url: imageBase64,
          };

          if (Platform.OS != 'android') {
            RNShare.share(shareImage)
              .then(result => console.log(result))
              .catch(errorMsg => console.log(errorMsg));
          } else {
            Share.open(shareImage)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                err && console.log(err);
              });
          }

          return RNFS.unlink(imagePath);
        });
    } catch (error) {
      console.error(error.message);
    }
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
        height={'45%'}
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
        {showProviders ? (
          <Text style={[textStyle.h3, {color: colors.black}]}>
            Select thread
          </Text>
        ) : (
          <View flexDirection={'row'}>
            <FastImage
              source={{uri: selectedPhoto?.url}}
              style={{
                height: scale(55),
                width: scale(55),
                borderRadius: scale(8),
              }}
            />
            <View
              marginLeft={'s'}
              alignItems={'center'}
              justifyContent={'space-between'}
              flexDirection={'row'}>
              <View width={'70%'} flexDirection={'column'}>
                <Text
                  numberOfLines={1}
                  style={[textStyle.b3, {color: colors.black}]}
                  ellipsizeMode={'tail'}>
                  IMG_9520
                </Text>
                <View height={scale(2)} />
                <Text
                  numberOfLines={1}
                  style={[textStyle.b5, {color: colors.doveGray}]}>
                  May 21, 2023
                </Text>
              </View>
            </View>
          </View>
        )}

        <View height={scale(20)} />
        {showProviders ? (
          <ProvidersList
            mediaUrl={selectedPhoto?.url}
            onClose={onClose}
            ProviderListData={connectionList}
          />
        ) : (
          <FlatList
            data={AddPhotoMenuListSearch}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <AddPhotoMenuLists
                  onSharePress={onSharePress}
                  closeModalMenu={onClose}
                  selectedPhoto={selectedPhoto}
                  item={item}
                  index={index}
                  showProviders={showProviders}
                  setShowProviders={setShowProviders}
                  showDeletePhoto={showDeletePhoto}
                  setShowDelete={setShowDelete}
                  onClose={onClose}
                />
              );
            }}
          />
        )}
      </View>
    </BottomSheet>
  );
};

export default PhotoMenuBottom;

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
    imageStyleArrow: {
      width: scale(7),
      height: scale(10),
      marginLeft: 'auto',
    },
    imageStyle: {
      height: scale(10),
      width: scale(10),
    },
  });

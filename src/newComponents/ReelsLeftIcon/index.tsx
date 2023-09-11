import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import {setMedia, setVisibleMediaShare} from 'reducers/mediaReducer';
import HeartIcon from '../../assets/HeartIcon.svg';
import DownloadIcon from '../../assets/DownloadIcon.svg';
import ShareIcon from '../../assets/ShareIcon.svg';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import PhotoMenuBottom from 'screens/ExploreFlow/PhotoMenuBottom';
import {useSelector} from 'react-redux';
import {getAllContactsList} from 'reducers/contactReducer';
interface Props {
  disableLike: any;
  addToFav: any;
  media: any;
  checkPermission: any;
  dispatch: any;
}

const ReelsLeftIcon = ({
  disableLike,
  addToFav,
  media,
  checkPermission,
  dispatch,
}: Props) => {
  const {colors} = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [showPhotoMenuModal, setShowPhotoMenuModal] = useState(false);

  return (
    <View
      alignSelf={'flex-end'}
      width={'20%'}
      height={'100%'}
      flexDirection="column"
      justifyContent={'center'}
      alignItems={'center'}
      top={'35%'}
      zIndex={100}
      position={'absolute'}>
      <View>
        <TouchableOpacity disabled={disableLike} onPress={() => addToFav()}>
          {media?.isFav ? (
            <Image
              style={{
                height: scale(20),
                width: scale(20),
                tintColor: 'red',
              }}
              resizeMode="contain"
              source={require('../../../assets/heart.png')}
            />
          ) : (
            <HeartIcon width={scale(20)} height={scale(20)} />
          )}
        </TouchableOpacity>
        <View height={scale(3)} />
        <Text
          style={[
            textStyle.cta1,
            {textAlign: 'center', color: colors.background},
          ]}>
          {media?.mediaLikeCounts}
        </Text>
      </View>
      <View height={'2%'} />
      <View>
        <Pressable
          onPress={() => {
            setSelectedPhoto(media);

            dispatch(setMedia(media));
            dispatch(setVisibleMediaShare(true));

            setShowPhotoMenuModal(true);
          }}>
          <ShareIcon width={scale(16)} height={scale(16)} />
        </Pressable>
      </View>
      <View height={'3%'} />
      {media?.type == 'image' ? (
        <View>
          <Pressable onPress={checkPermission}>
            <DownloadIcon width={scale(20)} height={scale(20)} />
          </Pressable>
        </View>
      ) : (
        <></>
      )}

      <PhotoMenuBottom
        selectedPhoto={selectedPhoto}
        visible={showPhotoMenuModal}
        setVisible={setShowPhotoMenuModal}
      />
    </View>
  );
};

export default ReelsLeftIcon;

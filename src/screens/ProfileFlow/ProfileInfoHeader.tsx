import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {View, Text, Pressable} from 'ui';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import EditPen from '../../assets/EditPen.svg';
import {
  launchImageLibrary,
  Asset,
  launchCamera,
} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {updateProfileImage} from 'reducers/updateProfileReducer';
import {authSelector, logIn} from 'reducers/authReducer';
import {useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';

type Props = {
  ProviderDetail: any;
};

const ProfileInfoHeader = ({ProviderDetail}: Props) => {
  const dispatch = useDispatch();
  const authState = useSelector(authSelector);
  const [showImage, setShowImage] = useState(false);
  const [pickedImage, setpickedImage] = useState(null);

  const toast = useToast();
  const onImagePick = () => {
    launchImageLibrary(null, res => {
      if (res.assets) {
        const file = res.assets[0];
        let formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        });

        setpickedImage(file?.uri);
        dispatch(updateProfileImage(formData))
          .unwrap()
          .then(originalPromiseResult => {
            toast.show('Profile image updated successfully', {
              type: 'success_custom',
              placement: 'bottom',
              duration: 4000,
              animationType: 'slide-in',
            });

            let userProfile = {...originalPromiseResult?.data};
            userProfile['token'] = authState.currentUser.token;
            dispatch(logIn(userProfile));
            // navigation.navigate('PhotoScreen');

            // handle result here
          })
          .catch(rejectedValueOrSerializedError => {
            toast.show(
              'Unable to upload image ' +
                rejectedValueOrSerializedError.message,
              {
                type: 'error_custom',
                placement: 'bottom',
                duration: 4000,
                animationType: 'slide-in',
              },
            );
            // handle error here
          });
        // responsePhotoUpload.mutateAsync(formData);
      }
    });
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const provider = ProviderDetail;

  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={() => setShowImage(true)}>
        {provider?.profileImage ? (
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyle}
              resizeMode="cover"
              source={{
                uri: pickedImage != null ? pickedImage : provider?.profileImage,
              }}
            />
          </View>
        ) : (
          <Pressable onPress={() => onImagePick()}>
            <InitialNameLetters
              width={scale(85)}
              height={scale(85)}
              fontSize={20}
              firstName={`${provider?.firstName}`}
              lastName={`${provider?.lastName}`}
            />
          </Pressable>
        )}
        <Pressable style={styles.editPen} onPress={() => onImagePick()}>
          <EditPen />
        </Pressable>
      </TouchableOpacity>

      <View
        style={{
          width: '70%',
          alignItems: 'center',
          marginTop: verticalScale(15),
        }}>
        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {provider?.firstName}
        </Text>
        <Text numberOfLines={1} style={[textStyle.h1, {color: colors.black}]}>
          {provider?.lastName}
        </Text>
      </View>

      <ImageView
        images={[{uri: provider?.profileImage}]}
        imageIndex={0}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      />
    </View>
  );
};

export default ProfileInfoHeader;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    Container: {
      alignItems: 'center',
      marginTop: '7%',
    },
    imageContainer: {
      width: scale(85),
      height: scale(85),
      borderRadius: scale(10),
      overflow: 'hidden',
      flexDirection: 'column',
    },
    imageStyle: {
      height: '100%',
      width: '100%',
    },
    editPen: {
      zIndex: 100,
      top: '65%',
      left: '2%',

      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });

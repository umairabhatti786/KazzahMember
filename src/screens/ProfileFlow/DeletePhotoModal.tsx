import {StyleSheet} from 'react-native';
import {View, Text, Pressable} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import CrossIcon from '../../assets/CrossIcon.svg';
import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import PhotoDeleteIcon from '../../assets/PhotoDeleteIcon.svg';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {deleteMedia} from 'reducers/updateProfileReducer';

const DeletePhotoModal = ({
  visible,
  setVisible,
  mediaId,
  closeModalMenu,
}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();
  const onClose = () => {
    setVisible();
  };

  const _deleteMedia = () => {
    dispatch(deleteMedia(mediaId))
      .unwrap()
      .then(originalPromiseResult => {
        onClose();
        setTimeout(() => {
          closeModalMenu();
        }, 150);

        toast.show('Media deleted successfully', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('PhotoScreen');

        // handle result here
      })
      .catch(rejectedValueOrSerializedError => {
        toast.show(rejectedValueOrSerializedError, {
          type: 'error_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        // handle error here
      });
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
        height={'55%'}
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

        <View
          style={{
            width: '100%',
            marginTop: verticalScale(10),
            alignItems: 'center',
          }}>
          <PhotoDeleteIcon style={{width: scale(40), height: scale(40)}} />
          <View height={verticalScale(10)} />
          <View width={'100%'} alignItems={'center'}>
            <Text
              style={[
                textStyle.h1,
                {textAlign: 'center', color: colors.black},
              ]}>
              Delete photo?
            </Text>
            <View height={verticalScale(5)} />

            <Text
              style={[
                textStyle.b3,
                {textAlign: 'center', width: '90%', lineHeight: scale(18)},
              ]}>
              Are you sure you want to delete this photo from Kazzah?
            </Text>
          </View>
        </View>
        <View height={verticalScale(20)} />
        <Button
          label="Yes, delete"
          width={'100%'}
          onPress={() => {
            _deleteMedia();
          }}
        />
        <View height={scale(20)} />
        <Pressable onPress={onClose}>
          <Text
            style={[textStyle.h3, {color: colors.black, textAlign: 'center'}]}>
            Nevermind
          </Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default DeletePhotoModal;

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
  });

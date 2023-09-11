import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Text, View} from 'ui';
import {EyeOffShowIcon} from './SettingListData';
import {useSelector} from 'react-redux';
import {
  getSelectedMediaDetails,
  setSelectedMediaDetails,
} from 'reducers/updateProfileReducer';
import {useDispatch} from 'react-redux';
import DeletePhotoModal from './DeletePhotoModal';

type Props = {
  index: any;
  item: any;
  setShowProviders: any;
  showProviders: any;
  showDeletePhoto: any;
  setShowDelete: any;
  onClose: any;
  selectedPhoto: any;
  closeModalMenu: any;
  onSharePress: any;
};

const AddPhotoMenuLists = ({
  index,
  item,
  setShowProviders,
  showProviders,
  showDeletePhoto,
  setShowDelete,
  onClose,
  selectedPhoto,
  closeModalMenu,
  onSharePress,
}: Props) => {
  const mediaDetails = useSelector(getSelectedMediaDetails);
  const dispatch = useDispatch();

  const onPress = () => {
    switch (index) {
      case 0:
        setShowProviders(!showProviders);
        break;
      case 1:
        onClose();
        onSharePress();
        break;
      case 2:
        Alert.alert(
          'Please Confirm',
          !privacyShow
            ? 'All media will be set to public.'
            : 'All media will be set to private.',
          [
            {
              text: 'Yes',
              onPress: async () => {
                setPrivayShow(!privacyShow);
              },
            },
            {
              text: 'No',
              onPress: () => {},
            },
          ],
        );
        break;
      case 3:
        const file = {
          uri: selectedPhoto?.url,
          fileName: selectedPhoto?.url.split('/').reverse()[0],
          type: selectedPhoto?.type,
        };
        let mediaData = {
          ...mediaDetails,
          media: file,
          description: selectedPhoto?.caption,
          mediaId: selectedPhoto?.id,
          tags: [
            {
              label: selectedPhoto?.tags[0]?.service?.id,
              value: selectedPhoto?.tags[0]?.service?.id,
              service: {
                name: selectedPhoto?.tags[0]?.service?.name,
                icon: selectedPhoto?.tags[0]?.service?.icon,
              },
            },
          ],
          ProCount:
            selectedPhoto?.tags[0]?.serviceResource?.providerCountAgainstTeam,
        };

        dispatch(setSelectedMediaDetails(mediaData));
        onClose();

        navigation.navigate('EditPhotoScreen');
        break;
      case 4:
        setShowDelete(!showDeletePhoto);
        break;

      default:
        break;
    }
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [privacyShow, setPrivayShow] = useState(false);
  const navigation = useNavigation();

  return (
    <React.Fragment>
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
        {privacyShow ? (
          <Image resizeMode="cover" source={EyeOffShowIcon} />
        ) : (
          <Image resizeMode="cover" source={item?.icon} />
        )}

        <View width={scale(20)} />
        <Text
          numberOfLines={1}
          style={[textStyle.b3, {color: colors.black}]}
          ellipsizeMode={'tail'}>
          {item?.name}{' '}
          {index == 2 && (
            <Text
              style={[textStyle.b3, {color: colors.black, fontWeight: '600'}]}>
              {privacyShow ? 'private' : 'public'}
            </Text>
          )}
        </Text>
        {(index == 0 || index == 1) && (
          <Image
            resizeMode="cover"
            style={styles.imageStyleArrow}
            source={item?.leftIcon}
          />
        )}
      </TouchableOpacity>
      <DeletePhotoModal
        closeModalMenu={closeModalMenu}
        mediaId={selectedPhoto?.id}
        visible={showDeletePhoto}
        setVisible={setShowDelete}
      />
    </React.Fragment>
  );
};

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

export default AddPhotoMenuLists;

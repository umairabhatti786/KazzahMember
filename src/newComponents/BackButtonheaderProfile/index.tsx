import React, {useState, useEffect} from 'react';
import {Pressable, View} from 'ui';
import BackArrow from '../../assets/BackArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import {moderateScale, scale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import EyeIcon from '../../assets/EyeIcon.svg';
import EyeOffIcon from '../../assets/EyeOffIcon.svg';
import Heart_Icon from '../../assets/Heart_Icon.svg';
import Share_Icon from '../../assets/Share_Icon.svg';
import {useSelector} from 'react-redux';
import {
  disConnectProvider,
  getProviderFav,
  getProviderId,
  getProviderProfile,
  postProviderFav,
  setProviderFav,
} from 'reducers/providerReducer';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Alert} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {authSelector} from 'reducers/authReducer';
import {loadRootServices} from 'services/common';

type Props = {
  handleBack?: any;
  onSharePress?: any;
  onEyePress?: any;
};

const BackButtonHeaderProfile = ({
  handleBack = null,
  onEyePress,
  onSharePress,
}: Props) => {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {token} = useSelector(authSelector).currentUser;

  const isFav = useSelector(getProviderFav);
  const providerId = useSelector(getProviderId);
  const toast = useToast();
  console.log('AllToken', providerId);

  const onHeartPress = () => {
    const data = {
      type: 'provider',
      id: providerId,
      isFav: !isFav ? 1 : 0,
    };

    dispatch(postProviderFav(data));
  };

  const onDeletePress = () => {
    Alert.alert('Remove Connection', 'Are you sure?', [
      {
        text: 'Yes',
        onPress: async () => {
          const id = providerId;

          dispatch(disConnectProvider({id, disconnectWtih: 'provider'}))
            .unwrap()
            .then(originalPromiseResult => {
              toast.show('This provider is deleted!', {
                type: 'success_custom',
                placement: 'bottom',
                duration: 4000,
                animationType: 'slide-in',
              });
              loadRootServices();
              navigation.goBack();

              // handle result here
            })
            .catch(rejectedValueOrSerializedError => {
              console.log(
                'rejectedValueOrSerializedError',
                rejectedValueOrSerializedError,
              );

              toast.show(rejectedValueOrSerializedError, {
                type: 'error_custom',
                placement: 'bottom',
                duration: 4000,
                animationType: 'slide-in',
              });
              // handle error here
            });
          // const res = await Disconnection({id, disconnectWtih: 'provider'});

          // if (res.data.success) {
          //   SimpleToast.show('This provider is deleted!');
          //   props.navigation.goBack();
          // }
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={'s'}
      alignItems={'center'}
      paddingRight={'xxl'}
      marginTop={'3xl'}
    >
      <Pressable
        style={{flex: 1}}
        onPress={() => {
          handleBack;

          navigation.goBack();
        }}
      >
        <BackArrow
          style={{
            alignSelf: 'flex-start',
            marginLeft: scale(10),
            color: colors.black,
          }}
          width={scale(20)}
          height={scale(15)}
        />
      </Pressable>

      <Pressable onPress={onEyePress}>
        <EyeIcon color={colors.black} style={{marginRight: scale(18)}} />
      </Pressable>
      <Pressable style={{marginRight: scale(18)}} onPress={onHeartPress}>
        <AntDesign
          name={isFav == 1 ? 'heart' : 'hearto'}
          color={isFav == 1 ? colors.red : colors.black}
          size={moderateScale(20)}
        />
        {/* <Heart_Icon color={isFav?:colors.black} style={{marginRight: scale(18)}} /> */}
      </Pressable>
      <Pressable onPress={onSharePress}>
        <Share_Icon
          width={scale(16)}
          height={scale(16)}
          color={colors.black}
          style={{marginRight: scale(18)}}
        />
      </Pressable>

      <Pressable onPress={onDeletePress}>
        <DeleteIcon
          style={{
            color: colors.black,
            marginRight: scale(10),
          }}
          width={scale(16)}
          height={scale(17)}
        />
      </Pressable>
    </View>
  );
};

export default BackButtonHeaderProfile;

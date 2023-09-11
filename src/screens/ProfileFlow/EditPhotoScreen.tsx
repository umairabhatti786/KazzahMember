import React, {useEffect} from 'react';
import {Screen, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import textStyle from 'theme/typoGraphy';
import {HomeIcon, NextIcon} from './SettingListData';
import {SvgUri} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {
  getSelectedMediaDetails,
  setSelectedMediaDetails,
  updateMedia,
} from 'reducers/updateProfileReducer';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import qs from 'qs';

const schema = yup.object().shape({
  description: yup.string().required('Description is required'),
});

const EditPhotoScreen = (props: any) => {
  const mediaDetails = useSelector(getSelectedMediaDetails);
  const dispatch = useDispatch();
  console.log('MediaDeyail', mediaDetails);

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const toast = useToast();
  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  console.log('mediaDetails', mediaDetails);

  useEffect(() => {
    if (mediaDetails?.description) {
      setValue('description', mediaDetails?.description);
    }
  }, []);

  const selectService = async () => {
    let mediaData = {
      ...mediaDetails,

      description: mediaDetails?.description,
    };

    // console.log('mediadata123', JSON.stringify(mediaData, null, 2));
    dispatch(setSelectedMediaDetails(mediaData));

    navigation.navigate('AddToTeams', {
      isEdit: true,
    });
  };

  const submit = async (form: any) => {
    const mediaData = {
      caption: form?.description,
      tags: JSON.stringify([mediaDetails?.tags[0]?.label]),
    };

    let params = {
      data: qs.stringify(mediaData),
      id: mediaDetails?.mediaId,
    };

    // console.log('parms1234', JSON.stringify(params, null, 2));

    dispatch(updateMedia(params))
      .unwrap()
      .then((originalPromiseResult: any) => {
        toast.show(originalPromiseResult.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('PhotoScreen');

        // handle result here
      })
      .catch((rejectedValueOrSerializedError: any) => {
        toast.show(rejectedValueOrSerializedError, {
          type: 'error_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
      });
  };
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }>
          <BackButtonHeader
            showSave={true}
            onPressSave={handleSubmit(submit)}
            showPages={false}
            showCancel={false}
          />

          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <Title title={'Edit'} />
            <View height={scale(10)} />
            <View style={{alignItems: 'center', paddingHorizontal: '7%'}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={selectService}
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
                <SvgUri
                  width={30}
                  height={30}
                  uri={mediaDetails?.tags[0]?.service?.icon}
                />

                <View width={scale(20)} />
                <View width={'70%'} flexDirection={'column'}>
                  <Text
                    numberOfLines={1}
                    style={[textStyle.b3, {color: colors.black}]}
                    ellipsizeMode={'tail'}>
                    {mediaDetails?.tags[0]?.service?.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={[textStyle.b5, {color: colors.doveGray}]}>
                    {mediaDetails?.ProCount} Pros
                  </Text>
                </View>

                <Image
                  resizeMode="cover"
                  style={styles.imageStyleArrow}
                  source={NextIcon}
                />
              </TouchableOpacity>
              <View height={scale(8)} />
              <TextInput
                control={control}
                name={'description'}
                label="Description"
              />
              {/* <TextInput
                control={control}
                name={'description'}
                label="Description"
              /> */}
            </View>
          </Wrapper>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    KeyboardAvoiding: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
    },
    BackIcon: {
      width: scale(50),
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
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

export default EditPhotoScreen;

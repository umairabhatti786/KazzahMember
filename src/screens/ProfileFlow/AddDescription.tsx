import React, {useState} from 'react';
import {Screen, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getSelectedMediaDetails,
  uploadMedia,
} from 'reducers/updateProfileReducer';
import {categorySelector} from 'reducers/categoryReducer';
import {useToast} from 'react-native-toast-notifications';
import {fomateDateTime} from 'services/common';

const schema = yup.object().shape({
  description: yup.string().required('description is required'),
});

const AddDescription = (props: any) => {
  const {colors} = useTheme();

  const {locationData} = props?.route?.params?.locationData;
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState();
  const dispatch = useDispatch();
  const mediaDetails = useSelector(getSelectedMediaDetails);
  const getCategoryFromStore = useSelector(categorySelector);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState('');

  const toast = useToast();
  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const submit = (form: any) => {
    setLoading(true);
    const arr = mediaDetails?.media.fileName.split('.');
    arr.reverse();
    let tags = {
      label: mediaDetails?.tags[0]?.label,
      value: mediaDetails?.tags[0]?.value,
    };
    const file = {
      uri: mediaDetails?.media.uri,
      type: mediaDetails?.media.type,
      // : `image/${arr[0]}`,
      name: mediaDetails?.media?.fileName,
    };
    const data = {
      location: locationData?.location ? locationData?.location : '',
      latitude: locationData?.latitude ? locationData?.latitude : '',
      longitude: locationData?.longitude ? locationData?.longitude : '',
      tags: JSON.stringify(tags),
      caption: form.description,
      isPrivate: 0,
      dateTime: fomateDateTime(new Date()),
      type: mediaDetails?.media.type.includes('video') ? 'video' : 'image',
      file: file,
    };
    dispatch(uploadMedia(data))
      .unwrap()
      .then(originalPromiseResult => {
        toast.show(
          file.type.includes('video' || 'Video')
            ? 'Movie has been added.'
            : 'Photo has been added.',
          {
            type: 'success_custom',
            placement: 'bottom',
            duration: 4000,
            animationType: 'slide-in',
          },
        );
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
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }>
          <BackButtonHeader showPages={false} showCancel={true} />

          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <Title title={'Add description'} />

            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput
                onChange={setDescription}
                control={control}
                name={'description'}
                label="Description"
              />
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              onPress={handleSubmit(submit)}
              loading={loading}
              disabled={description.length == 0}
              label={'Add to team'}
            />

            <View height={verticalScale(50)} />
          </View>
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
  });

export default AddDescription;

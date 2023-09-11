import React, {useEffect, useState} from 'react';
import {View, Screen} from 'ui';
import * as yup from 'yup';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import TextInput from 'newComponents/TextInput';
import PhoneInput from 'newComponents/PhoneInput';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {authSelector, logIn} from 'reducers/authReducer';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {updateProfile} from 'reducers/updateProfileReducer';
import qs from 'qs';
import {useToast} from 'react-native-toast-notifications';

const schema = yup.object().shape({
  mobileNo: yup
    .string()
    .min(10, 'Mobile number should be at least 10 digits')
    .max(10, 'Mobile number should be at most 10 digits')
    .required('Mobile number is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  Username: yup
    .string()
    .required('UserName is required')
    .max(25, 'UserName should be less than 25 characters'),
  email: yup.string().email('Email is not valid'),
});

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const toast = useToast();
  const authState = useSelector(authSelector);

  const [country, setCountry] = useState();
  const {colors} = useTheme();
  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue('mobileNo', authState?.currentUser?.mobileNo?.slice(-10));
    setValue('firstName', authState?.currentUser?.firstName);
    setValue('lastName', authState?.currentUser?.lastName);
    setValue('bio', authState?.currentUser?.bio);
    setValue(
      'email',
      authState?.currentUser?.email ? authState?.currentUser?.email : '',
    );
    setValue('Username', authState?.currentUser?.username);
    setValue(
      'countryCode',
      ` ${
        authState?.currentUser?.country
      } (${authState?.currentUser?.mobileNo.slice(
        0,
        authState?.currentUser?.mobileNo.length - 10,
      )})`,
    );
  }, []);

  const submit = (form: any) => {
    // console.log('formData', `+${country.callingCode[0]}${form.mobileNo}`);

    const data = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      username: form?.Username,
      email: form?.email,
      bio: form?.bio,
    };

    console.log('datatatata', data);

    dispatch(updateProfile(qs.stringify(data)))
      .unwrap()
      .then(originalPromiseResult => {
        toast.show(originalPromiseResult.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        let userProfile = {...originalPromiseResult?.data};
        userProfile['token'] = authState.currentUser.token;
        dispatch(logIn(userProfile));

        console.log('originalPromiseResult?.data', originalPromiseResult?.data);

        navigation.navigate('UserProfile');
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
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}
    >
      <BackButtonHeader
        onPressSave={handleSubmit(submit)}
        showSave={true}
        showPages={false}
      />
      <KeyboardAwareScrollView
        // enableOnAndroid={true}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={10}
        extraHeight={250}
        resetScrollToCoords={{x: 0, y: 0}}
      >
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}
        >
          <Title title="Profile" />

          <View style={{alignItems: 'center'}}>
            <View height={scale(5)} />
            <TextInput
              control={control}
              name={'firstName'}
              label="First Name"
            />
            <View style={{height: scale(5)}} />
            <TextInput control={control} name={'lastName'} label="Last Name" />
            <View height={scale(5)} />
            <TextInput
              maxLength={25}
              control={control}
              name="Username"
              label="Username"
            />
            <View height={scale(5)} />
            {/* <PhoneInput onSelect={setCountry} /> */}
            <TextInput
              disabled={true}
              control={control}
              name="countryCode"
              label="Country / Region"
              keyboardType="number-pad"
              // maxLength={25}
            />
            <View height={scale(10)} />
            <TextInput
              disabled={true}
              control={control}
              name="mobileNo"
              label="Mobile number"
              keyboardType="number-pad"
              maxLength={10}
            />
            <View height={scale(5)} />
            <TextInput
              control={control}
              name="email"
              label="Email address (optional)"
            />
            <View height={scale(5)} />
            <TextInput
              multiline={true}
              control={control}
              name="bio"
              label="Add a bio"
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

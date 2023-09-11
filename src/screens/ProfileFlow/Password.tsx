import React, {useState} from 'react';
import {View, Screen} from 'ui';
import * as yup from 'yup';
import {scale} from 'react-native-size-matters';
import {ScrollView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import TextInput from 'newComponents/TextInput';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import qs from 'qs';
import {updatePassword, updateProfile} from 'reducers/updateProfileReducer';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('CurrentPassword is required')
    .min(8, 'Password too short')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/,
      'Must contain at least one special character',
    ),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(8, 'Password too short')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/,
      'Must contain at least one special character',
    ),
  newPasswordConfirmation: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export const Password = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [country, setCountry] = useState();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toast = useToast();
  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = async (form: any) => {
    const data = {
      password: form?.password,
      newPassword: form?.newPassword,
      newPasswordConfirmation: form?.newPasswordConfirmation,
    };

    dispatch(updatePassword(qs.stringify(data)))
      .unwrap()
      .then(originalPromiseResult => {
        toast.show(originalPromiseResult.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        // let userProfile = {...originalPromiseResult?.data};
        // userProfile['token'] = authState.currentUser.token;
        // dispatch(logIn(userProfile));

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
  const {colors} = useTheme();

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <BackButtonHeader
        saveColor={
          currentPassword && newPassword && confirmPassword
            ? colors.black
            : colors.silverChalice
        }
        onPressSave={handleSubmit(submit)}
        showSave={true}
        showPages={false}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={10}
        extraHeight={250}
        resetScrollToCoords={{x: 0, y: 0}}>
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          <Title title="Password" />

          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View height={scale(5)} />

            <View height={scale(5)} />
            <TextInput
              inputType={'password'}
              control={control}
              name="password"
              label="Current password"
              onChange={text => {
                setCurrentPassword(text);
              }}
            />
            <View height={scale(5)} />
            <TextInput
              inputType={'password'}
              control={control}
              name="newPassword"
              label="New password"
              onChange={text => {
                setNewPassword(text);
              }}
            />
            <View height={scale(5)} />
            <TextInput
              inputType={'password'}
              control={control}
              name="newPasswordConfirmation"
              label="Confirm new password"
              onChange={text => {
                setConfirmPassword(text);
              }}
            />
          </ScrollView>
        </Wrapper>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

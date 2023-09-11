import React, {useState} from 'react';
import {View, Screen} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {logIn} from 'reducers/authReducer';
import {useDispatch} from 'react-redux';
import {setToken} from 'core/Auth/utils';
import {Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import PhoneInput from 'newComponents/PhoneInput';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import services from 'services';
import {useToast} from 'react-native-toast-notifications';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type FormData = {
  email: string;
  password: string;
};
const schema = yup.object().shape({
  username: yup
    .string()
    .min(10, 'Mobile number should be at least 10 digits')
    .max(10, 'Mobile number should be at most 10 digits')
    .required('Mobile number is required'),
  password: yup.string().required('Password is required'),
});

export const Login = props => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [country, setCountry] = useState();

  const loginFn = async () => {
    const res = await services.getProfile();
    let profile = res.data.data as any;
    dispatch(logIn(profile));
    let body = {
      modelId: profile.id,
      modelType: 'client',
      deviceType: Platform.OS,
      deviceToken: await messaging().getToken(),
    };
    await services.userDevices(body);
  };

  const onSubmit = async (form?: any) => {
    try {
      form.username = `+${country?.callingCode ? country?.callingCode : '1'}${
        form.username
      }`;
      form['grant_type'] = 'password';
      form['client_id'] = '4';
      form['client_secret'] = '5C0cHh0VItyB7ogrOMxbcmpr8LFZ15PNs0gdjxmO';

      const res = await services.login(form);

      if (res.status == 200) {
        setToken({
          access: res.data.access_token,
          refresh: res.data.refresh_token,
        });
        toast.show('Login Successfully', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        loginFn();
      }
    } catch (error) {
      let errorText = 'Error';

      if (error.response?.data?.error) {
        errorText = error.response.data.error;
      } else {
        errorText = error.response.data.data.username[0];
      }

      toast.show(errorText, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };
  const {colors} = useTheme();

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <KeyboardAwareScrollView>
        <BackButtonHeader showPages={false} />
        <Wrapper
          animation="fadeInUp"
          style={{
            height: '100%',
          }}>
          <Title title="Sign in" />

          <View style={{alignItems: 'center', flex: 1}}>
            <PhoneInput onSelect={setCountry} />
            <View height={scale(10)} />
            <TextInput
              control={control}
              name="username"
              label="Mobile number"
              keyboardType="number-pad"
              returnKeyType="done"

              maxLength={10}
            />
            <TextInput
              inputType={'password'}
              control={control}
              name="password"
              label="Password"
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        enabled={true}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        behavior={Platform.OS === 'ios' ? 'height' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-10) : responsiveHeight(-100)
        }>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            marginTop:
              Platform.OS == 'ios' ? verticalScale(40) : verticalScale(100),
          }}>
          <Button onPress={handleSubmit(onSubmit)} label={'Continue'} />
          <Button
            variant="secondary"
            onPress={() => props.navigation.navigate('ForgotPassword')}
            label={'Forgot Password ?'}
          />
          {Platform.OS === 'ios' ? (
            <View height={verticalScale(25)} />
          ) : (
            <View style={{marginTop: -20}} />
          )}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

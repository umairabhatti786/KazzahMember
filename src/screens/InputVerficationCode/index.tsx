import React, {useEffect} from 'react';
import {Text, View, Screen, Pressable, theme} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useMutationKazzah} from 'api';
import URLS from 'api/Urls';
import {authSelector} from 'reducers/authReducer';
import {useSelector} from 'react-redux';
import BackIcon from 'assets/BackIcon.svg';
import {useTheme} from '@react-navigation/native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import OtpInput from 'newComponents/OtpInput';
import {ResendCode} from 'services/profile';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Wrapper} from 'newComponents/wrappers';
import BackButtonHeader from 'newComponents/BackButtonHeader';

interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;

const schema = yup.object().shape({
  code: yup.string().required('Code is required'),
});

const InputVerificationCode: React.FC<Props> = props => {
  const isSignUp = props?.route?.params?.isSignUp;
  const token = props?.route?.params?.token;

  const isForgot = props?.route?.params?.isForgot;

  const {colors} = useTheme();

  const {handleSubmit, control, setError} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  let authState = useSelector(authSelector);
  const {error, isLoading, isSuccess, mutateAsync, data} = useMutationKazzah(
    isForgot ? URLS.VERIFY_RESET_CODE : URLS.VERIFY_CODE,
    authState.currentUser.token,
  );

  useEffect(() => {
    if (error) {
      setError('code', {
        type: 'value',
        message: 'Code is invalid',
      });
    }

    if (isSuccess) {
      if (isSignUp) {
        props.navigation.navigate('Profile');
        return;
      }
      if (isForgot) {
        props.navigation.navigate('ResetPassword', {
          resetToken: data.data.data.resetToken,
        });
        return;
      }
      props.navigation.navigate('Profile');
    }
  }, [error, isLoading, isSuccess, data]);

  const getFormData = (object: any) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());

  const submit = async (data: any) => {
    data['mobileNo'] = token;

    const formData = getFormData(data);
    await mutateAsync(formData);
  };

  const handleResendCode = async () => {
    try {
      await ResendCode();
    } catch (error) {
      console.log(
        '🚀 ~ file: index.tsx:50 ~ handleResendCode ~ error:',
        JSON.stringify(error.response.data, null, 2),
      );
    }
  };

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAwareScrollView extraScrollHeight={-100}>
          {/* <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'height' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(12)
          }> */}
          <View height={scale(10)} />
          <BackButtonHeader showPages={false} showPages={false} />

          {/* <Pressable onPress={() => props.navigation.goBack()}>
              <BackIcon width={scale(20)} height={scale(15)} />
            </Pressable> */}
          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <View height={scale(50)} />
            <View style={{marginHorizontal: '6%'}}>
              <Text style={[textStyle.h1, {color: colors.black}]}>
                Confirm number
              </Text>
              <View height={scale(5)} />

              <Text style={[textStyle.b3, {color: colors.black}]}>
                Please enter the one-time verification code.
              </Text>
            </View>

            <View style={{flex: 1}}>
              <View height={scale(30)} />
              <View style={{alignItems: 'center'}}>
                <OtpInput control={control} name="code" />
              </View>
            </View>
          </Wrapper>
        </KeyboardAwareScrollView>

        <KeyboardAvoidingView
          enabled={true}
          style={{
            flex: 1,
            backgroundColor: colors.background,
            marginTop: verticalScale(60),
          }}
          behavior={Platform.OS === 'ios' ? 'height' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios'
              ? responsiveHeight(-10)
              : responsiveHeight(-100)
          }>
          <View
            style={{
              alignItems: 'center',
              marginTop:
                Platform.OS == 'ios' ? verticalScale(60) : verticalScale(100),
            }}>
            <Button onPress={handleSubmit(submit)} label={'Verify'} />
            <Button
              variant="secondary"
              onPress={handleResendCode}
              label={'Send again'}
            />
            {Platform.OS === 'ios' ? (
              <View height={verticalScale(50)} />
            ) : (
              <></>
            )}
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default InputVerificationCode;

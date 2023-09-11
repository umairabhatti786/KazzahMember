import React from 'react';
import {Text, View, Screen, Pressable, theme} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import OtpInput from 'newComponents/OtpInput';
import services from 'services';
import {Title} from 'newComponents/TextComponents';
import {Wrapper} from 'newComponents/wrappers';
import {useDispatch} from 'react-redux';
import {logIn} from 'reducers/authReducer';
import {useSelector} from 'react-redux';
import {getSignUpProfile} from 'reducers/signUpReducer';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'VerifyMobileNumber'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'VerifyMobileNumber'>;

const schema = yup.object().shape({
  code: yup.string().required('Code is required'),
});

const VerifyMobileNumber: React.FC<Props> = props => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const toast = useToast();
  const isFromForgot = props.route.params?.from == 'ForgotPassword';
  const mobileNo = props.route.params?.mobileNo;

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const submit = async (data: any) => {
    const res = await services.verifyCode(data);

    if (res.data.success) {
      navigation.navigate('SettingUp');
    }
  };

  const submitForgot = async (data: any) => {
    try {
      data['mobileNo'] = mobileNo;
      const res = await services.verifyResetPasswordCode(data);

      if (res.data.success) {
        toast.show('User code verified', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        props.navigation.navigate('ResetPassword', {
          resetToken: res.data.data.resetToken,
        });
      }
    } catch (error) {
      toast.show(error?.response?.data?.data?.error, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };

  const handleResendCode = async () => {
    try {
      await services.resendCode();
    } catch (error) {
      console.log('🚀 ~ file: index.tsx:65 ~ handleResendCode ~ error:', error);
    }
  };

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAwareScrollView extraScrollHeight={-100}>
          {/* <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(2) : responsiveHeight(12)
          }> */}
          <View height={scale(10)} />

          <BackButtonHeader showPages={false} current="3" />

          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <View height={scale(50)} />
            <Title title={'Confirm number'} />

            <View style={{marginHorizontal: '6%'}}>
              <View height={scale(5)} />
              <Text style={[textStyle.b3, {color: colors.black}]}>
                Please enter the one-time verification code.
              </Text>
            </View>
            <View height={scale(20)} />
            <View style={{alignItems: 'center'}}>
              <OtpInput control={control} name="code" />
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
              : responsiveHeight(100)
          }>
          <View
            style={{
              alignItems: 'center',
              marginTop:
                Platform.OS == 'ios' ? verticalScale(60) : verticalScale(90),
            }}>
            <Button
              onPress={handleSubmit(isFromForgot ? submitForgot : submit)}
              label={'Verify'}
            />
            <Button
              variant="secondary"
              onPress={handleResendCode}
              label={'Send again'}
            />

            {/* {Platform.OS === 'ios' ? (
              <View height={verticalScale(50)} />
            ) : (
              <></>
            )} */}
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default VerifyMobileNumber;

import React, {useEffect, useState} from 'react';
import {Pressable, Screen, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useMutationKazzah} from 'api';
import URLS from 'api/Urls';
import SimpleToast from 'react-native-simple-toast';
import Button from 'newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import BackArrow from 'assets/BackArrow.svg';
import {RouteProp, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import PhoneInput from 'newComponents/PhoneInput';
import TextInput from 'newComponents/TextInput';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {Title} from 'newComponents/TextComponents';
import {Wrapper} from 'newComponents/wrappers';
import services from 'services';
import {useToast} from 'react-native-toast-notifications';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
  mobileNo: yup
    .string()
    .required('Please Enter Phone Number')
    .min(10, 'Mobile number must be at least 10 digits'),
});

interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPassword: React.FC<Props> = ({navigation}) => {
  const toast = useToast();
  const [country, setCountry] = useState();

  const {handleSubmit, control, setError, watch, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = async (form: any) => {
    try {
      form.mobileNo = `+${country?.callingCode ? country?.callingCode : '1'}${
        form.mobileNo
      }`;

      const res = await services.postForgotPassword(form);
      const {data, success} = res.data;
      if (success) {
        console.log('firstttt', res.data);
        toast.show(res.data.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        navigation.navigate('VerifyMobileNumber', {
          from: 'ForgotPassword',
          mobileNo: form.mobileNo,
        });
      }
    } catch (error) {
      toast.show(error.response.data.message, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAwareScrollView extraScrollHeight={-100}>
          <BackButtonHeader showPages={false} />

          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}
          >
            <Title
              title={'Forgot password?'}
              description="Confirm your phone number and we’ll send you instructions."
            />

            <View style={{alignItems: 'center'}}>
              <PhoneInput onSelect={setCountry} />

              <View height={scale(10)} />
              <TextInput
                control={control}
                name="mobileNo"
                label="Mobile number"
                keyboardType="number-pad"
                returnKeyType="done"

                maxLength={10}
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
            Platform.OS === 'ios'
              ? responsiveHeight(-10)
              : responsiveHeight(-100)
          }
        >
          <View
            style={{
              alignItems: 'center',
              marginTop:
                Platform.OS == 'ios' ? verticalScale(60) : verticalScale(140),
            }}
          >
            <Button onPress={handleSubmit(submit)} label={'Send code'} />
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

export default ForgotPassword;

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

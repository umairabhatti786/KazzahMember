import React, {useEffect, useState} from 'react';
import {Screen, Text, View, Pressable} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getSignupSetup, setProfile} from 'reducers/authReducer';
import SimpleToast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import BackArrow from 'assets/BackArrow.svg';
import textStyle from 'theme/typoGraphy';
import TextInput from 'newComponents/TextInput';
import Button from 'newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {getSignUpProfile, setPassword} from 'reducers/signUpReducer';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import {Wrapper} from 'newComponents/wrappers';
import services from 'services';
import {useToast} from 'react-native-toast-notifications';
import {setToken} from 'core/Auth/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PasswordValidations from 'newComponents/PasswordValidations';
import { checkPasswordValidate } from 'utils';

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  customerType: yup.string(),
});



interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'AddPassword'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'AddPassword'>;

const AddPassword: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [inputValue,setInputValue]=useState("")
  
  const signUpProfile = useSelector(getSignUpProfile);

  const {handleSubmit, control,getValues} = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const submit = async (data: any) => {
    const validateResponse=checkPasswordValidate(inputValue)
    console.log("InoputvalueRes",validateResponse)
    if(validateResponse){

      try {
      dispatch(setPassword(data));
      const profile = {
        ...signUpProfile,
        password: data.password,
        password_confirmation: data.password_confirmation,
        deviceType: Platform.OS,
        deviceToken: await messaging().getToken(),
      };

      const res = await services.register(profile);
      if (res.data.success) {
        toast.show(res.data.data.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        setToken({
          refresh: res.data.data.accessToken,
          access: res.data.data.accessToken,
        });
        navigation.navigate('VerifyMobileNumber');
      }
    } catch (error) {
      console.log('Server Error,', error?.response);
      let text = 'Server Error, Something went wrong!';

      if (error.response?.data?.data?.message) {
        text = error.response?.data?.data?.message[0];
      } else if (error.response?.data?.message) {
        text = error.response?.data?.message;
      }
      toast.show(text, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }

    }
    
  };
  const {colors} = useTheme();
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAwareScrollView extraScrollHeight={-100}>
          {/* <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: colors.background,
            borderTopEndRadius: 15,
            borderTopStartRadius: 15,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }
        > */}
          <View height={scale(10)} />
          <BackButtonHeader current="3" />
          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <Title title={'Create password'} />

            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput
                inputType={'password'}
                control={control}
                name="password"
                label="Password"
                onChange={(txt:any)=>{
                  setInputValue(txt)
                  console.log("Value",txt)

                }}
              />

              <View style={{height: scale(5)}} />
              <TextInput
                inputType={'password'}
                control={control}
                name="password_confirmation"
                label="Confirm Password"
              />
              
            </View>
            <View style={{paddingHorizontal:"6%",marginTop:verticalScale(5)}} >
              <PasswordValidations  inputValue={inputValue} />


              </View>
          </Wrapper>
        </KeyboardAwareScrollView>
        <KeyboardAvoidingView
          enabled={true}
          style={{
            flex: 1,
            backgroundColor: colors.background,
            marginTop:
              Platform.OS === 'ios' ? verticalScale(60) : verticalScale(-60),
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
                Platform.OS == 'ios' ? verticalScale(20) : verticalScale(120),
            }}>
            <Button onPress={handleSubmit(submit)} label={'Continue'} />
          </View>
          <View marginVertical={'m'}>
            <Text style={[textStyle.b5, textStyle.center]}>
              By creating an account, you agree to our
            </Text>
            <View justifyContent={'center'} flexDirection={'row'}>
              <Text style={[textStyle.b5, textStyle.center]}>
                {' updated '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsAndCondition')}>
                <Text
                  style={[
                    textStyle.b5,
                    textStyle.center,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Terms of Service
                </Text>
              </TouchableOpacity>

              <Text style={[textStyle.b5, textStyle.center]}>{' and '}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text
                  style={[
                    textStyle.b5,
                    textStyle.center,
                    {textDecorationLine: 'underline'},
                  ]}>
                  Privacy Policy.
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {Platform.OS === 'ios' ? <View height={verticalScale(30)} /> : <></>}
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default AddPassword;

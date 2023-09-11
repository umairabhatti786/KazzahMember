import React, {useEffect,useState} from 'react';
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
    .required('Password is required')
    .min(8, 'Password too short')
    .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
    .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
    .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/,
      'Must contain at least one special character',
    ),
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

const ResetPasswords: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [inputValue,setInputValue]=useState("")
  const signUpProfile = useSelector(getSignUpProfile);

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = async (data: any) => {
    const validateResponse=checkPasswordValidate(inputValue)
    if(validateResponse){
      try {
        const body = {
          password: data.password,
          password_confirmation: data.password_confirmation,
          resetToken: route.params?.resetToken,
        };
  
        const res = await services.resetPassword(body);
        if (res.data.success) {
          toast.show('Password updated successfully', {
            type: 'success_custom',
            placement: 'bottom',
            duration: 4000,
            animationType: 'slide-in',
          });
  
          navigation.navigate('Login');
        }
      } catch (error) {
        toast.show(error.response.data.data.message[0], {
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
            <Title title={'Add password'} />

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
          }}
          keyboardVerticalOffset={
            Platform.OS === 'ios'
              ? responsiveHeight(-10)
              : responsiveHeight(-100)
          }
          behavior={Platform.OS === 'ios' ? 'height' : null}>
          <View
            style={{
              alignItems: 'center',
              marginTop:
                Platform.OS == 'ios' ? verticalScale(60) : verticalScale(100),
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

export default ResetPasswords;

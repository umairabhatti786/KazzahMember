import React, {useEffect} from 'react';
import {Screen, Text, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import TextInput from 'newComponents/TextInput';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {useMutationKazzah} from 'api';
import URLS from 'api/Urls';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import BackIcon from 'assets/BackIcon.svg';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'SignUp'>;

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
});

export const ResetPassword: React.FC<Props> = props => {
  const {resetToken} = props.route.params as any;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {handleSubmit, control, setError} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const {error, isLoading, isSuccess, mutateAsync, data} = useMutationKazzah(
    URLS.RESET_PASSWORD,
  );
  useEffect(() => {
    if (error) {
    }

    if (isSuccess) {
      props.navigation.navigate('DoneResetPassword');
    }
  }, [error, isLoading, isSuccess, data]);

  const getFormData = (object: any) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());

  const submit = async (data: any) => {
    data['resetToken'] = resetToken;
    const formData = getFormData(data);
    await mutateAsync(formData);
  };

  return (
    <>
      <Screen backgroundColor={'grey'} edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }>
          <View
            style={{
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={props.navigation.goBack}
              style={styles.BackIcon}>
              <BackIcon width={scale(20)} height={scale(15)} />
            </TouchableOpacity>

            <Text
              style={[textStyle.h1, textStyle.center, {alignSelf: 'center'}]}>
              Please reset your password{' '}
            </Text>
            <View height={verticalScale(10)} />

            <View style={{alignItems: 'center'}}>
              <TextInput
                inputType={'password'}
                control={control}
                name="password"
                label="Password"
              />
              <View height={verticalScale(5)} />
              <TextInput
                inputType={'password'}
                control={control}
                name="password_confirmation"
                label="Confirm Password"
              />
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button onPress={handleSubmit(submit)} label={'Done'} />
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

const makeStyles = (colors: any) =>
  StyleSheet.create({
    BackIcon: {
      width: scale(50),
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    KeyboardAvoiding: {
      flex: 1,
      backgroundColor: colors.background,
      borderTopEndRadius: 15,
      borderTopStartRadius: 15,
    },
  });

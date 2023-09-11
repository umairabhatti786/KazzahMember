import React, {useEffect} from 'react';
import {Pressable, Screen, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useMutationKazzah} from 'api';
import URLS from 'api/Urls';
import SimpleToast from 'react-native-simple-toast';
import Button from 'newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import BackArrow from 'assets/BackArrow.svg';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import PhoneInput from 'newComponents/PhoneInput';
import TextInput from 'newComponents/TextInput';

const schema = yup.object().shape({
  mobileNo: yup.string().required('Please Enter Phone Number'),
});

export const InputPhoneNumber = props => {
  const {handleSubmit, control, setError, watch, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const {error, isLoading, isSuccess, mutateAsync, data} = useMutationKazzah(
    URLS.FORGOT_PASSWORD,
  );

  useEffect(() => {
    if (error) {
      const errorList = error.response.data.data as any;

      setError('mobileNo', {
        type: 'value',
        message: errorList?.phone_number,
      });
      SimpleToast.show('Mobile Number not found');
    }

    if (isSuccess) {
      let profile = watch() as any;

      props.navigation.navigate('InputVerificationCode', {
        isForgot: true,
        token: profile.mobileNo,
      });
    }
  }, [error, isSuccess]);

  const getFormData = (object: any) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());

  const submit = async (data: any) => {
    const formData = getFormData(data);
    await mutateAsync(formData);
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
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
        >
          <View height={scale(10)} />
          <View
            flexDirection={'row'}
            justifyContent={'space-between'}
            paddingHorizontal={'s'}
            paddingRight={'xxl'}
          >
            <Pressable flex={1} onPress={() => props.navigation.goBack()}>
              <BackArrow
                style={{alignSelf: 'flex-start', marginLeft: scale(10)}}
                width={scale(20)}
                height={scale(15)}
              />
            </Pressable>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View height={scale(50)} />
            <Text
              style={[
                textStyle.h1,
                textStyle.center,
                {color: colors.black, width: '70%'},
              ]}
            >
              Forgot password
            </Text>
            <View height={verticalScale(10)} />
            <Text
              style={[
                textStyle.b4,
                textStyle.center,
                {width: '55%', alignSelf: 'center', color: colors.black},
              ]}
            >
              Confirm your phone number and we’ll send you instructions.
            </Text>
            <View height={scale(10)} />
            <PhoneInput
              onSelect={country => {
                setValue('mobileNo', `+${country.callingCode}`);
              }}
            />
            <View height={scale(10)} />
            <TextInput
              defaultValue={`+1`}
              control={control}
              name="mobileNo"
              label="Mobile number"
              keyboardType="number-pad"
            />
          </View>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Button onPress={handleSubmit(submit)} label={'Send code'} />
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

import {Screen, Text, View} from 'ui';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {useToast} from 'react-native-toast-notifications';
import {
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import textStyle from 'theme/typoGraphy';
import TextInput from 'newComponents/TextInput';
import PhoneInput from 'newComponents/PhoneInput';
import Button from 'newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {setCountryName, setMobileNumber} from 'reducers/signUpReducer';
import {Wrapper} from 'newComponents/wrappers';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import services from 'services';

const schema = yup.object().shape({
  mobileNo: yup
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must be at most 10 digits')
    .required('Mobile number is required'),
});

interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'AddMobileNumber'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'AddMobileNumber'>;

const AddMobileNumber: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const windowHeight = Dimensions.get('window').height;

  const [country, setCountry] = useState({
    callingCode: '1',
    name: 'United States',
  });

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submit = async (form: any) => {
    try {
      const res = await services.checkMobileNumber(
        `+${country.callingCode}${form.mobileNo}`,
      );
      console.log('DataSuccess', res.data);
      if (res.data.success) {
        dispatch(setMobileNumber(`+${country?.callingCode}${form.mobileNo}`));
        dispatch(setCountryName(`${country?.name}`));

        navigation.navigate('AddName');
      }
    } catch (error) {
      let text = 'Server Error, Something went wrong!';

      if (error.response?.data?.message) {
        text = error.response?.data?.message;

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
    <Screen edges={['right', 'top', 'left']}>
      <KeyboardAwareScrollView>
        <BackButtonHeader />
        <Wrapper
          animation="fadeInUp"
          style={{
            height: '100%',
          }}>
          <Title title={'Add mobile number'} />
          <View style={{alignItems: 'center', flex: 1}}>
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
          Platform.OS === 'ios' ? responsiveHeight(-10) : responsiveHeight(-80)
        }>
        <View
          style={{
            alignItems: 'center',
            marginTop:
              Platform.OS == 'ios' ? verticalScale(120) : windowHeight * 0.2,
          }}>
          <Button onPress={handleSubmit(submit)} label={'Continue'} />
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

export default AddMobileNumber;

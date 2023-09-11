import React, {useEffect} from 'react';
import {Screen, Text, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import AppBackHeader from 'newComponents/AppBackHeader';
import StateInput from 'newComponents/StateInput';
import {setAddress} from 'reducers/addProReducer';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import textStyle from 'theme/typoGraphy';
import {useSelector} from 'react-redux';
import {authSelector, logIn} from 'reducers/authReducer';
import {useToast} from 'react-native-toast-notifications';
import {updateProfile} from 'reducers/updateProfileReducer';
import qs from 'qs';

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  city: yup.string().required('Town is required'),
  state: yup.string().required('State is required'),
  zip: yup
    .string()
    .required('Zip Code is required')
    .min(5, 'Invalid Zip Code')
    .max(5, 'Invalid Zip Code'),
});

const Address = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const toast = useToast();
  const authState = useSelector(authSelector);

  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue(
      'address',
      authState?.currentUser?.address != null
        ? authState?.currentUser?.address
        : '',
    );
    setValue(
      'city',
      authState?.currentUser?.city != null ? authState?.currentUser?.city : '',
    );
    setValue(
      'zip',
      authState?.currentUser?.zip != null ? authState?.currentUser?.zip : '',
    );
    setValue(
      'state',
      authState?.currentUser?.state != null
        ? authState?.currentUser?.state
        : '',
    );
  }, []);

  const submit = (form: any) => {
    // console.log('formData', `+${country.callingCode[0]}${form.mobileNo}`);

    const data = {
      address: form?.address,
      city: form?.city,
      zip: form?.zip,
      state: form?.state,
    };

    dispatch(updateProfile(qs.stringify(data)))
      .unwrap()
      .then(originalPromiseResult => {
        toast.show(originalPromiseResult.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        let userProfile = {...originalPromiseResult?.data};
        userProfile['token'] = authState.currentUser.token;
        dispatch(logIn(userProfile));

        navigation.navigate('UserProfile');
        // handle result here
      })
      .catch(rejectedValueOrSerializedError => {
        console.log(
          'rejectedValueOrSerializedError',
          rejectedValueOrSerializedError,
        );
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
  const styles = makeStyles(colors);
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }
        >
          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}
          >
            <BackButtonHeader
              onPressSave={handleSubmit(submit)}
              showSave={true}
              showPages={false}
            />
            <Title title="Address" />
            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput control={control} name={'address'} label="Address" />
              <View height={scale(5)} />
              <TextInput control={control} name={'city'} label="Town" />
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                }}
              >
                <View style={{height: verticalScale(75)}}>
                  <StateInput
                    control={control}
                    name={'state'}
                    onSelect={value => {
                      setValue('state', value);
                    }}
                  />
                </View>

                <TextInput
                  maxLength={5}
                  width={150}
                  control={control}
                  name={'zip'}
                  keyboardType="number-pad"
                  label="Zip Code"
                />
              </View>
              <View height={'20%'} />
              <Text
                style={[
                  textStyle.b5,
                  {
                    color: colors.black,
                    textAlign: 'left',
                    fontSize: scale(14),
                    width: '75%',
                  },
                ]}
              >
                For Best search results and providing home service pros with
                address for service please update your address. Kazzah does not
                share or sell your complete home address at any time.
              </Text>
            </View>
          </Wrapper>
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

export default Address;

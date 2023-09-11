import React, {useEffect} from 'react';
import {Screen, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import AppBackHeader from 'newComponents/AppBackHeader';
import StateInput from 'newComponents/StateInput';
import {setAddress} from 'reducers/addProReducer';
import {authSelector} from 'reducers/authReducer';
import {useSelector} from 'react-redux';

const schema = yup.object().shape({
  street: yup.string().required('Address is required'),
  city: yup.string().required('Town is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip Code is required'),
});

const AddAddress: React.FC<Props> = ({navigation}) => {
  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const authState = useSelector(authSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setValue(
      'state',
      authState?.currentUser?.state ? authState?.currentUser?.state : '',
    );
  }, []);

  const submit = async (form: any) => {
    dispatch(setAddress(form));
    navigation.navigate('ChooseService');
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
          }>
          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <AppBackHeader navigation={navigation} label="Add address" />
            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput control={control} name={'street'} label="Address" />
              <View height={scale(5)} />
              <TextInput control={control} name={'city'} label="City" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <StateInput
                  onSelect={value => {
                    setValue('state', value);
                  }}
                />

                <TextInput
                  maxLength={5}
                  width={150}
                  control={control}
                  name={'zip'}
                  keyboardType="number-pad"
                  label="Zip Code"
                />
              </View>
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button onPress={handleSubmit(submit)} label={'Continue'} />
            {Platform.OS === 'ios' ? (
              <View height={verticalScale(40)} />
            ) : (
              <View height={verticalScale(10)} />
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

export default AddAddress;

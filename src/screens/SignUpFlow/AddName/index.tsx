import React from 'react';
import {Screen, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import {setName} from 'reducers/signUpReducer';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});
interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'AddName'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'AddName'>;

const AddName: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const submit = async (form: any) => {
    dispatch(setName(form));
    navigation.navigate('AddPassword');
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAwareScrollView extraScrollHeight={-150}>
          {/* <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }> */}
          <BackButtonHeader current="2" />

          <Wrapper
            animation="fadeInUp"
            style={{
              flex: 1,
            }}>
            <Title title={'Add name'} />

            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput
                control={control}
                name={'firstName'}
                label="First Name"
              />
              <View style={{height: scale(5)}} />
              <TextInput
                control={control}
                name={'lastName'}
                label="Last Name"
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
          }>
          <View
            style={{
              alignItems: 'center',
              marginTop:
                Platform.OS == 'ios' ? verticalScale(80) : verticalScale(140),
            }}>
            <Button onPress={handleSubmit(submit)} label={'Continue'} />
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

export default AddName;

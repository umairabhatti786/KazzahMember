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
import {setName} from 'reducers/signUpReducer';
import AppBackHeader from 'newComponents/AppBackHeader';
import {setBusinessName} from 'reducers/addProReducer';
const schema = yup.object().shape({
  businessName: yup.string().required('Business Name is required'),
});
interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'AddBusinessName'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'AddBusinessName'>;

const AddBusinessName: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const submit = async (form: any) => {
    dispatch(setBusinessName(form.businessName));
    navigation.navigate('AddAddress');
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
            <AppBackHeader navigation={navigation} label="Add business name" />

            <View style={{alignItems: 'center'}}>
              <View height={scale(5)} />
              <TextInput
                control={control}
                name={'businessName'}
                label="Business name"
              />
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}
          >
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

export default AddBusinessName;

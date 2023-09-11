import React, {useState} from 'react';
import {Screen, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import BackButtonHeader from '../../../../newComponents/BackButtonHeader';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import {useDispatch} from 'react-redux';
import {setName} from '../../../../reducers/addProReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
});
interface Props {
  route: ScreenRouteProp;
  navigation: ScreenProp;
}
type ScreenProp = StackNavigationProp<AuthStackParamList, 'AddName'>;
type ScreenRouteProp = RouteProp<AuthStackParamList, 'AddName'>;

const AddYourPro: React.FC<Props> = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const submit = async (form: any) => {
    dispatch(setName(form));
    navigation.navigate('AddContactInformation');
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <KeyboardAwareScrollView
        extraScrollHeight={-150}
        contentContainerStyle={{flex: 1}}>
        {/* <KeyboardAvoidingView
        enabled={true}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-3) : responsiveHeight(-100)
        }> */}
        <BackButtonHeader
          showCancel={true}
          showPages={false}
          onCancelPress={() => navigation.navigate('TeamDetails')}
        />
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          <Title title="Add name" />
          <View style={{alignItems: 'center'}}>
            <TextInput
              control={control}
              name={'first_name'}
              label="First Name"
              onChange={txt => {
                setFirstName(txt);
              }}
            />
            <TextInput
              control={control}
              name={'last_name'}
              label="Last Name"
              onChange={txt => {
                setLastName(txt);
              }}
            />
          </View>
        </Wrapper>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView
        enabled={true}
        style={{
          backgroundColor: colors.background,
        }}
        behavior={Platform.OS === 'ios' ? 'height' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-10) : responsiveHeight(-100)
        }>
        <View
          style={{
            alignItems: 'center',
            marginTop:
              Platform.OS == 'ios' ? verticalScale(80) : verticalScale(100),
          }}>
          <Button
            onPress={handleSubmit(submit)}
            disabled={firstName && lastName ? false : true}
            label={'Add Pro'}
          />

          {Platform.OS === 'ios' ? (
            <View height={verticalScale(25)} />
          ) : (
            <View style={{marginTop: 10}} />
          )}
        </View>
      </KeyboardAvoidingView>

      {/* </KeyboardAvoidingView> */}
    </Screen>
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

export default AddYourPro;

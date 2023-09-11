import {Screen, Text, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {Platform, KeyboardAvoidingView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from 'navigation/AuthNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import textStyle from 'theme/typoGraphy';
import TextInput from 'newComponents/TextInput';
import PhoneInput from 'newComponents/PhoneInput';
import Button from 'newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from 'newComponents/wrappers';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';
import {useSelector} from 'react-redux';
import {
  addContact,
  getAddContactsResponse,
  getSelectContact,
  setSelectedContact,
} from 'reducers/contactReducer';
import {useToast} from 'react-native-toast-notifications';
import {setMobileNumber} from 'reducers/addProReducer';
const schema = yup.object().shape({
  mobileNo: yup
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must be at most 10 digits')
    .required('Mobile number is required'),
});

const AddContactMobileNumber = (props: any) => {
  const dispatch = useDispatch();
  const addPro = props?.route?.params?.addPro;
  const {colors} = useTheme();
  const [mobileNum, setMobileNum] = useState('');

  const [country, setCountry] = useState({callingCode: '1'});
  const [invitationModal, setInvitationModal] = useState(false);
  const selectedcontact = useSelector(getSelectContact);

  const toast = useToast();

  const addcontactresponse = useSelector(getAddContactsResponse);
  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (props?.route?.params?.mobileNum) {
      setValue('mobileNo', props?.route?.params?.mobileNum);
      setMobileNum(props?.route?.params?.mobileNum);
    }
  }, []);

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const submit = async (form: any) => {
    const contactDetails = {
      ...selectedcontact,
      mobileNo: `+${country.callingCode}${form.mobileNo}`,
      client_team_id: '',
      fullNumber: `+${country.callingCode}${form.mobileNo}`,
      image: '',
      latitude: '',
      longitude: '',
    };

    if (addPro) {
      dispatch(setSelectedContact(contactDetails));
      props.navigation.navigate('AddContactTeam', {
        addPro: addPro,
        mobileNo: `+${country.callingCode}${form.mobileNo}`,
      });

      return;
    } else {
      dispatch(addContact(contactDetails))
        .unwrap()
        .then(originalPromiseResult => {
          dispatch(
            setMobileNumber({
              mobileNo: '',
            }),
          );
          setInvitationModal(true);

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
    }
  };

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
          }>
          <BackButtonHeader
            showPages={false}
            showCancel={true}
            onCancelPress={() => props.navigation.navigate('Contacts')}
          />
          <Wrapper
            style={{
              flex: 1,
            }}
            animation="fadeInUp">
            <Title title={'Add mobile number'} />

            <View style={{alignItems: 'center'}}>
              <PhoneInput onSelect={setCountry} />
              <View height={scale(10)} />
              <TextInput
                control={control}
                name="mobileNo"
                label="Mobile number"
                keyboardType="number-pad"
                onChange={txt => {
                  setMobileNum(txt);
                  console.log('Number', txt);
                }}
                maxLength={10}
              />
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              onPress={handleSubmit(submit)}
              disabled={mobileNum.length <= 0 ? true : false}
              label={addPro ? 'Continue' : 'Add friend'}
            />
            {Platform.OS === 'ios' ? (
              <View height={verticalScale(50)} />
            ) : (
              <></>
            )}
          </View>
        </KeyboardAvoidingView>
      </Screen>

      <ContactInvitationSheet
        visible={invitationModal}
        onReturnAddAnother={() => {
          props.navigation.navigate('SelectMethod', {addPro: addPro});
          setInvitationModal(false);
        }}
        onReturn={() => {
          props.navigation.navigate('Contacts');
          setInvitationModal(false);
        }}
        setVisible={toggleBottomSheet}
      />
    </>
  );
};

export default AddContactMobileNumber;

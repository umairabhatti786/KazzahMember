import React, {useEffect, useState} from 'react';
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
import {setMobileNumber, setName} from 'reducers/signUpReducer';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {
  addContact,
  getSelectContact,
  setSelectedContact,
} from 'reducers/contactReducer';
import {useSelector} from 'react-redux';
import {getAddPro} from 'reducers/addProReducer';
import {useToast} from 'react-native-toast-notifications';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

const AddContactName = (props: any) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const selectContact = useSelector(getAddPro);
  const [invitationModal, setInvitationModal] = useState(false);

  const toast = useToast();
  console.log('selectContact', selectContact);

  const contactDetails = useSelector(getSelectContact);

  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const addPro = props?.route?.params?.addPro;
  const mobileNum = props?.route?.params?.mobileNum;
  const addFromContact = props?.route?.params?.addFromContact;

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const submit = async (form: any) => {
    if (addFromContact) {
      const contactDetails = {
        firstName: form.firstName,
        lastName: form?.lastName,
        mobileNo: `+${selectContact?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
        client_team_id: '',
        fullNumber: `+${selectContact?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
        image: '',
        latitude: '',
        longitude: '',
      };
      if (addPro) {
        dispatch(setSelectedContact(contactDetails));
        props.navigation.navigate('AddContactTeam', {
          addPro: addPro,
          mobileNo: contactDetails?.mobileNo,
        });
        // props.navigation.navigate('AddContactTeam', {addPro: addPro});
        return;
      } else {
        console.log('contactDetails', contactDetails);
        dispatch(addContact(contactDetails))
          .unwrap()
          .then(originalPromiseResult => {
            dispatch(
              setMobileNumber({
                mobileNo: '',
              }),
            );
            setInvitationModal(true);
          })
          .catch(rejectedValueOrSerializedError => {
            toast.show(rejectedValueOrSerializedError, {
              type: 'error_custom',
              placement: 'bottom',
              duration: 4000,
              animationType: 'slide-in',
            });
          });
      }
    } else {
      const nameDetails = {
        firstName: form.firstName,
        lastName: form.lastName,
      };
      dispatch(setSelectedContact(nameDetails));
      props.navigation.navigate('AddContactMobileNumber', {
        addPro: addPro,
        mobileNum: mobileNum,
      });
    }
  };
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  console.log('contactDetails', contactDetails);
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <KeyboardAvoidingView
          style={styles.KeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
          }>
          <BackButtonHeader
            onCancelPress={() => props.navigation.navigate('Contacts')}
            showPages={false}
            showCancel={true}
          />

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
                onChange={text => {
                  setFirstName(text);
                }}
              />
              <View style={{height: scale(5)}} />
              <TextInput
                control={control}
                name={'lastName'}
                label="Last Name"
                onChange={text => {
                  setLastName(text);
                }}
              />
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Button
              onPress={handleSubmit(submit)}
              disabled={firstName && lastName ? false : true}
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

export default AddContactName;

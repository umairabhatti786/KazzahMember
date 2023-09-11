import React, {useState} from 'react';
import {View, Screen} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import TextInput from 'newComponents/TextInput';
import PhoneInput from 'newComponents/PhoneInput';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../../../newComponents/BackButtonHeader';
import {useDispatch} from 'react-redux';
import {
  getAddPro,
  getChannelId,
  getSelectedServiceId,
  setEmptyAddPro,
  setMobileNumber,
  setSelectedServiceId,
} from '../../../../reducers/addProReducer';
import {useSelector} from 'react-redux';
import {categorySelector} from 'reducers/categoryReducer';
import {useToast} from 'react-native-toast-notifications';
import services from 'services';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';

type FormData = {
  email: string;
  password: string;
};
const schema = yup.object().shape({
  username: yup.string(),
  mobileNo: yup
    .string()
    .required('Mobile number is required')
    .min(10, 'Mobile number must be at least 10 digits'),
});

export const AddContactInformation = (props: any) => {
  const [country, setCountry] = useState({callingCode: '1'});
  const [phoneNum, setPhoneNum] = useState('');
  const teamsFromStore = useSelector(categorySelector);
  const addProState = useSelector(getAddPro);
  const channelId = useSelector(getChannelId);
  const serviceId = useSelector(getSelectedServiceId);
  const [invitationModal, setInvitationModal] = useState(false);

  const toast = useToast();
  const {handleSubmit, control, setValue} = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onAddProContact = async (form: any) => {
    // setInvitationModal(true);

    const proDetail = {
      client_team_id: addProState?.client_team_id,
      first_name: addProState?.first_name,
      last_name: addProState?.last_name,
      mobileNo: `+${country.callingCode}${phoneNum}`,
      serviceId: serviceId,
      image: addProState?.image,
      latitude: addProState?.latitude,
      longitude: addProState?.longitude,
      businessName: addProState?.businessName,
      email: addProState?.email,
      street: addProState?.state,
      city: addProState?.city,
      state: addProState?.state,
      zip: addProState?.zip,
    };

    try {
      const res = await services.createProvider(proDetail);

      if (res.data.success) {
        toast.show('Pro added', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        dispatch(setEmptyAddPro());
        setInvitationModal(true);
      }
    } catch (error) {
      toast.show(error?.response?.data?.message, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const submit = (form: any) => {
    const contactDetail = {
      mobileNo: `+${country.callingCode}${form.mobileNo}`,
    };
    dispatch(setMobileNumber(contactDetail));
    if (serviceId != '') {
      onAddProContact();
    } else {
      props.navigation.navigate('ChooseService');
    }
  };
  const {colors} = useTheme();

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        enabled={true}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-3) : responsiveHeight(-100)
        }>
        <BackButtonHeader
          showCancel={true}
          showPages={false}
          onCancelPress={() => props.navigation.navigate('TeamDetails')}
        />
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          <Title title="Add mobile number" />

          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              height: scale(250),
            }}>
            <PhoneInput onSelect={setCountry} />

            <View height={scale(10)} />
            <TextInput
              maxLength={10}
              control={control}
              name="mobileNo"
              label="Mobile number"
              keyboardType="number-pad"
              onChange={text => {
                setPhoneNum(text);
              }}
            />
          </ScrollView>
        </Wrapper>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button
            onPress={handleSubmit(submit)}
            disabled={phoneNum ? false : true}
            label={'Add Pro'}
          />
          {Platform.OS === 'ios' ? (
            <View height={verticalScale(25)} />
          ) : (
            <View style={{marginTop: 10}} />
          )}
        </View>
      </KeyboardAvoidingView>

      <ContactInvitationSheet
        onReturnAddAnother={() => {
          props?.navigation.navigate('AddProType');

          setInvitationModal(false);
        }}
        isPro={true}
        AddTeam={true}
        visible={invitationModal}
        onReturn={() => {
          props?.navigation.navigate('TeamDetails', {
            data: teamsFromStore.categories.find(
              e => e.id.toString() == channelId,
            ),
          });
          setInvitationModal(false);
          dispatch(setSelectedServiceId(''));
        }}
        setVisible={toggleBottomSheet}
      />
    </Screen>
  );
};

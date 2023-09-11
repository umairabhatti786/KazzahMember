import {Screen, Text, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {Platform, KeyboardAvoidingView} from 'react-native';
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
import {useToast} from 'react-native-toast-notifications';
import {
  getAddPro,
  getChannelId,
  getSelectedServiceId,
  setEmptyAddPro,
  setMobileNumber,
  setSelectedServiceId,
} from 'reducers/addProReducer';
import services from 'services';
import {categorySelector} from 'reducers/categoryReducer';
const schema = yup.object().shape({
  mobileNo: yup
    .string()
    .min(10, 'Mobile number must be at least 10 digits')
    .max(10, 'Mobile number must be at most 10 digits')
    .required('Mobile number is required'),
});

const AddProContactNumber = (props: any) => {
  const dispatch = useDispatch();
  const addPro = props?.route?.params?.addPro;
  const {colors} = useTheme();
  const addProState = useSelector(getAddPro);
  const channelId = useSelector(getChannelId);
  const serviceId = useSelector(getSelectedServiceId);
  const [country, setCountry] = useState({callingCode: '1'});
  const [mobileNum, setMobileNum] = useState({callingCode: '1'});
  const teamsFromStore = useSelector(categorySelector);

  const [invitationModal, setInvitationModal] = useState(false);

  const toast = useToast();

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
  const onAddProContact = async () => {
    // setInvitationModal(true);

    const proDetail = {
      client_team_id: addProState?.client_team_id,
      first_name: addProState?.first_name,
      last_name: addProState?.last_name,
      mobileNo: `+${country.callingCode}${mobileNum}`,
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
  const submit = async (form: any) => {
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
          <BackButtonHeader
            showPages={false}
            showCancel={true}
            onCancelPress={() => props.navigation.navigate('TeamDetails')}
          />
          <Wrapper
            style={{
              flex: 1,
            }}
            animation="fadeInUp"
          >
            <Title title={'Add mobile number'} />

            <View style={{alignItems: 'center'}}>
              <PhoneInput onSelect={setCountry} />
              <View height={scale(10)} />
              <TextInput
                control={control}
                name="mobileNo"
                label="Mobile number"
                keyboardType="number-pad"
                onChange={text => {
                  setMobileNum(text);
                }}
                maxLength={10}
              />
            </View>
          </Wrapper>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Button
              onPress={handleSubmit(submit)}
              disabled={mobileNum ? false : true}
              label={'Add Pro'}
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
    </>
  );
};

export default AddProContactNumber;

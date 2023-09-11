import {Screen, View} from 'ui';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import AppBackHeader from 'newComponents/AppBackHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import ContactForm from './ContactForm';
import Button from 'newComponents/Button';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../../../newComponents/BackButtonHeader';
import {useSelector} from 'react-redux';
import {
  getAddPro,
  getChannelId,
  getSelectedServiceId,
  setEmptyAddPro,
  setSelectedServiceId,
} from 'reducers/addProReducer';
import services from 'services';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';
import {categorySelector} from 'reducers/categoryReducer';

const AddContacts = (props: any) => {
  const {colors} = useTheme();
  const teamsFromStore = useSelector(categorySelector);

  const styles = makeStyles(colors);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addProState = useSelector(getAddPro);
  const channelId = useSelector(getChannelId);
  const serviceId = useSelector(getSelectedServiceId);
  const toast = useToast();
  const [invitationModal, setInvitationModal] = useState(false);

  const createContactNoCode = () => {
    if (addProState) {
      const formatedNumber = addProState?.mobileNo.replace(
        /[- #*;(),.<>\{\}\[\]\\\/]/gi,
        '',
      );
      props.navigation.navigate('AddProContactNumber', {
        mobileNum: formatedNumber.substr(formatedNumber.length - 10),
      });
    }
  };

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const onAddProContact = async () => {
    // setInvitationModal(true);

    const proDetail = {
      client_team_id: addProState?.client_team_id,
      first_name: addProState?.first_name,
      last_name: addProState?.last_name,
      mobileNo: `+${addProState?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
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

  const onAddContact = () => {
    // console.log('addProStateaddProState', JSON.stringify(channelId, null, 2));
    // console.log('addProStateaddProState', JSON.stringify(serviceId, null, 2));

    if (addProState?.mobileNo.includes('+')) {
      if (serviceId != '') {
        onAddProContact();
      } else {
        props.navigation.navigate('ChooseService');
      }
    } else {
      createContactNoCode();
    }
  };
  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}>
        <BackButtonHeader showPages={false} />
        <Title title="Choose contact" />
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '6%'}}>
          <ContactForm />
        </View>
      </View>

      <View style={styles.proBtn}>
        <Button
          disabled={addProState.mobileNo != '' ? false : true}
          label="Add Pro"
          width={'90%'}
          onPress={onAddContact}
        />
      </View>
      <ContactInvitationSheet
        onReturnAddAnother={() => {
          navigation.navigate('AddProType');

          setInvitationModal(false);
        }}
        isPro={true}
        AddTeam={true}
        visible={invitationModal}
        onReturn={() => {
          navigation.navigate('TeamDetails', {
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

export default AddContacts;

const makeStyles = () =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });

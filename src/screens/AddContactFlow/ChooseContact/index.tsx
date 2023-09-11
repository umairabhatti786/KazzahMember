import React, {useState, useMemo, useEffect} from 'react';
import {Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import AppInnerHeader from 'newComponents/AppHeader';
import {Title} from 'newComponents/TextComponents';
import CustomSearch from 'newComponents/CustomSearch';
import {CalendarView} from 'screens/CalendarView';
import AddAppointment from 'newComponents/AddAppointment';
import AppBackHeader from 'newComponents/AppBackHeader';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import MethodContainer from '../SelectMethod/MethodContainer';
import ContactItem from 'newComponents/ContactItem';
import AlphabetSort from '../../../../src/assets/AlphabetSort.svg';
import Button from 'newComponents/Button';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';
import Contacts from 'react-native-contacts';
import {PERMISSIONS, check} from 'react-native-permissions';
import {formateNumber} from 'services/common';
import {addContact, setSelectedContact} from 'reducers/contactReducer';
import {useToast} from 'react-native-toast-notifications';
import AlphabetOrder from 'newComponents/AlphabetOrder';
import ContactForm from 'screens/AddProFlow/AddContactFlow/AddContacts/ContactForm';
import {getAddPro, setMobileNumber} from 'reducers/addProReducer';

export const ChooseContact = (props: any) => {
  const dispatch = useDispatch();

  const toast = useToast();
  const [invitationModal, setInvitationModal] = useState(false);
  const selectContact = useSelector(getAddPro);
  const addPro = props?.route?.params?.addPro;

  const {colors} = useTheme();

  console.log('selectContact', selectContact?.first_name);

  console.log('selectContactlast', selectContact?.last_name);

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };

  const createContactCountryCode = () => {
    const contactDetails = {
      firstName: selectContact?.first_name,
      lastName: selectContact?.last_name,
      mobileNo: `+${selectContact?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
      client_team_id: '',
      fullNumber: `+${selectContact?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
      image: '',
      latitude: '',
      longitude: '',
    };
    if (addPro) {
      props.navigation.navigate('AddContactTeam', {addPro: addPro});
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
  };

  const createContactNoNameAndCode = () => {
    const formatedNumber = selectContact?.mobileNo.replace(
      /[- #*;(),.<>\{\}\[\]\\\/]/gi,
      '',
    );
    props.navigation.navigate('AddContactName', {
      addPro: addPro,
      mobileNum: formatedNumber.substr(formatedNumber.length - 10),
    });
  };

  const createContactNoCode = () => {
    if (selectContact) {
      const nameDetails = {
        firstName: selectContact?.first_name,
        lastName: selectContact?.last_name,
      };

      const formatedNumber = selectContact?.mobileNo.replace(
        /[- #*;(),.<>\{\}\[\]\\\/]/gi,
        '',
      );
      dispatch(setSelectedContact(nameDetails));
      props.navigation.navigate('AddContactMobileNumber', {
        addPro: addPro,
        mobileNum: formatedNumber.substr(formatedNumber.length - 10),
      });
    }
  };

  const submit = async (form: any) => {
    if (selectContact?.mobileNo) {
      if (addPro) {
        if (
          !selectContact?.mobileNo.includes('+') &&
          !selectContact?.first_name &&
          !selectContact?.last_name
        ) {
          createContactNoNameAndCode();
        } else if (!selectContact?.first_name || !selectContact?.last_name) {
          props.navigation.navigate('AddContactName', {
            addPro: addPro,
            addFromContact: true,
          });
        } else if (selectContact?.mobileNo.includes('+')) {
          const nameDetails = {
            firstName: selectContact?.first_name,
            lastName: selectContact?.last_name,
            mobileNo: `+${selectContact?.mobileNo.replace(
              /[^A-Za-z0-9]/g,
              '',
            )}`,
            fullNumber: selectContact?.mobileNo.replace(/[^A-Za-z0-9]/g, ''),
          };
          dispatch(setSelectedContact(nameDetails));
          props.navigation.navigate('AddContactTeam', {addPro: addPro});
        } else {
          createContactNoCode();
        }
      } else {
        if (
          !selectContact?.mobileNo.includes('+') &&
          !selectContact?.first_name &&
          !selectContact?.last_name
        ) {
          createContactNoNameAndCode();
        } else if (!selectContact?.first_name || !selectContact?.last_name) {
          props.navigation.navigate('AddContactName', {
            addPro: addPro,
            addFromContact: true,
          });
        } else if (selectContact?.mobileNo.includes('+')) {
          createContactCountryCode();
        } else {
          createContactNoCode();
        }
      }
    } else {
      toast.show('Please choose contact', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };
  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
        <BackButtonHeader
          showPages={false}
          onCancelPress={() => props.navigation.navigate('Contacts')}
          showCancel={true}
        />

        <Title title={'Choose contact'} />
        <View style={{paddingHorizontal: '6%'}}>
          <ContactForm isAddFriend={true} />
        </View>

        <View style={styles.proBtn}>
          <Button
            disabled={selectContact.mobileNo != '' ? false : true}
            label={addPro ? 'Continue' : 'Add friend'}
            width={'90%'}
            onPress={() => {
              submit();
              // toggleBottomSheet();
            }}
          />
        </View>
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

      {/* <AddAppointment
        onPress={() => {
          props.navigation.navigate('ChooseProStack');
        }}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  proBtn: {
    position: 'absolute',
    bottom: verticalScale(20),
    alignItems: 'center',
    width: '100%',
    left: 0,
  },
});

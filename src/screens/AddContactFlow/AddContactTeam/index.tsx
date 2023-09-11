import React, {useState, useMemo, useEffect} from 'react';
import {Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
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
import ContactTeamItem from './ContactTeamItem';
import {fetchTeamsList, getTeamList} from 'reducers/addAppointmentReducer';
import {addProContact, getSelectContact} from 'reducers/contactReducer';
import {useToast} from 'react-native-toast-notifications';
import {Modal} from 'react-native-paper';
import {categorySelector} from 'reducers/categoryReducer';

export const AddContactTeam = (props: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [contactIndex, setContactIndex] = useState();
  const [invitationModal, setInvitationModal] = useState(false);
  const [selectContact, setSelectContact] = useState();
  const teamList = useSelector(getTeamList);
  const [selectTeam, setSelectTeam] = useState();
  const [selectTeamService, setselectTeamService] = useState();
  const getCategoryFromStore = useSelector(categorySelector);
  const selectedContact = useSelector(getSelectContact);

  const toast = useToast();

  const addPro = props?.route?.params?.addPro;
  const {colors} = useTheme();
  console.log('getCategoryFromStore', selectedContact);

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const submit = () => {
    if (selectTeam && selectTeamService) {
      console.log('selectedContact', selectedContact);
      const model = {
        client_team_id: selectTeam,
        first_name: selectedContact?.firstName,
        last_name: selectedContact?.lastName,
        mobileNo: selectedContact?.mobileNo,
        serviceId: selectTeamService,
      };

      console.log(model);
      dispatch(addProContact(model))
        .unwrap()
        .then(originalPromiseResult => {
          toggleBottomSheet();

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
    } else {
      toast.show('Please choose team and service', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something

      dispatch(fetchTeamsList(false));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
        <BackButtonHeader
          showPages={false}
          showCancel={true}
          onCancelPress={() => props.navigation.navigate('Contacts')}
        />

        <Title title={'Add to Team'} />
        <View style={{paddingHorizontal: '6%'}}>
          <Pressable
          // onPress={onPress}
          >
            <AlphabetSort height={scale(35)} width={scale(35)} />
          </Pressable>
          <ScrollView>
            <View
              style={{
                paddingBottom: scale(300),
                backgroundColor: 'white',
                width: '100%',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                data={getCategoryFromStore?.categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  return (
                    <ContactTeamItem
                      index={index}
                      selectTeam={selectTeam}
                      selectTeamService={selectTeamService}
                      setselectTeamService={setselectTeamService}
                      setSelectTeam={setSelectTeam}
                      setContactIndex={setContactIndex}
                      item={item}
                    />
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>

        <View style={styles.proBtn}>
          <Button
            disabled={selectTeam && selectTeamService ? false : true}
            label="Add Pro"
            width={'90%'}
            onPress={() => {
              submit();
            }}
          />
        </View>
      </Screen>
      <ContactInvitationSheet
        onReturnAddAnother={() => {
          props.navigation.navigate('SelectMethod', {addPro: addPro});
          setInvitationModal(false);
        }}
        isPro={addPro}
        visible={invitationModal}
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

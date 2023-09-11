import {PermissionsAndroid, Platform, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {check, PERMISSIONS} from 'react-native-permissions';
import Contacts from 'react-native-contacts';
import {formateNumber} from 'services/common';
import {useSelector} from 'react-redux';
import {getProviderContacts} from 'reducers/authReducer';
import ContactList from 'newComponents/ContactList';
import CustomSearch from 'newComponents/CustomSearch';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View} from 'ui';
import _ from 'lodash';
import AlphabetSort from '../../../../assets/AlphabetSort.svg';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import {contactsPermissionError} from 'services/common';

const ContactForm = (props: any) => {
  const [contacts, setContacts] = useState([]);
  const [selectContact, setSelectContact] = useState([]);
  const [contactIndex, setContactIndex] = useState();
  const syncContacts = useSelector(getProviderContacts);

  const {colors} = useTheme();

  useEffect(() => {
    loadContacts();
  }, []);
  const loadContacts = () => {
    check(
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.READ_CONTACTS
        : PERMISSIONS.IOS.CONTACTS,
    ).then(per => {
      if (per == 'granted') {
        Contacts.getAll()
          .then(async response => {
            const makeContactList = response.map(item => {
              return {
                phoneNumbers: item?.phoneNumbers[0]?.number.replace(/ /g, ''),
                key: item?.recordID,
                middleName: item?.middleName,
                displayName: item?.displayName,
                familyName: item?.familyName,
                givenName: item?.givenName,
                value: `${item?.givenName} ${item?.familyName}`,
                isKazzahUser: false,
                image: undefined,
                id: undefined,
                homeChannelName: undefined,
              };
            });

            let newList = makeContactList.map(e => {
              let c = {...e};

              const foundUser = syncContacts.find(
                i =>
                  formateNumber(i.full_number) == formateNumber(c.phoneNumbers),
              );
              if (foundUser) {
                c.isKazzahUser = true;
                c.id = foundUser?.id;
                c.image = foundUser?.profileImage;
                c.homeChannelName = foundUser?.rootService;
              }

              return c;
            });

            const newSortOrder = 'asc';

            const sortedContacts = _.orderBy(
              newList,
              item => item.displayName?.toLowerCase(),
              [newSortOrder],
            );

            let kzhList = sortedContacts.filter(e => e.isKazzahUser);
            let nonKzhList = sortedContacts.filter(e => !e.isKazzahUser);

            setContacts([...kzhList, ...nonKzhList]);
          })
          .catch(e => {});
      } else {
        if (Platform.OS == 'android') {
          contactsPermissionError({code: 'E_NO_CONTACTS_PERMISSION'});
        } else {
          Contacts.getAll()
            .then(async response => {
              // if (Platform.OS == 'ios') {
              //   contactsPermissionError({code: 'E_NO_CONTACTS_PERMISSION'});
              // } else {
              const makeContactList = [];
              response.forEach(item => {
                makeContactList.push({
                  phoneNumbers: item?.phoneNumbers[0]?.number.replace(/ /g, ''),
                  key: item?.recordID,
                  middleName: item?.middleName,
                  displayName: `${item?.givenName} ${item?.familyName}`,
                  familyName: item?.familyName,
                  givenName: item?.givenName,
                  value: `${item?.givenName} ${item?.familyName}`,
                  isKazzahUser: false,
                  image: undefined,
                  id: undefined,
                  homeChannelName: undefined,
                });
              });
              let newList = makeContactList.map(e => {
                let c = {...e};
                const foundUser = syncContacts.find(
                  i =>
                    formateNumber(i.full_number) ==
                    formateNumber(c.phoneNumbers),
                );
                if (foundUser) {
                  c.isKazzahUser = true;
                  c.id = foundUser?.id;
                  c.image = foundUser?.profileImage;
                  c.homeChannelName = foundUser?.rootService;
                }
                return c;
              });
              const newSortOrder = 'asc';
              const sortedContacts = _.orderBy(
                newList,
                item => item.displayName?.toLowerCase(),
                [newSortOrder],
              );
              let kzhList = sortedContacts.filter(e => e.isKazzahUser);
              let nonKzhList = sortedContacts.filter(e => !e.isKazzahUser);
              setContacts([...kzhList, ...nonKzhList]);
            })
            .catch(error => {
              console.log('permission error', error);
              contactsPermissionError({code: 'E_NO_CONTACTS_PERMISSION'});
            });
        }
      }
    });
  };

  async function searchArray(text: any) {
    if (text === '') {
      loadContacts();
    }
    let filtered = contacts?.filter(el => {
      return `$${el.displayName}  ${el.phoneNumbers}`
        .toLowerCase()
        .trim()
        .includes(text.toLowerCase().trim());
    });
    setContacts(filtered);
  }

  const [sortOrder, setSortOrder] = useState('asc');

  const onPress = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedContacts = _.orderBy(
      contacts,
      item => item.displayName?.toLowerCase(),
      [newSortOrder],
    );

    let kzhList = sortedContacts.filter(e => e.isKazzahUser);
    let nonKzhList = sortedContacts.filter(e => !e.isKazzahUser);

    setContacts([...kzhList, ...nonKzhList]);
  };

  return (
    <React.Fragment>
      <CustomSearch
        placeholder={'Search contacts'}
        onChangeFilterSearch={searchArray}
      />
      <Pressable onPress={onPress}>
        <AlphabetSort height={scale(35)} width={scale(35)} />
      </Pressable>

      {/* <KeyboardAwareScrollView
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        keyboardShouldPersistTaps="always"
        scrollEventThrottle={10}
        resetScrollToCoords={{x: 0, y: 0}}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        extraHeight={200}
        extraScrollHeight={150}
        contentContainerStyle={{height: '80%'}}> */}
      <FlatList
        data={contacts}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{height: '60%', width: '100%'}}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={{marginTop: verticalScale(100)}}>
            <ActivityIndicator color={colors.black} />
          </View>
        )}
        renderItem={({item, index}) => {
          return (
            <ContactList
              isAddFriend={props?.isAddFriend}
              item={item}
              selectContact={selectContact}
              contacts={contacts}
              setContactIndex={setContactIndex}
              contactIndex={contactIndex}
              index={index}
              setSelectContact={setSelectContact}
            />
          );
        }}
      />
      {/* </KeyboardAwareScrollView> */}
    </React.Fragment>
  );
};

export default ContactForm;

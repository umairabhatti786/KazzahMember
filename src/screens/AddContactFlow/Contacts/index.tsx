import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale} from 'react-native-size-matters';
import {ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import AppInnerHeader from 'newComponents/AppHeader';
import {Title} from 'newComponents/TextComponents';
import CustomSearch from 'newComponents/CustomSearch';
import {CalendarView} from 'screens/CalendarView';
import AddAppointment from 'newComponents/AddAppointment';
import {EmptyContacts} from './EmptyContacts';
import ContactContainer from './ContactContainer';
import ContactFilterSheet from 'newComponents/ContactFilterSheet';
import {useFocusEffect} from '@react-navigation/native';

import {
  fetchContactsList,
  getAllContactsList,
  getContactListLoading,
} from 'reducers/contactReducer';
import {unwrapResult} from '@reduxjs/toolkit';
import AlphabetOrder from 'newComponents/AlphabetOrder';
import SortFilterHeader from 'newComponents/SortFilterHeader/ContactHeader';
import {setProviderId} from 'reducers/providerReducer';
import {setMemberId} from 'reducers/memberReducer';
export const Contacts = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [checkboxState, setCheckboxState] = useState(0);
  const {colors} = useTheme();
  const [sortOrder, setSortOrder] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterName, setFilterName] = useState('All');

  const loading = useSelector(getContactListLoading);

  const [contactData, setcontactData] = useState([]);

  async function searchArray(text: any) {
    if (text === '') {
      contactList();
    }
    let filtered = contactData?.filter(el => {
      return `$${el.connection.firstName}  ${el.phoneNumbers}`
        .toLowerCase()
        .trim()
        .includes(text.toLowerCase().trim());
    });
    setcontactData(filtered);
  }
  async function contactList() {
    await dispatch(fetchContactsList({filter: selectedFilter}))
      .unwrap()
      .then((originalPromiseResult: any) => {
        console.log('conatctslist', originalPromiseResult);
        setcontactData(originalPromiseResult);
        // handle result here
      })
      .catch((rejectedValueOrSerializedError: any) => {
        console.log(
          'rejectedValueOrSerializedError',
          rejectedValueOrSerializedError,
        );

        // handle error here
      });
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      setSelectedFilter('all');
      setFilterName('All');

      contactList();
    });

    return unsubscribe;
    // componentwillunmount in functional component.
    // Anything in here is fired on component unmount.
  }, []);
  useEffect(() => {
    contactList();
  }, [selectedFilter]);

  useFocusEffect(
    React.useCallback(() => {
      return async () => {
        setSelectedFilter('all');
        setFilterName('All');
        setCheckboxState(0);
      };
    }, []),
  );

  const onSort = () => {
    setSortOrder(!sortOrder);

    const newSortOrder = !sortOrder ? 'desc' : 'asc';
    const sortedContacts = _.orderBy(
      contactData,
      item => item?.connection?.firstName?.toLowerCase(),
      [newSortOrder],
    );

    setcontactData(sortedContacts);
  };

  const toggleBottomSheet = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const onNavigate = (item: any) => {
    if (item?.connectionRelation === 'provider') {
      dispatch(setProviderId(item?.connection.id));

      if (item?.connection.isRegisteredUser == 1) {
        navigation.navigate('ConnectedProviderProStack', {
          data: item,
        });
      } else {
        navigation.navigate('NonKazzahProfile', {
          data: item?.connection,
        });
      }

      return;
    }

    if (item?.connectionRelation == 'client') {
      // dispatch(setProviderId(item?.connection.id))

      if (item?.connection.isRegisteredUser == 1) {
        navigation.navigate('MemberProfileScreen', {
          data: item?.connection,
        });
      } else {
        navigation.navigate('NonKazzahProfile', {
          data: item?.connection,
        });
      }

      //   if(item?.)
    }
  };

  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
        <AppInnerHeader />
        <View style={{backgroundColor: colors.background}}>
          {contactData.length == 0 && !loading ? (
            <View height={'100%'} width={'100%'}>
              <EmptyContacts />
            </View>
          ) : (
            <>
              <Pressable>
                <Title
                  style={{fontSize: scale(42), marginTop: scale(-10)}}
                  title={'Contacts'}
                />
              </Pressable>

              <View style={{marginHorizontal: '6%'}}>
                <CustomSearch
                  onChangeFilterSearch={searchArray}
                  width={'100%'}
                  placeholder={'Search contacts'}
                />
                <SortFilterHeader
                  onPress={onSort}
                  sortOrder={sortOrder}
                  filterName={filterName}
                  filterContact={toggleBottomSheet}
                />
                {/* <View height={scale(20)} /> */}

                {loading ? (
                  <View
                    style={{
                      height: '70%',
                      justifyContent: 'center',
                    }}
                  >
                    <ActivityIndicator size={'large'} color={colors.black} />
                  </View>
                ) : (
                  <ScrollView nestedScrollEnabled={true}>
                    <View
                      style={{
                        backgroundColor: colors.background,
                        paddingBottom: scale(360),
                        width: '100%',
                      }}
                    >
                      {/* <AlphabetOrder onPress={onPress} sortOrder={sortOrder} /> */}

                      {contactData ? (
                        <>
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            nestedScrollEnabled={true}
                            data={contactData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <ContactContainer
                                  onPressContact={() => {
                                    onNavigate(item);

                                    //    props.navigation.navigate('ProviderProfile', {
                                    //   data: item,
                                    // })
                                  }}
                                  index={index}
                                  item={item}
                                />
                              );
                            }}
                          />
                        </>
                      ) : (
                        <ActivityIndicator color={'white'} size={'large'} />
                      )}
                    </View>
                  </ScrollView>
                )}
              </View>
            </>
          )}
        </View>
      </Screen>
      <ContactFilterSheet
        setSelectedFilter={setSelectedFilter}
        isVisible={isFilterVisible}
        setVisible={toggleBottomSheet}
        setCheckboxState={setCheckboxState}
        checkboxState={checkboxState}
        setFilterName={setFilterName}
      />
      {contactData.length != 0 && (
        <AddAppointment
          onPress={() => {
            props.navigation.navigate('ChooseType');
          }}
        />
      )}
    </>
  );
};

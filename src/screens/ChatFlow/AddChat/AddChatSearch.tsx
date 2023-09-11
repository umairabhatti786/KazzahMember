import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput as TextInputP} from 'react-native-paper';

import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import AutocompleteInput from 'react-native-autocomplete-input';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import AddChatItem from './AddChatItem';
import {getAllContactsList} from 'reducers/contactReducer';
import {setSelectedConnectionId, setUserType} from 'reducers/chatReducer';
export const AddChatSearch = ({searchText, setSearchText}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const [suggestiveContacts, setSuggestiveContacts] = useState([]);

  const connections = useSelector(getAllContactsList)?.filter(
    e => e.connection?.isRegisteredUser == 1,
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length == 0) {
      setSuggestiveContacts([]);
      return;
    }

    setSuggestiveContacts(
      connections
        .filter(item =>
          Object.values(item.connection).some(value =>
            String(value).toLowerCase().includes(text.toLowerCase()),
          ),
        )
        .map(e => {
          return {
            id: e.connection?.id,
            firstName: e.connection?.firstName,
            lastName: e.connection?.lastName,
            rootService: e.connection?.rootService,
            profileImage: e.connection?.profileImage,
            userType: e.connection?.hasOwnProperty('businessName')
              ? 'provider'
              : 'client',
          };
        }),
    );
  };
  const handleKeyPress = ({nativeEvent: {key: keyValue}}) => {
    console.log('ValueKey', keyValue);
    // if(keyValue === 'Enter')
    // {
    //   console.log("enter");
    // }
  };

  return (
    <>
      <View style={{flex: 1}}>
        <AutocompleteInput
          renderTextInput={() => (
            <TextInputP
              value={searchText}
              theme={{
                roundness: 7,
                fonts: {
                  regular: {
                    fontFamily: 'Calibre',
                  },
                },
                colors: {
                  text: colors.black,
                },
              }}
              placeholder="Search name"
              onKeyPress={handleKeyPress}
              onKeyPress={() => {
                console.log('OnkeyPress');
              }}
              placeholderTextColor={colors.silverChalic}
              label={
                <Text
                  style={{
                    color: colors.silverChalice,
                    backgroundColor: colors.background,
                    fontSize: 14,
                    fontFamily: 'Calibre',
                  }}>
                  To
                </Text>
              }
              onChangeText={handleSearch}
              mode="outlined"
              autoCapitalize="none"
              outlineColor={colors.silverChalice}
              activeOutlineColor={colors.silverChalice + 'A1'}
              style={{
                backgroundColor: colors.background,
                width: scale(310),
                height: '20%',
                borderRadius: 15,
                fontSize: moderateScale(15),
                fontFamily: 'Calibre',
                fontWeight: '500',
              }}
            />
          )}
          inputContainerStyle={{
            borderColor: 'transparent',
            height: scale(50),
            zIndex: 1000,
          }}
          data={suggestiveContacts}
          flatListProps={{
            keyExtractor: (index, item) => index,
            style: {
              width: '100%',
              zIndex: 1000,
              marginLeft: scale(3),
              borderWidth: 0,
              marginTop: verticalScale(30),

              height: verticalScale(250),
              // opacity: 0.8,
            },
            renderItem: ({item, index}) => {
              return (
                <AddChatItem
                  onPress={() => {
                    setSearchText(`${item?.firstName} ${item?.lastName}`);
                    dispatch(setSelectedConnectionId(item?.id));
                    dispatch(setUserType(item?.userType));
                    setSuggestiveContacts([]);
                  }}
                  item={item}
                />
              );
            },
          }}
        />
      </View>
    </>
  );
};

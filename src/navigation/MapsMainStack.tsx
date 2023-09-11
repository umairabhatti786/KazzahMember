import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {TouchableOpacity, Image, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {useDispatch} from 'react-redux';
import {MapSearch} from 'screens/SearchFlow/MapSearch';
import {MapsFilterStack} from './MapsFilterStack';
import {ExploreStack} from './ExploreStack';
import {
  fetchAllProviders,
  fetchFriendProviders,
  fetchFriendsMedia,
  fetchMyProviders,
  fetchProvidersMedia,
  fetchPublicProvidersMedia,
  fetchSearchedProvider,
  fetchSuggestiveText,
  getBottomSheetState,
  getCoords,
  getSearchSuggestionsList,
  getSearchText,
  setSearchText,
  setSuggestionsList,
} from 'reducers/searchReducer';
import {TextInput} from 'react-native';
import AutocompleteInput from 'react-native-autocomplete-input';
import {useSelector} from 'react-redux';
import SearchIcon from '../../src/assets/SearchIcon.svg';
import CrossIcon from '../../src/assets/CrossIcon.svg';
import {requestLocationPermission} from 'services/common';

const map = require('../../src/assets/GalleryIcon.png');
const filter = require('../../src/assets/Filter.png');
const explore = require('../../src/assets/UnfilledLocation.png');

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const MapsMainStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const bottomSheetActive = useSelector(getBottomSheetState);

  const suggestionsList = useSelector(getSearchSuggestionsList);
  const searchText = useSelector(getSearchText);

  const coords = useSelector(getCoords);
  const dispatch = useDispatch();
  const getSuggestiveText = async text => {
    try {
      if (!text) {
        return;
      }

      dispatch(fetchSuggestiveText(text));
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(fetchAllProviders());
    dispatch(fetchFriendProviders());
    dispatch(fetchMyProviders());
    requestLocationPermission();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => {
        return (
          <View
            style={{
              zIndex: 1,
              position: 'absolute',
              width: '100%',
              top: '5%',

              paddingHorizontal: Platform.OS === 'ios' ? '15%' : '1%',
              paddingVertical: Platform.OS === 'ios' ? '5%' : '1%',
            }}
          >
            {!bottomSheetActive && (
              <View
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'row'}
                paddingBottom="s"
              >
                <AutocompleteInput
                  clearButtonMode="never"
                  style={{
                    zIndex: 1,
                  }}
                  renderTextInput={() => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: 30,
                        height: scale(40),
                        marginHorizontal: scale(10),
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 4,
                      }}
                    >
                      <SearchIcon
                        style={{
                          color: colors.silverChalice,
                          marginStart: scale(10),
                        }}
                        width={scale(20)}
                        height={scale(15)}
                      />
                      <TextInput
                        // clearButtonMode="always"
                        placeholder="Search Kazzah"
                        value={searchText}
                        onChangeText={text => {
                          dispatch(setSearchText(text));
                          if (text.length >= 3) {
                            getSuggestiveText(text);
                            let finalData = {
                              distanceCovered: 100,
                              query: text,
                              latitude: coords.lat,
                              longitude: coords.long,
                            };
                            dispatch(fetchSearchedProvider(finalData));
                          }
                        }}
                        style={{
                          color: colors.black,
                          fontFamily: 'Calibre',
                          fontWeight: '400',
                          fontSize: 18,
                          marginTop: verticalScale(3),
                          width: '90%',
                        }}
                        placeholderTextColor={colors.silverChalice}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(setSearchText(''));
                          dispatch(setSuggestionsList([]));
                        }}
                        style={{
                          position: 'absolute',
                          end: '6%',
                          width: scale(22),
                          height: scale(22),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CrossIcon
                          height={10}
                          width={10}
                          style={{color: colors.doveGray}}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  inputContainerStyle={{
                    borderColor: 'transparent',
                    height: scale(50),
                  }}
                  data={suggestionsList}
                  // hideResults={hideResults}
                  flatListProps={{
                    keyExtractor: (index, item) => index.toString(),
                    style: {
                      width: '92%',
                      position: 'absolute',
                      backgroundColor: 'white',
                      borderColor: 'transparent',
                      opacity: 0.8,
                      borderRadius: 30,
                    },
                    renderItem: ({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index.toString()}
                          style={{
                            height: scale(30),
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            paddingHorizontal: 10,
                          }}
                          onPress={() => {
                            dispatch(setSearchText(item.name));
                            dispatch(setSuggestionsList([]));
                            let finalData = {
                              distanceCovered: 100,
                              query: item.name,
                              latitude: coords.lat,
                              longitude: coords.long,
                            };
                            dispatch(fetchSearchedProvider(finalData));
                          }}
                        >
                          <Text
                            style={[
                              textStyle.b3,
                              {
                                color: colors.black,
                                start: '10%',
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    },
                  }}
                />

                <View width={scale(15)} />
                <View flexDirection={'row'}>
                  {props.state.routes.map((item, index) => {
                    const isFocused = props.state.index === index;

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          props.navigation.navigate(item.name);
                        }}
                        style={{
                          //   paddingHorizontal: scale(2),
                          alignItems: 'center',
                          paddingVertical: scale(12),
                          justifyContent: 'center',
                          marginRight: scale(15),
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={{
                            width:
                              item.name == 'MapSearch' ? scale(18) : scale(15),
                            height:
                              item.name == 'MapSearch' ? scale(18) : scale(15),
                            tintColor: isFocused
                              ? colors.black
                              : colors.doveGray,
                          }}
                          source={
                            item.name == 'MapSearch'
                              ? explore
                              : item.name == 'MapsFilterStack'
                              ? filter
                              : item.name == 'Friends'
                              ? map
                              : ''
                          }
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        );
      }}
    >
      <Tab.Screen
        initialParams={{isComplete: false}}
        name="MapSearch"
        component={MapSearch}
      />
      <Tab.Screen
        initialParams={{isComplete: true}}
        name="MapsFilterStack"
        component={MapsFilterStack}
      />
      <Tab.Screen
        initialParams={{isComplete: true}}
        name="Friends"
        component={ExploreStack}
      />
    </Tab.Navigator>
  );
};

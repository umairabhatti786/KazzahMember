import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import AppInnerHeader from 'newComponents/AppHeader';
import ChartPaymentAppointment from 'screens/PaymentFlow/ChartPaymentAppointment';
import {useDispatch} from 'react-redux';
import FilterPro from 'newComponents/FilterPro';
import FilterPros from 'screens/SearchFlow/FilterPros';
import FilterPublic from 'screens/SearchFlow/FilterPublic';
import FilterFriends from 'screens/SearchFlow/FilterFriends';
import MapSearchHeader from 'newComponents/MapSearchHeader';
import ExploreProImage from 'screens/ExploreFlow/ExploreProImage';
import ExplorePublicImage from 'screens/ExploreFlow/ExplorePublicImage';
import ExploreFriendImage from 'screens/ExploreFlow/ExploreFriendImage';
import MasonryList from '@react-native-seoul/masonry-list';

import {
  fetchFriendsMedia,
  fetchProvidersMedia,
  fetchPublicProvidersMedia,
  fetchSearchedMedia,
  getFriendsMedia,
  getSearchText,
  getSearchedMedia,
} from 'reducers/searchReducer';
import {useSelector} from 'react-redux';
import PhotoMenuBottom from 'screens/ExploreFlow/PhotoMenuBottom';
import ExplorePhotoCard from 'newComponents/ExplorePhotoCard';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const ExploreStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const searchText = useSelector(getSearchText);

  const dispatch = useDispatch();
  const PhotoListCardData = useSelector(getSearchedMedia);
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const [showPhotoMenuModal, setShowPhotoMenuModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPublicProvidersMedia());
    dispatch(fetchProvidersMedia());
    dispatch(fetchFriendsMedia());
    dispatch(fetchSearchedMedia(searchText));
  }, [searchText]);

  return (
    <Screen edges={['right', 'top', 'left']}>
      {searchText.length == 0 ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: '6%',
          }}>
          <Tab.Navigator
            screenOptions={{
              swipeEnabled: false,
            }}
            tabBar={props => {
              return (
                <View
                  style={{marginTop: '30%'}}
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                  paddingBottom="s">
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {props.state.routes.map((item, index) => {
                      const isFocused = props.state.index === index;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => props.navigation.navigate(item.name)}
                          style={{
                            paddingHorizontal:
                              index === 1 ? scale(30) : scale(20),
                            alignItems: 'center',
                            paddingVertical: scale(12),
                            borderRadius: scale(20),
                            borderWidth: 1,
                            borderColor: isFocused
                              ? colors.black
                              : colors.silverChalice,

                            justifyContent: 'center',
                            marginRight: scale(15),
                          }}>
                          <Text
                            style={[
                              textStyle.cta2,
                              {
                                color: isFocused
                                  ? colors.black
                                  : colors.silverChalice,
                              },
                            ]}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }}>
            <Tab.Screen
              initialParams={{isComplete: false}}
              name="Pros"
              component={ExploreProImage}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Public"
              component={ExplorePublicImage}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Friends"
              component={ExploreFriendImage}
            />
          </Tab.Navigator>
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              paddingHorizontal: '6%',
              top: '15%',
            }}>
            <Text
              numberOfLines={1}
              style={[
                textStyle.h3,
                {color: colors.black, marginVertical: verticalScale(10)},
              ]}>
              Results ({PhotoListCardData.length})
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: scale(50),
              }}>
              <MasonryList
                numColumns={2}
                containerStyle={{zIndex: -10}}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                  <View
                    height={200}
                    justifyContent="center"
                    alignItems={'center'}>
                    <Text style={{color: 'white'}}> No media found </Text>
                  </View>
                }
                data={PhotoListCardData}
                renderItem={({item, index}) => {
                  return (
                    <ExplorePhotoCard
                      visible={showPhotoMenuModal}
                      setSelectedPhoto={setSelectedPhoto}
                      setVisible={setShowPhotoMenuModal}
                      item={item}
                      index={index}
                    />
                  );
                }}
              />
            </ScrollView>
          </View>
          <PhotoMenuBottom
            selectedPhoto={selectedPhoto}
            visible={showPhotoMenuModal}
            setVisible={setShowPhotoMenuModal}
          />
        </>
      )}
    </Screen>
  );
};

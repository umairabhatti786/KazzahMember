import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import AppInnerHeader from 'newComponents/AppHeader';
import ChartPaymentAppointment from 'screens/PaymentFlow/ChartPaymentAppointment';
import {useDispatch} from 'react-redux';
import FilterPro from 'newComponents/FilterPro';
import FilterPros from 'screens/SearchFlow/FilterPros';
import FilterPublic from 'screens/SearchFlow/FilterPublic';
import FilterFriends from 'screens/SearchFlow/FilterFriends';
import MapSearchHeader from 'newComponents/MapSearchHeader';
import {
  fetchAllProviders,
  fetchFriendProviders,
  fetchMyProviders,
  getMyProviders,
  getSearchProvidersList,
  getSearchText,
} from 'reducers/searchReducer';
import {useSelector} from 'react-redux';
import {getSearchedProviders} from 'reducers/providerReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchProsItem from 'screens/SearchFlow/FilterPros/SearchProsItem';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const MapsFilterStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const searchText = useSelector(getSearchText);

  const searchProviderList = useSelector(getSearchProvidersList);

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
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                  paddingBottom="s"
                  style={{marginTop: Platform.OS === 'ios' ? '20%' : '30%'}}>
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
              component={FilterPros}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Public"
              component={FilterPublic}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Friend's pros"
              component={FilterFriends}
            />
          </Tab.Navigator>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: '6%',
            top: '15%',
          }}>
          <View
            style={{
              paddingBottom: scale(300),
              backgroundColor: 'white',
              width: '100%',
            }}>
            <Text
              numberOfLines={1}
              style={[
                textStyle.h3,
                {color: colors.black, marginVertical: verticalScale(10)},
              ]}>
              {` Results (${searchProviderList?.length})`}
            </Text>
            <KeyboardAwareScrollView
              contentContainerStyle={{paddingBottom: verticalScale(80)}}
              showsVerticalScrollIndicator={false}>
              <FlatList
                data={searchProviderList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                  <>
                    {loading ? (
                      <View style={{marginTop: verticalScale(100)}}>
                        <ActivityIndicator color={colors.black} />
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                renderItem={({item, index}) => {
                  return (
                    <SearchProsItem
                      item={item}
                      // onPress={() => {
                      //   navigation.navigate('ProviderProfileScreen');
                      // }}
                      // prosIndex={prosIndex}
                      // setProsIndex={setProsIndex}
                      // selectPros={selectPros}
                      index={index}
                      // setSelectPros={setSelectPros}
                    />
                  );
                }}
              />
            </KeyboardAwareScrollView>
          </View>
        </View>
      )}
    </Screen>
  );
};

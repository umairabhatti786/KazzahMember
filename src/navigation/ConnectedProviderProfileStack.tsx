import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import ProfileDetail from 'screens/ConnectedProviderProfileFlow/ProfileDetail';
import ProfileAppointments from 'screens/ConnectedProviderProfileFlow/ProfileAppointments';
import ProfileDocuments from 'screens/ConnectedProviderProfileFlow/ProfileDocuments';
import ProfilePhotos from 'screens/ConnectedProviderProfileFlow/ProfilePhotos';
import BackButtonHeaderProfile from 'newComponents/BackButtonheaderProfile';
import Button from 'newComponents/Button';
import {
  fetchProviderSchedule,
  resetAddAppointment,
  setAppointmentProvider,
} from 'reducers/addAppointmentReducer';
import {useSelector} from 'react-redux';
import {getProviderProfile, getSelectedImage} from 'reducers/providerReducer';
import {useDispatch} from 'react-redux';
import MediaView from 'screens/KazzahFeeds/MediaView';
import {setAppointmentReserved} from 'reducers/appoinmentReducer';
import useService from 'utils/services';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const ConnectedProviderProStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const providerImage = useSelector(getSelectedImage);
  console.log('providerImage', providerImage);

  const provider = useSelector(getProviderProfile);
  const dispatch = useDispatch();

  const {handleBookAppointment} = useService();

  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <View
          style={{
            flex: 1,
          }}
        >
          <BackButtonHeaderProfile />
          <View height={'4%'} />
          <Tab.Navigator
            screenOptions={{
              swipeEnabled: false,
            }}
            tabBar={props => {
              return (
                <View
                  style={{marginLeft: '6%'}}
                  alignItems={'center'}
                  justifyContent={'center'}
                  flexDirection={'row'}
                  height={'10%'}
                >
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {props.state.routes.map((item, index) => {
                      const isFocused = props.state.index === index;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => props.navigation.navigate(item.name)}
                          style={{
                            paddingHorizontal: scale(20),
                            alignItems: 'center',
                            paddingVertical: scale(10),
                            borderRadius: scale(20),
                            borderWidth: 1,
                            borderColor: isFocused
                              ? colors.black
                              : colors.silverChalice,

                            justifyContent: 'center',
                            marginRight: scale(15),
                          }}
                        >
                          <Text
                            style={[
                              textStyle.cta2,
                              isFocused
                                ? {
                                    color: colors.black,
                                    marginTop:
                                      Platform.OS === 'ios' ? scale(5) : 0,
                                  }
                                : {
                                    color: colors.silverChalice,
                                    marginTop:
                                      Platform.OS === 'ios' ? scale(5) : 0,
                                  },
                            ]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              );
            }}
          >
            <Tab.Screen
              initialParams={{isComplete: false}}
              name="Details"
              component={ProfileDetail}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Documents"
              component={ProfileDocuments}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Photos"
              component={ProfilePhotos}
            />
            <Tab.Screen
              initialParams={{isComplete: true}}
              name="Appointments"
              component={ProfileAppointments}
            />
          </Tab.Navigator>
        </View>
        <View style={styles.proBtn}>
          <Button
            label="Book now"
            width={'90%'}
            onPress={() => handleBookAppointment(provider)}
          />
        </View>
      </Screen>

      {providerImage?.isActive ? (
        <View style={{position: 'absolute', width: '100%', height: '100%'}}>
          <MediaView
            profileMedia={true}
            providerMedia={true}
            media={providerImage?.item}
          />
        </View>
      ) : null}
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });

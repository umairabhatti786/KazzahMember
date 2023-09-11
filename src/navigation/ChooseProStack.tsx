import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import ChoosePro from 'screens/AddAppoinmentFlow/ChoosePro';
import ProTeams from 'screens/AddAppoinmentFlow/ProTeams';
import ProService from 'screens/AddAppoinmentFlow/ProService';
import ProRecentAppointments from 'screens/AddAppoinmentFlow/ProRecentAppointments';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import {useSelector} from 'react-redux';
import {getAppointmentProvider} from 'reducers/addAppointmentReducer';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {setAppointmentReserved} from 'reducers/appoinmentReducer';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const ChooseProStack: React.FC<Props> = props => {
  const [isRecentActive, setisRecentActive] = useState(false);
  const {colors} = useTheme();
  const selectedPro = useSelector(getAppointmentProvider);
  const dispatch = useDispatch();

  const toast = useToast();

  const onSelectPro = () => {
    if (!selectedPro?.id) {
      toast.show('Please Choose Pro', {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });

      return;
    }
    dispatch(setAppointmentReserved(false));

    props.navigation.navigate('SelectServices');
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        {/* <BackButtonHeader
          total="5"
          showCancel={true}
          onCancelPress={() => props.navigation.navigate('Pending')}
        /> */}
        {/* <Title title="Choose Pro" />
        <View height={verticalScale(10)} /> */}

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
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {props.state.routes.map((item, index) => {
                    const isFocused = props.state.index === index;
                    if (props.state.index === 3) {
                      setisRecentActive(true);
                    } else {
                      setisRecentActive(false);
                    }

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          props.navigation.navigate(item.name);
                        }}
                        style={{
                          paddingHorizontal: scale(20),
                          alignItems: 'center',

                          paddingVertical:
                            Platform.OS === 'ios' ? scale(10) : scale(12),
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
            name="Pros"
            component={ChoosePro}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Teams"
            component={ProTeams}
          />

          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Service"
            component={ProService}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Recents"
            component={ProRecentAppointments}
          />
        </Tab.Navigator>

        {!isRecentActive && (
          <View
            style={{
              position: 'absolute',
              bottom: verticalScale(20),
              alignItems: 'center',
              width: '100%',
              left: 0,
            }}
          >
            <Button
              disabled={selectedPro?.id ? false : true}
              label="Continue"
              width={'90%'}
              onPress={() => onSelectPro()}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SelectServices from 'screens/AddAppoinmentFlow/SelectServices';
import SelectDate from 'screens/AddAppoinmentFlow/SelectDate';
import ChooseTime from 'screens/AddAppoinmentFlow/ChooseTime';
import {ChooseProStack} from './ChooseProStack';
import ReviewDetails from 'screens/AddAppoinmentFlow/ReviewDetails';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {useSelector} from 'react-redux';
import {getAddAppointment} from 'reducers/addAppointmentReducer';
import {Title} from 'newComponents/TextComponents';
import {SafeAreaView, View} from 'react-native';
import TimeCounter from 'newComponents/TimeCounter';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

const spaceString = (inputString: string) => {
  return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const AddAppointmentStack: React.FC<Props> = props => {
  const appointment = useSelector(getAddAppointment);

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => {
        if (props.state.index == 5) {
          return <></>;
        }

        return (
          <SafeAreaView>
            <BackButtonHeader
              current={props.state.index + 1}
              total={appointment.isReservationFee == 1 ? '6' : '5'}
              showCancel={true}
              onCancelPress={() => props.navigation.navigate('Pending')}
              handleBack={() => {
                if (props.state.index == 0) {
                  props.navigation.navigate('Pending');
                } else {
                  props.navigation.navigate(
                    props.state.routeNames[props.state.index - 1],
                  );
                }
              }}
            />

            <Title
              title={spaceString(
                props.state.routeNames[props.state.index].replace('Stack', ''),
              )}
            />
            {appointment.appointmentId != 0 && (
              <View style={{width: '90%', alignSelf: 'center'}}>
                <TimeCounter createdAt={appointment.createdAt} />
              </View>
            )}
          </SafeAreaView>
        );
      }}
    >
      <Tab.Screen name="ChooseProStack" component={ChooseProStack} />
      <Tab.Screen name="SelectServices" component={SelectServices} />
      <Tab.Screen name="SelectDate" component={SelectDate} />
      <Tab.Screen name="ChooseTime" component={ChooseTime} />
      <Tab.Screen name="ReviewDetails" component={ReviewDetails} />
    </Tab.Navigator>
  );
};

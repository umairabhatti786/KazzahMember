import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Appointments, Home} from 'screens';

import {SvgProps} from 'react-native-svg';
import HomeIcon from '../assets/HomeIcon.svg';
import CalendarIcon from '../assets/CalendarIcon.svg';
import PaymentIcon from '../assets/PaymentIcon.svg';
import ContactsIcon from '../assets/ContactsIcon.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import {useNavigation, useTheme} from '@react-navigation/native';
import {PaymentStack} from './PaymentStack';
import {Contacts} from 'screens/AddContactFlow/Contacts';

import {useDispatch} from 'react-redux';
import {MapsMainStack} from './MapsMainStack';
import {fetchAllProviders, fetchFriendProviders} from 'reducers/searchReducer';
import {TourGuideZoneByPosition} from 'rn-tourguide';
import {Platform} from 'react-native';

import useAppointmentService from 'screens/Appointments/services';
import {fetchAllNotifications} from 'reducers/notificationsReducer';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';

const Tab = createBottomTabNavigator();

const getRouteIcon = (
  routeName: string,
  color: string,
): (({color, ...props}: SvgProps) => JSX.Element) => {
  let Icon = () => (
    <HomeIcon style={{marginTop: -5, color: color}} width={18} height={25} />
  );
  switch (routeName) {
    case 'Home':
      Icon = () => (
        <HomeIcon
          style={{marginTop: -5, color: color}}
          width={18}
          height={25}
        />
      );
      break;
    case 'Pending':
      Icon = () => (
        <CalendarIcon
          style={{marginTop: -5, color: color}}
          width={20}
          height={25}
        />
      );
      break;
    case 'Payment':
      Icon = () => (
        <PaymentIcon
          style={{marginTop: -5, color: color}}
          width={22}
          height={28}
        />
      );
      break;

    case 'Contacts':
      Icon = () => (
        <ContactsIcon
          style={{marginTop: -5, color: color}}
          width={20}
          height={25}
        />
      );
      break;
    case 'Search':
      Icon = () => (
        <SearchIcon
          style={{marginTop: -5, color: color}}
          width={20}
          height={25}
        />
      );
      break;
  }

  return Icon;
};

export const TabNavigator = () => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {loadAppointments} = useAppointmentService();

  const authUser = useSelector(authSelector).currentUser;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      loadAppointments();
      dispatch(fetchFriendProviders());
      dispatch(fetchAllProviders());
      dispatch(fetchAllNotifications(authUser.id));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <TourGuideZoneByPosition
        containerStyle={{
          top: Platform.OS == 'android' ? '100%' : '95%',
        }}
        zone={4}
        shape={'rectangle'}
        text="View and manage all of your appointments."
        isTourGuide={true}
      />
      <TourGuideZoneByPosition
        containerStyle={{
          top: Platform.OS == 'android' ? '100%' : '95%',
        }}
        zone={5}
        shape={'rectangle'}
        text="Easily and quickly pay all of your Pros."
        isTourGuide={true}
      />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.silverChalice,
          tabBarStyle: {backgroundColor: 'white'},
          tabBarIcon: ({color}) => {
            const Icon = getRouteIcon(route.name, color);
            return (
              <>
                <Icon />
              </>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Pending" component={Appointments} />
        <Tab.Screen name="Payment" component={PaymentStack} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Search" component={MapsMainStack} />
      </Tab.Navigator>
    </>
  );
};

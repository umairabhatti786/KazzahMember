import React, {useEffect} from 'react';
import {TabNavigator} from './TabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {TeamDetails, InputVerificationCode} from 'screens';
import {AddCard} from 'screens/AddCard';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import KazzahFeeds from '../screens/KazzahFeeds';
import AddProType from 'screens/AddProFlow/AddProType';
import AddContacts from 'screens/AddProFlow/AddContactFlow/AddContacts';
import AddBusinessName from 'screens/AddProFlow/AddContactFlow/AddBusinessName';
import AddAddress from 'screens/AddProFlow/AddContactFlow/AddAddress';
import ChooseService from 'screens/AddProFlow/ChooseService';
import AddYourPro from 'screens/AddProFlow/AddManuallyFlow/AddYourPro';
import {AddContactInformation} from 'screens/AddProFlow/AddManuallyFlow/AddContactInformation';
import YourTeams from 'screens/Yourteams';
import AddTeams from 'screens/AddTeams';
import PayReservationFess from 'screens/PayReservationFees';
import NoAppointmentsScreen from 'screens/NoAppointmentsScreen';
import NoPaymentScreen from 'screens/NoPaymentScreen';
import {PaymentStack} from './PaymentStack';
import AddTips from 'screens/AddTip';
import AddTipAmount from 'screens/AddTip/AddTipAmount';
import {ChooseType} from 'screens/AddContactFlow/ChooseType';
import {SelectMethod} from 'screens/AddContactFlow/SelectMethod';
import {ChooseContact} from 'screens/AddContactFlow/ChooseContact';
import AddContactName from 'screens/AddContactFlow/AddContactName';
import AddContactMobileNumber from 'screens/AddContactFlow/AddContactMobileNumber';
import {AddContactTeam} from 'screens/AddContactFlow/AddContactTeam';
import PaymentReview from 'screens/PaymentReview';
import UserProfile from 'screens/ProfileFlow';
import QRScreen from 'screens/ProfileFlow/QRScreen';
import {ProfileScreen} from 'screens/ProfileFlow/Profile';
import Address from 'screens/ProfileFlow/Address';
import {Password} from 'screens/ProfileFlow/Password';
import {Faq} from 'screens/ProfileFlow/FAQ';
import {AboutKazzah} from 'screens/ProfileFlow/AboutKazzah';
import {NotificationsScreen} from 'screens/ProfileFlow/Notification';
import TermsAndCondition from 'screens/TermsAndCondition';
import {DisplayScreen} from 'screens/ProfileFlow/Display';
import {PhotoScreen} from 'screens/ProfileFlow/PhotosScreen';

import {NotificationStack} from './NotificationStack';
import SearchNotification from 'screens/NotificationsFlow/SearchNotification';
import {MapsFilterStack} from './MapsFilterStack';
import {ExploreStack} from './ExploreStack';
import ProviderProfileScreen from 'screens/ProviderProfileScreen';
import {MapsMainStack} from './MapsMainStack';
import {ChatScreen} from 'screens/ChatFlow/ChatScreen';
import {ChatDetailScreen} from 'screens/ChatFlow/ChatDetailScreen';
import {AddChat} from 'screens/ChatFlow/AddChat';
import AddToTeams from 'screens/ProfileFlow/AddToTeams';
import AddDescription from 'screens/ProfileFlow/AddDescription';
import EditPhotoScreen from 'screens/ProfileFlow/EditPhotoScreen';
import MemberProfileScreen from 'screens/MemberProfileScreen';
import ProfileDetail from 'screens/ConnectedProviderProfileFlow/ProfileDetail';
import ProfileDocuments from 'screens/ConnectedProviderProfileFlow/ProfileDocuments';
import ProfilePhotos from 'screens/ConnectedProviderProfileFlow/ProfilePhotos';
import ProfileAppointments from 'screens/ConnectedProviderProfileFlow/ProfileAppointments';
import {ConnectedProviderProStack} from './ConnectedProviderProfileStack';
import CreditCard from 'screens/ProfileFlow/CreditCard';
import NonKazzahProfile from 'screens/NonKazzahProfile';
import QRCodeScreen from 'screens/ProfileFlow/QRCodeScreen';
import {QRCodeStack} from './QRCodeStack';
import AllServices from 'screens/TeamDetails/AllServices';
import SettingUp from 'screens/SettingUp';
import AddProContactNumber from 'screens/AddProFlow/AddContactFlow/AddProContactNumber';
import CardPrompt from 'screens/PayReservationFees/CardPrompt';
import NotificationDetail from 'screens/NotificationsFlow/NotificationDetail';
import {AddAppointmentStack} from './AddAppointmentStack';
import AppointmentDetail from 'screens/AddAppoinmentFlow/AppointmentDetail/insex';

const Stack = createStackNavigator();

const MainNavigator = () => {
  useEffect(() => {}, []);

  const currentUser = useSelector(authSelector).currentUser;

  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {!currentUser.isMobileVerified ? (
        <Stack.Screen
          name="InputVerificationCode"
          component={InputVerificationCode}
        />
      ) : null}
      {/* {!currentUser.email ? (
        <Stack.Screen name="SettingUp" component={SettingUp} />
      ) : null} */}

      <Stack.Screen
        name="Main"
        options={{
          headerShown: false,
        }}
        component={TabNavigator}
      />

      <Stack.Screen
        name="AddDescription"
        options={{
          headerShown: false,
        }}
        component={AddDescription}
      />
      <Stack.Screen
        name="AddAppointmentStack"
        options={{
          headerShown: false,
        }}
        component={AddAppointmentStack}
      />

      <Stack.Screen
        name="AddCard"
        options={{
          headerShown: false,
        }}
        component={AddCard}
      />

      <Stack.Screen
        name="TeamDetails"
        options={{
          headerShown: false,
        }}
        component={TeamDetails}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppointmentDetail"
        component={AppointmentDetail}
      />
      <Stack.Screen
        name="AllServices"
        options={{
          headerShown: false,
        }}
        component={AllServices}
      />
      <Stack.Screen
        name="QRCodeStack"
        options={{
          headerShown: false,
        }}
        component={QRCodeStack}
      />
      <Stack.Screen
        name="CardPrompt"
        options={{
          headerShown: false,
        }}
        component={CardPrompt}
      />
      <Stack.Screen
        name="QRCodeScreen"
        options={{
          headerShown: false,
        }}
        component={QRCodeScreen}
      />
      <Stack.Screen
        name="AddProType"
        options={{
          headerShown: false,
        }}
        component={AddProType}
      />
      <Stack.Screen
        name="AddContacts"
        options={{
          headerShown: false,
        }}
        component={AddContacts}
      />
      <Stack.Screen
        name="AddProContactNumber"
        options={{
          headerShown: false,
        }}
        component={AddProContactNumber}
      />
      <Stack.Screen
        name="AddBusinessName"
        options={{
          headerShown: false,
        }}
        component={AddBusinessName}
      />
      <Stack.Screen
        name="AddAddress"
        options={{
          headerShown: false,
        }}
        component={AddAddress}
      />
      <Stack.Screen
        name="ChooseService"
        options={{
          headerShown: false,
        }}
        component={ChooseService}
      />
      <Stack.Screen
        name="UserProfile"
        options={{
          headerShown: false,
        }}
        component={UserProfile}
      />
      <Stack.Screen
        name="ExploreStack"
        options={{
          headerShown: false,
        }}
        component={ExploreStack}
      />
      <Stack.Screen
        name="AddTipAmount"
        options={{
          headerShown: false,
        }}
        component={AddTipAmount}
      />

      <Stack.Screen
        name="NotificationStack"
        options={{
          headerShown: false,
        }}
        component={NotificationStack}
      />

      <Stack.Screen
        name="AddTips"
        options={{
          headerShown: false,
        }}
        component={AddTips}
      />
      <Stack.Screen
        name="CreditCard"
        options={{
          headerShown: false,
        }}
        component={CreditCard}
      />
      <Stack.Screen
        name="MapsFilterStack"
        options={{
          headerShown: false,
        }}
        component={MapsFilterStack}
      />
      <Stack.Screen
        name="PaymentStack"
        options={{
          headerShown: false,
        }}
        component={PaymentStack}
      />
      <Stack.Screen
        name="ConnectedProviderProStack"
        options={{
          headerShown: false,
        }}
        component={ConnectedProviderProStack}
      />
      <Stack.Screen
        name="SearchNotification"
        options={{
          headerShown: false,
        }}
        component={SearchNotification}
      />

      <Stack.Screen
        name="ProviderProfileScreen"
        options={{
          headerShown: false,
        }}
        component={ProviderProfileScreen}
      />
      <Stack.Screen
        name="MapsMainStack"
        options={{
          headerShown: false,
        }}
        component={MapsMainStack}
      />
      <Stack.Screen
        name="AddChat"
        options={{
          headerShown: false,
        }}
        component={AddChat}
      />
      <Stack.Screen
        name="ChatDetailScreen"
        options={{
          headerShown: false,
        }}
        component={ChatDetailScreen}
      />
      <Stack.Screen
        name="ChatScreen"
        options={{
          headerShown: false,
        }}
        component={ChatScreen}
      />
      <Stack.Screen
        name="PaymentReview"
        options={{
          headerShown: false,
        }}
        component={PaymentReview}
      />

      <Stack.Screen
        name="PayReservationFess"
        options={{
          headerShown: false,
        }}
        component={PayReservationFess}
      />
      <Stack.Screen
        name="NoPaymentScreen"
        options={{
          headerShown: false,
        }}
        component={NoPaymentScreen}
      />
      <Stack.Screen
        name="NoAppointmentsScreen"
        options={{
          headerShown: false,
        }}
        component={NoAppointmentsScreen}
      />
      <Stack.Screen
        name="ProfileDetail"
        options={{
          headerShown: false,
        }}
        component={ProfileDetail}
      />
      <Stack.Screen
        name="ProfileDocuments"
        options={{
          headerShown: false,
        }}
        component={ProfileDocuments}
      />
      <Stack.Screen
        name="ProfileAppointments"
        options={{
          headerShown: false,
        }}
        component={ProfileAppointments}
      />

      <Stack.Screen
        name="ProfilePhotos"
        options={{
          headerShown: false,
        }}
        component={ProfilePhotos}
      />

      <Stack.Screen
        name="KazzahFeeds"
        options={{
          headerShown: false,
        }}
        component={KazzahFeeds}
      />
      <Stack.Screen
        name="ChooseType"
        options={{
          headerShown: false,
        }}
        component={ChooseType}
      />
      <Stack.Screen
        name="SelectMethod"
        options={{
          headerShown: false,
        }}
        component={SelectMethod}
      />
      <Stack.Screen
        name="AddContactName"
        options={{
          headerShown: false,
        }}
        component={AddContactName}
      />
      <Stack.Screen
        name="AddContactMobileNumber"
        options={{
          headerShown: false,
        }}
        component={AddContactMobileNumber}
      />
      <Stack.Screen
        name="AddContactTeam"
        options={{
          headerShown: false,
        }}
        component={AddContactTeam}
      />
      <Stack.Screen
        name="ChooseContact"
        options={{
          headerShown: false,
        }}
        component={ChooseContact}
      />
      <Stack.Screen
        name="AddToTeams"
        options={{
          headerShown: false,
        }}
        component={AddToTeams}
      />
      <Stack.Screen
        name="EditPhotoScreen"
        options={{
          headerShown: false,
        }}
        component={EditPhotoScreen}
      />
      <Stack.Screen
        name="MemberProfileScreen"
        options={{
          headerShown: false,
        }}
        component={MemberProfileScreen}
      />
      <Stack.Screen
        name="YourTeams"
        options={{
          headerShown: false,
        }}
        component={YourTeams}
      />
      <Stack.Screen
        name="AddTeams"
        options={{
          headerShown: false,
        }}
        component={AddTeams}
      />
      <Stack.Screen
        name="AddYourPro"
        options={{
          headerShown: false,
        }}
        component={AddYourPro}
      />
      <Stack.Screen
        name="AddContactInformation"
        options={{
          headerShown: false,
        }}
        component={AddContactInformation}
      />

      <Stack.Screen
        name="DisplayScreen"
        options={{
          headerShown: false,
        }}
        component={DisplayScreen}
      />
      <Stack.Screen
        name="PhotoScreen"
        options={{
          headerShown: false,
        }}
        component={PhotoScreen}
      />
      <Stack.Screen
        name="AboutKazzah"
        options={{
          headerShown: false,
        }}
        component={AboutKazzah}
      />
      <Stack.Screen
        name="NotificationDetail"
        options={{
          headerShown: false,
        }}
        component={NotificationDetail}
      />
      <Stack.Screen
        name="TermsAndCondition"
        options={{
          headerShown: false,
        }}
        component={TermsAndCondition}
      />
      <Stack.Screen
        name="NotificationsScreen"
        options={{
          headerShown: false,
        }}
        component={NotificationsScreen}
      />
      <Stack.Screen
        name="Password"
        options={{
          headerShown: false,
        }}
        component={Password}
      />
      <Stack.Screen
        name="Faq"
        options={{
          headerShown: false,
        }}
        component={Faq}
      />

      <Stack.Screen
        name="Address"
        options={{
          headerShown: false,
        }}
        component={Address}
      />
      <Stack.Screen
        name="QRScreen"
        options={{
          headerShown: false,
        }}
        component={QRScreen}
      />
      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />

      <Stack.Screen
        name="NonKazzahProfile"
        options={{
          headerShown: false,
        }}
        component={NonKazzahProfile}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;

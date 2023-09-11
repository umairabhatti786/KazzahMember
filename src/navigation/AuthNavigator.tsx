import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login, IntroSlides} from 'screens';
import TermsAndCondition from 'screens/TermsAndCondition';
import PrivacyPolicy from 'screens/PrivacyPolicy';
import AddMobileNumber from 'screens/SignUpFlow/AddMobileNumber';
import AddName from 'screens/SignUpFlow/AddName';
import AddPassword from 'screens/SignUpFlow/AddPassword';
import VerifyMobileNumber from 'screens/SignUpFlow/VerifyMobileNumber';
import ForgotPassword from 'screens/SignUpFlow/ForgotPassword';
import ResetPasswords from 'screens/SignUpFlow/ResetPasswords';
import SettingUp from 'screens/SettingUp';

export type AuthStackParamList = {
  Login: undefined;
  IntroSlides: undefined;
  AddMobileNumber: undefined;
  AddName: undefined;
  AddPassword: undefined;
  VerifyMobileNumber: undefined;
  ForgotPassword: undefined;
  TermsAndCondition: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IntroSlides" component={IntroSlides} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddMobileNumber" component={AddMobileNumber} />
      <Stack.Screen name="AddName" component={AddName} />
      <Stack.Screen name="AddPassword" component={AddPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPasswords} />
      <Stack.Screen name="VerifyMobileNumber" component={VerifyMobileNumber} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SettingUp" component={SettingUp} />

      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

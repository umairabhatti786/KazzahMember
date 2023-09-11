import React, {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from './NavigationContainer';
import {AuthNavigator} from './AuthNavigator';
import {
  authSelector,
  getIsBioVerified,
  logIn,
  setIsBioVerified,
  setNotificationAlert,
} from 'reducers/authReducer';
import {useSelector, useDispatch} from 'react-redux';
import {Splash} from 'screens';
import MainNavigator from './MainNavigator';
import {GetProfile} from 'services/ProviderProfile';
import {getToken} from 'core/Auth/utils';
import {client, clientJson} from 'api/client';
import {firebaseService} from 'services/firebase/firebaseService';
import {Alert, AppState, Image, Platform, useColorScheme} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {scale} from 'react-native-size-matters';
import {
  loadCorrds,
  loadFeeds,
  loadRootServices,
  loadSyncedMember,
  loadSyncedProviders,
  requestUserPermission,
} from 'services/common';
import {DefaultTheme, useNavigation} from '@react-navigation/native';
import store from 'store';
import {
  getMedia,
  getVisibleKazzahChatModal,
  getVisibleMediaShare,
  setVisibleKazzahChatModal,
  setVisibleMediaShare,
} from 'reducers/mediaReducer';
import {Biometric} from 'screens/Biometric';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {PostUserDetails} from 'services/notification';
import {darkTheme, lightTheme} from 'theme/colors';
import {useToast} from 'react-native-toast-notifications';
import {fetchReservationTimeConfig} from 'reducers/configurationReducer';
import {fetchAllNotifications} from 'reducers/notificationsReducer';
import SimpleToast from 'react-native-simple-toast';

// import firebase from 'firebase';

const Stack = createStackNavigator();

export const Root = () => {
  let dispatch = useDispatch();
  let authState = useSelector(authSelector);
  const isBioVerified = useSelector(getIsBioVerified);

  const [isLoading, setIsLoading] = useState(true);
  // let token = getToken();

  const navigation = useNavigation();

  const navigateTo = (item: any) => {
    const event = item?.data.event;

    if (event) {
      if (event == 'PROFILE_COMPLETED') {
        navigation.navigate('EditProfile');
        return;
      }
      if (event == 'PRO_REQUEST') {
        return;
      }

      if (
        event == 'PRO_CONFIRM_APPOINTMENT' ||
        event == 'PRO_DECLINE_APPOINTMENT' ||
        event == 'PRO_REQUEST' ||
        event == 'PROVIDER_SEND_REBOOK_REMINDER' ||
        event == 'TRANSACTION_COMPLETE' ||
        event == 'RESERVATION_FEE_TRANSACTION_COMPLETE' ||
        event
      ) {
        navigation.navigate('Pending', {event});
      }
    }
  };

  useEffect(() => {
    if (authState.currentUser.id) {
      messaging().onMessage(data => {
        const {notification} = data;

        dispatch(setNotificationAlert(true));

        if (authState.currentUser.id) {
          dispatch(fetchAllNotifications(authState.currentUser.id));
        }

        if (authState.currentScreen == 'PayCash') {
          if (data?.data.event == 'TRANSACTION_COMPLETE') {
            navigation.navigate('Pending', {
              event: 'TRANSACTION_COMPLETE',
            });
          }
        }

        if (notification?.title == 'Payment Methods') {
          const appointmentParams = store.getState().auth.appointmentParams;
          if (appointmentParams) {
            const params = {
              ...appointmentParams,
              isPaymentOpen: true,
            };

            navigation.navigate('LastAppointmentButton', params);
            return;
          }
        }

        showMessage({
          message: notification?.title,
          description: notification?.body,
          type: 'info',
          backgroundColor: '#000000',
          duration: 5000,
          floating: true,
          iconProps: {style: {height: 50, width: 50, marginEnd: 10}},
          icon: props => (
            <Image source={require('../../assets/logo.png')} {...props} />
          ),
          onPress: () => navigateTo(data),
        });
      });
      messaging().onNotificationOpenedApp(data => {
        dispatch(setNotificationAlert(true));
        navigateTo(data);
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        dispatch(setNotificationAlert(true));
      });
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            dispatch(setNotificationAlert(true));
            navigateTo(remoteMessage);
          }
        });
    }
  }, [authState.currentUser.id]);

  const getUser = async () => {
    try {
      if (getToken()?.access) {
        const res = await GetProfile();

        const {success, data} = res.data;
        if (success) {
          let profile = res.data.data as any;
          profile['token'] = getToken().access;
          dispatch(logIn(profile));

          let body = {
            modelId: profile.id,
            modelType: 'client',
            deviceType: Platform.OS,
            deviceToken: '',
          };
          body.deviceToken = await messaging().getToken();

          PostUserDetails(body);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      }
    } catch (error) {
      console.log('🚀 ~ file: RootNavigator.tsx:74 ~ getUser ~ error:', error);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  };

  useEffect(() => {
    getUser();

    if (authState.isLoggedIn) {
      loadSyncedProviders();
      loadSyncedMember();
      loadRootServices();
      loadFeeds();
      loadCorrds();
    }
  }, []);

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, [1000]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      loadSyncedProviders();
      loadSyncedMember();
      loadRootServices();
      loadFeeds();
      loadCorrds();
      requestUserPermission();
    }
  }, [authState.isLoggedIn]);

  if (isLoading) {
    return <Splash />;
  }

  if (!isBioVerified) {
    return <Biometric />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: false,
        // animationTypeForReplace: status === 'signIn' ? 'push' : 'pop',
      }}
    >
      {authState.isLoggedIn ? (
        <Stack.Screen
          name="App"
          options={{
            headerShown: false,
          }}
          component={MainNavigator}
        />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch(fetchReservationTimeConfig());

    firebaseService.signIn().then(() => {});
  }, []);
  client.interceptors.request.use(
    (config: any) => {
      const auth = getToken();
      if (auth && auth.access) {
        config.headers.Authorization = `Bearer ${auth.access}`;
      }

      return config;
    },
    (err: any) => Promise.reject('Interceptior : ' + err),
  );

  clientJson.interceptors.request.use(
    (config: any) => {
      const auth = getToken();
      if (auth && auth.access) {
        config.headers.Authorization = `Bearer ${auth.access}`;
      }

      return config;
    },
    (err: any) => Promise.reject('Interceptior : ' + err),
  );

  const media = useSelector(getMedia);
  const visibleMediaShare = useSelector(getVisibleMediaShare);
  const visibleKazzahChatModal = useSelector(getVisibleKazzahChatModal);

  const toggleKazzahChatModal = () => {
    dispatch(setVisibleKazzahChatModal(!visibleKazzahChatModal));
  };

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

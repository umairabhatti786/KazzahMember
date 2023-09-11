import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {useDispatch} from 'react-redux';
import GeneralNotification from 'screens/NotificationsFlow/GeneralNotification';
import InvitationNotification from 'screens/NotificationsFlow/InvitationNotification';
import ProductUpdatesNotification from 'screens/NotificationsFlow/ProductUpdatesNotification';
import AdsNotification from 'screens/NotificationsFlow/AdsNotification';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {useSelector} from 'react-redux';
import {
  fetchAllNotifications,
  notificationsSelector,
} from 'reducers/notificationsReducer';
import {authSelector, setNotificationAlert} from 'reducers/authReducer';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const NotificationStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const notificationsList = useSelector(notificationsSelector);

  const authUser = useSelector(authSelector).currentUser;

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchAllNotifications(authUser.id));
      dispatch(setNotificationAlert(false));
    });

    return unsubscribe;
  }, []);

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        <BackButtonHeader
          showPages={false}
          showSearch={true}
          onSearch={() => props.navigation.navigate('SearchNotification')}
        />
        <Title title="Notifications" />
        <View height={verticalScale(10)} />

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
                        }}
                      >
                        <Text
                          style={[
                            textStyle.cta2,
                            {
                              color: isFocused
                                ? colors.black
                                : colors.silverChalice,
                            },
                          ]}
                        >
                          {index == 0
                            ? `${item.name} (${notificationsList.length})`
                            : `${item.name} (${0})`}
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
            name="General"
            component={GeneralNotification}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Invitations"
            component={InvitationNotification}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Product updates"
            component={ProductUpdatesNotification}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Ads"
            component={AdsNotification}
          />
        </Tab.Navigator>
      </View>
    </Screen>
  );
};

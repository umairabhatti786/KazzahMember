import React from 'react';
import {View, Pressable, Text} from 'ui';
import {scale} from 'react-native-size-matters';
import {navigationRef} from 'navigation/NavigationContainer';
import {useNavigation, useTheme} from '@react-navigation/native';
import {getNotificationAlert} from 'reducers/authReducer';
import {useSelector} from 'react-redux';
import PersonIcon from '../../assets/PersonIcon.svg';
import BellIcon from '../../assets/BellIcon.svg';
import BellIconWithDot from '../../assets/BellIconWithDot.svg';
import MessageIcon from '../../assets/MessageIcon.svg';
import AppLogo from 'newComponents/AppLogo';

const AppInnerHeader = () => {
  const navigation = useNavigation();
  const notificationAlert = useSelector(getNotificationAlert);
  const {colors} = useTheme();
  return (
    <View
      flexDirection={'row'}
      alignItems="center"
      justifyContent={'space-between'}
      style={{backgroundColor: colors.background}}
      height={scale(40)}
      paddingHorizontal={'xxl'}
    >
      <Pressable
        // onPress={() => navigation.navigate('UserProfile')}
        flex={1}
        alignItems={'flex-start'}
      >
        <AppLogo />
      </Pressable>
      <View
        flexDirection={'row'}
        flex={1}
        justifyContent={'flex-end'}
        alignItems={'center'}
      >
        <Pressable
          width={scale(30)}
          height={scale(30)}
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => navigation.navigate('UserProfile')}
        >
          <PersonIcon style={{color: colors.black}} />
        </Pressable>

        <View width={scale(5)} />
        <Pressable
          onPress={() => {
            navigationRef.current.navigate('NotificationStack');
          }}
          width={scale(30)}
          height={scale(30)}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {notificationAlert ? (
            <BellIconWithDot style={{color: colors.black}} />
          ) : (
            <BellIcon style={{color: colors.black}} />
          )}
        </Pressable>

        <View width={scale(5)} />
        <Pressable
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}
          width={scale(30)}
          height={scale(30)}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <MessageIcon style={{color: colors.black}} />
        </Pressable>
      </View>
    </View>
  );
};
export default AppInnerHeader;

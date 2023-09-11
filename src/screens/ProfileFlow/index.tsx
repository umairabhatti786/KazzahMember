import BackButtonHeader from 'newComponents/BackButtonHeader';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Screen} from 'ui';
import ProfileInfoHeader from './ProfileInfoHeader';
import SettingDetail from './SettingDetail';
import {ProfileImage, ProfileSetting} from './SettingListData';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import {useNavigation} from '@react-navigation/native';

const UserProfile = () => {
  const authState = useSelector(authSelector);
  const navigation = useNavigation();

  const backPress = () => {
    navigation.navigate('Home');
  };

  return (
    <Screen backgroundColor={'white'} edges={['right', 'top', 'left']}>
      <BackButtonHeader
        showQRCode={true}
        showPages={false}
        showCancel={false}
      />
      <ProfileInfoHeader ProviderDetail={authState.currentUser} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{height: scale(950)}}
      >
        <SettingDetail ProfileSetting={ProfileSetting} />
      </ScrollView>
    </Screen>
  );
};

export default UserProfile;

import React from 'react';
import {Screen, Text, View} from 'ui';
import {ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from '../../newComponents/BackButtonHeader';
import {scale} from 'react-native-size-matters';
import {NotificationListData} from './SettingListData';
import NotificationList from './NotificationList';
import textStyle from 'theme/typoGraphy';

export const NotificationsScreen = () => {
  const {colors} = useTheme();

  return (
    <Screen
      backgroundColor={colors.background}
      edges={['right', 'top', 'left']}>
      <BackButtonHeader showSave={true} showPages={false} />
      <Title title="Notifications" />
      <View height={scale(20)} />
      <Text
        style={[textStyle.h3, {color: colors.black, marginLeft: scale(30)}]}>
        Push
      </Text>
      <View height={scale(15)} />
      <ScrollView contentContainerStyle={{paddingBottom: scale(50)}}>
        <Wrapper
          animation="fadeInUp"
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: scale(30),
            }}>
            {NotificationListData.map((item, index) => {
              return <NotificationList item={item} index={index} />;
            })}
          </ScrollView>
        </Wrapper>
      </ScrollView>
    </Screen>
  );
};

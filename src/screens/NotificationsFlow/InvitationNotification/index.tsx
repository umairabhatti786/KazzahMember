import React, {useEffect} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, Alert, Image, StyleSheet, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InvitationCard from './InvitationCard';

const InvitationNotification = (props: any) => {
  const {colors} = useTheme();

  const notification = [
    {
      id: 1,
      firstName: 'Umair',
      lastName: 'abbas',
      rootService: 'Beauty',
      message:
        'Your upcoming appointment with Pro Mike McCarthy for today at 11:00a is confirmed is confirmed is confirmed  is confirmed is confirmed',
      date: '1 hour ago',
    },
  ];

  return (
    <View style={{paddingHorizontal: '6%'}}>
      <View height={scale(15)} />

      <ScrollView
        contentContainerStyle={{height: '100%', paddingBottom: scale(50)}}>
        <View height={0.5} style={{backgroundColor: colors.silverChalice}} />
        <FlatList
          data={notification}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <InvitationCard
                onCardPress={() => {
                  props.navigation.navigate('NotificationDetail', {
                    isNotification: true,
                  });
                }}
                item={item}
                index={index}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default InvitationNotification;

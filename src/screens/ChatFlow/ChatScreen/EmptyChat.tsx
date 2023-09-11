import React, {useState, useMemo, useEffect} from 'react';
import {Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import {Title} from 'newComponents/TextComponents';
import EmptyChatIcon from '../../../../src/assets/EmptyChatIcon.svg';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';

export const EmptyChat = (props: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  return (
    <>
      <View
        flex={1}
        style={{
          backgroundColor: colors.background,
          alignItems: 'center',
          width: '75%',
          alignSelf: 'center',
          marginTop: '30%',
        }}>
        <EmptyChatIcon width={scale(100)} height={scale(100)} />

        <Title
          style={{
            textAlign: 'center',
            marginTop: verticalScale(-20),
            marginHorizontal: scale(10),
          }}
          title={'Invite your trusted Pros and friends.'}
        />
        

        <Text
          style={[textStyle.b3, {alignItems: 'center', textAlign: 'center'}]}>
          Build your connections by inviting your trusted pros and friends so
          you can activate your chat with your personal network.
        </Text>

        <View height={scale(20)} />
        <Button
          label="Add Chat"
          width={'60%'}
          onPress={() => props.navigation.navigate('AddChat')}
        />
      </View>
    </>
  );
};

import React, {useState, useMemo, useEffect} from 'react';
import {Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import {Title} from 'newComponents/TextComponents';
import NoAppointment from '../../../src/assets/NoAppointment.svg';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';

export const EmptyAppointment = (props: any) => {
  const {colors} = useTheme();

  const navigation = useNavigation();

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
        }}
      >
        <NoAppointment width={scale(100)} height={scale(100)} />

        <Title
          style={{
            textAlign: 'center',
            marginTop: verticalScale(-20),
            marginHorizontal: scale(10),
          }}
          title={'Access to all your Pros in one platform'}
        />

        <Text
          style={[textStyle.b3, {alignItems: 'center', textAlign: 'center'}]}
        >
          Build your connections by inviting your trusted pros and friends so
          you can activate your chat with your personal network.
        </Text>

        <View height={scale(30)} />
        <Button
          onPress={() => navigation.navigate('AddProType')}
          label="Add Pro"
          width={'50%'}
        />
      </View>
    </>
  );
};

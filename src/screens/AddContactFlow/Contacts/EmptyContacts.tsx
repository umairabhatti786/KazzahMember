import React, {useState, useMemo, useEffect} from 'react';
import {Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import {Title} from 'newComponents/TextComponents';
import AddTrustIcon from '../../../../src/assets/AddTrustIcon.svg';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';

export const EmptyContacts = () => {
  const dispatch = useDispatch();
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
        <AddTrustIcon width={scale(100)} height={scale(100)} />

        <Title
          style={{
            textAlign: 'center',
            marginTop: verticalScale(-20),
          }}
          title={'Invite your trusted Pros and friends.'}
        />
        <Text
          style={[
            textStyle.b3,
            {alignItems: 'center', textAlign: 'center', color: colors.black},
          ]}
        >
          Add your trusted Pros for a central platform to schedule, book and
          pay.
        </Text>
        <View height={scale(20)} />

        <Text
          style={[
            textStyle.b3,
            {alignItems: 'center', textAlign: 'center', color: colors.black},
          ]}
        >
          Connect with your friends to share trusted resources.
        </Text>

        <View height={scale(20)} />
        <Button
          label="Add contact"
          width={'50%'}
          onPress={() => navigation.navigate('ChooseType')}
        />
      </View>
    </>
  );
};

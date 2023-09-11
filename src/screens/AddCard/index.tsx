import {baseURL} from 'api/client';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';

import React from 'react';
import {scale} from 'react-native-size-matters';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {authSelector} from 'reducers/authReducer';
import {View, Text, Screen} from 'ui';

export const AddCard = ({navigation, route}: any) => {
  const authState = useSelector(authSelector);
  const url = `${baseURL}payment-collector/client/${authState.currentUser.id}/${authState.currentUser.token}`;

  console.log('🚀 ~ file: index.tsx:17 ~ AddCard ~ url:', url);
  return (
    <Screen edges={['right', 'top', 'left']}>
      <BackButtonHeader showPages={false} />
      <Title title={'Add Card'} />

      <WebView
        source={{
          uri: url,
        }}
      />
    </Screen>
  );
};

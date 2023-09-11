import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
import textStyle from 'theme/typoGraphy';
import {Text, View} from 'ui';

const customToasts = {
  success_custom: (toast: ToastProps) => (
    <View
      style={{
        padding: 15,
        backgroundColor: '#81BF77',
        height: verticalScale(50),
        width: scale(300),
        justifyContent: 'center',
        borderRadius: 7,
      }}
    >
      <Text style={[textStyle.b4, {color: '#ffffff'}]}>{toast.message}</Text>
    </View>
  ),
  error_custom: (toast: ToastProps) => (
    <View
      style={{
        padding: 15,
        backgroundColor: '#FF5555',
        minWidth: verticalScale(50),
        maxHeight: verticalScale(70),
        width: scale(300),
        justifyContent: 'center',
        borderRadius: 7,
      }}
    >
      <Text style={[textStyle.b4, {color: '#ffffff'}]}>{toast.message}</Text>
    </View>
  ),
};

export default customToasts;

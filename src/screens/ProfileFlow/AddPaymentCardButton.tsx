import React from 'react';
import {Text} from 'ui';
import {scale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {Platform, TouchableOpacity} from 'react-native';

type Props = {
  onPress: () => void;
};

const AddPaymentCardButton = ({onPress}: Props) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        alignSelf: 'flex-end',
        borderRadius: scale(60),
        width: scale(45),
        height: scale(45),
        alignItems: 'center',
        justifyContent: 'center',
        end: '5%',
        backgroundColor: colors.black,
      }}>
      <Text
        style={[
          textStyle.h2,
          {
            color: colors.background,
            marginTop: Platform.OS === 'ios' ? scale(10) : 0,
          },
        ]}>
        +
      </Text>
    </TouchableOpacity>
  );
};

export default AddPaymentCardButton;

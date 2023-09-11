import React from 'react';
import {Pressable, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {Platform, TouchableOpacity} from 'react-native';

type Props = {
  onPress: any;
  bottom?: any;
};

const AddAppointment = ({onPress, bottom}: Props) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        position: 'absolute',
        bottom: bottom || '2%',
        right: 0,
        alignSelf: 'flex-end',
        borderRadius: scale(60),
        width: scale(50),
        height: scale(50),
        alignItems: 'center',
        justifyContent: 'center',
        end: '5%',
        backgroundColor: colors.black,
      }}
    >
      <Text
        style={[
          textStyle.h2,
          {
            color: colors.background,
            marginTop: Platform.OS === 'ios' ? scale(10) : null,
          },
        ]}
      >
        +
      </Text>
    </TouchableOpacity>
  );
};

export default AddAppointment;

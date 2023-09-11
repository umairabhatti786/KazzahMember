import React, {useState} from 'react';
import {Text, theme, View} from 'ui';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
const MessageTime = ({time}: any) => {
  const {colors} = useTheme();

  return (
    <View style={{marginVertical: verticalScale(10)}}>
      <Text
        style={[
          textStyle.b4,
          {
            color: colors.silverChalice,
            alignSelf: 'center',
          },
        ]}>
        {time}
      </Text>
    </View>
  );
};

export default MessageTime;

const styles = StyleSheet.create({});

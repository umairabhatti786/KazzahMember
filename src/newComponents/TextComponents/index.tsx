import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';

type TitleProps = {
  title: string;
  description?: string;
  style?: StyleProp<TextStyle>;
};

export const Title = ({title, style, description}: TitleProps) => {
  const {colors} = useTheme();

  return (
    <View style={{marginHorizontal: '6%'}}>
      <View height={scale(40)} />
      <Text style={[textStyle.h1, {color: colors.black}, style]}>{title}</Text>
      {description ? (
        <>
          <View height={scale(5)} />
          <Text style={[textStyle.b3, {color: colors.black}]}>
            {description}
          </Text>
        </>
      ) : null}

      <View height={scale(10)} />
    </View>
  );
};

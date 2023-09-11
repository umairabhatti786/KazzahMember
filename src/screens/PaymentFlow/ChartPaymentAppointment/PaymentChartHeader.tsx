import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {View, Text, Pressable} from 'ui';
import SettingIcon from '../../../assets/SettingIcon.svg';

interface Props {
  headingLabelRight: string;
  leftHeadingIconSize?: {height: number; width: number};
  onPressLeftHeading?: any;
  leftHeadingIconStyle?: StyleProp<ViewStyle>;
}

const PaymentChartHeader = ({
  headingLabelRight,
  leftHeadingIconSize = {height: 10, width: 10},
  leftHeadingIconStyle = {marginStart: 5},
  onPressLeftHeading,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      height={scale(40)}
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      paddingTop={'xs'}
      paddingHorizontal={'4xl'}>
      <Text style={[textStyle.h3, {color: colors.black}]}>
        {headingLabelRight}
      </Text>
      <Pressable
        height={verticalScale(25)}
        marginRight={'xs'}
        flexDirection={'row'}
        alignItems={'center'}
        onPress={onPressLeftHeading}
        justifyContent={'space-between'}>
        <SettingIcon
          style={leftHeadingIconStyle}
          height={leftHeadingIconSize.height}
          width={leftHeadingIconSize.width}
        />
      </Pressable>
    </View>
  );
};

export default PaymentChartHeader;

import React from 'react';
import {Text, View, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import NavigateArrowIcon from '../../assets/NavigateArrowIcon.svg';
import {SvgProps} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {TourGuideZone, TourGuideZoneByPosition} from 'rn-tourguide';

interface Props {
  headingLabelRight: string;
  headingLabelLeft: string;
  leftHeadingIcon?: React.FC<SvgProps>;
  leftHeadingIconSize?: {height: number; width: number};
  onPressLeftHeading?: any;
  leftHeadingIconStyle?: StyleProp<ViewStyle>;
}

const InnerScreenHeader = ({
  headingLabelRight,
  headingLabelLeft,
  leftHeadingIcon: LeftHeadingIcon = NavigateArrowIcon,
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
    // style={{marginTop:-5}}
      paddingHorizontal={'4xl'}>
      <Text style={[textStyle.h3, {color: colors.black}]}>
        {headingLabelRight}
      </Text>

      <Pressable
        height={verticalScale(25)}
        flexDirection={'row'}
        alignItems={'center'}
        onPress={onPressLeftHeading}
        justifyContent={'space-between'}>
        <Text style={[textStyle.cta2, {color: colors.black}]}>
          {headingLabelLeft}
        </Text>
        <LeftHeadingIcon
          style={leftHeadingIconStyle}
          height={leftHeadingIconSize.height}
          width={leftHeadingIconSize.width}
        />
      </Pressable>
    </View>
  );
};

export default InnerScreenHeader;

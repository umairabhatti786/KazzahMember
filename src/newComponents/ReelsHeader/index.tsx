import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Platform} from 'react-native';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Pressable, Text, View} from 'ui';
import ReelsBackArrow from '../../assets/ReelsBackArrow.svg';
import ReelsHeaderShadow from '../../assets/ReelsHeaderShadow.svg';
interface Props {
  onPress: () => void;
  media: any;
}

const ReelsHeader = ({onPress, media}: Props) => {
  const {colors} = useTheme();

  console.log('media?.createdAt', media?.createdAt, media?.id);
  var date = moment(media?.createdAt).calendar(null, {
    sameDay: '[Today]',
    currentWeek: 'dddd',
    lastDay: 'dddd',
    lastWeek: 'dddd',
    sameElse: 'dddd, MMMM DD, YYYY',
  });

  return (
    <View height={scale(110)} width={'100%'}>
      <ReelsHeaderShadow height={scale(178)} width={'100%'} />
      <View
        flexDirection={'row'}
        height={scale(40)}
        style={{marginTop: Platform.OS === 'ios' ? '10%' : '2%'}}
        alignItems={'center'}
        position={'absolute'}
        top={scale(20)}
        justifyContent={'space-between'}
        paddingHorizontal={'4xl'}
        width={'100%'}>
        <Pressable onPress={onPress}>
          <ReelsBackArrow width={25} height={15} />
        </Pressable>

        <Text
          style={[textStyle.b4, {color: colors.background, fontWeight: '600'}]}>
          {date}
        </Text>
      </View>
    </View>
  );
};

export default ReelsHeader;

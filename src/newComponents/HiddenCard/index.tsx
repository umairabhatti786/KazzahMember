import React, {useEffect} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {Alert, FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {getPaidPayment} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';
import TrashIcon from '../../../src/assets/TrashIcon';

const HiddenCard = (props: any) => {
  const {colors} = useTheme();
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        height: '100%',
        width: scale(70),
        alignSelf: 'flex-end',
        //   backgroundColor:"red"
      }}
      justifyContent="center"
      alignItems={'center'}>
      <Animated.View
        style={{
          width: scale(45),
          height: scale(45),
          borderRadius: 100,
          backgroundColor: colors.red,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TrashIcon width={scale(20)} height={scale(20)} />
      </Animated.View>
      
    </Pressable>
  );
};

export default HiddenCard;

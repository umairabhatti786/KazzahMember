import React, {useEffect} from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, ScrollView} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {fetchUnPaidPayment, getUnPaidPayment} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import AdsItem from './AdsItem';

const AdsNotification = () => {
  const {colors} = useTheme();

  const unPaidPayment = useSelector(getUnPaidPayment);

  console.log('paidPayment', unPaidPayment);

  return (
    <View style={{paddingHorizontal: '6%'}}>
      <View height={scale(15)} />
      <ScrollView
        contentContainerStyle={{height: '100%', paddingBottom: scale(50)}}
        showsVerticalScrollIndicator={false}>
        <AdsItem />
      </ScrollView>
    </View>
  );
};

export default AdsNotification;

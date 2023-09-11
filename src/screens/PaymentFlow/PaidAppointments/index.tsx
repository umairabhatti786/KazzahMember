import React, {useEffect, useState} from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {ActivityIndicator, FlatList} from 'react-native';
import PaidAppointmentCard from './PaidApppointmentCard';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {
  fetchPaidPayment,
  getPaidPayment,
  getPaidPaymentLoading,
} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import AlphabetOrder from 'newComponents/AlphabetOrder';
import _ from 'lodash';
import {useDispatch} from 'react-redux';

const PaidAppointments = () => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [paidPaymentList, setPaidPaymentList] = useState([]);
  const loading = useSelector(getPaidPaymentLoading);
  const [sortOrder, setSortOrder] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      paidPayment();
    });

    return unsubscribe;
  }, []);

  async function paidPayment() {
    await dispatch(fetchPaidPayment())
      .unwrap()
      .then((originalPromiseResult: any) => {
        // console.log('conatctslist', originalPromiseResult);
        setPaidPaymentList(originalPromiseResult);
        // handle result here
      })
      .catch((rejectedValueOrSerializedError: any) => {
        console.log(
          'rejectedValueOrSerializedError',
          rejectedValueOrSerializedError,
        );

        // handle error here
      });
  }

  const onSort = () => {
    setSortOrder(!sortOrder);
    const newSortOrder = !sortOrder ? 'desc' : 'asc';
    const sortedPayment = _.orderBy(
      paidPaymentList,
      item => item?.appointmentDate?.toLowerCase(),
      [newSortOrder],
    );
    setPaidPaymentList(sortedPayment);
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            height: '80%',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.black} />
        </View>
      ) : (
        <View flex={1} alignItems={'center'}>
          <View height={scale(28)} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              start: scale(20),
            }}>
            <AlphabetOrder
              orderTest="Newest"
              onPress={onSort}
              sortOrder={sortOrder}
            />

            {/* <Text style={[textStyle.h3, {color: colors.black}]}>Newest</Text>
          <View width={scale(4)} />
          <ArrowDown
            style={{marginBottom: scale(6)}}
            color={colors.black}
            height={scale(9)}
            width={scale(9)}
          /> */}
          </View>
          <FlatList
            data={paidPaymentList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return <PaidAppointmentCard item={item} index={index} />;
            }}
            keyExtractor={(item, index) => item + index.toString()}
          />
        </View>
      )}
    </>
  );
};

export default PaidAppointments;

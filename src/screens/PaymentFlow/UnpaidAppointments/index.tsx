import React, {useEffect, useState} from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {ActivityIndicator, FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import UnpaidAppointmentCard from './UnpaidAppointmentCard';
import {
  fetchUnPaidPayment,
  getUnPaidPayment,
  getUnPaidPaymentLoading,
} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import AlphabetOrder from 'newComponents/AlphabetOrder';
import {useDispatch} from 'react-redux';

const UnpaidAppointments = () => {
  const {colors} = useTheme();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [unPaymentList, setUnPaymentList] = useState([]);
  const loading = useSelector(getUnPaidPaymentLoading);
  const [sortOrder, setSortOrder] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      unPaidPayment();
    });

    return unsubscribe;
  }, []);

  async function unPaidPayment() {
    await dispatch(fetchUnPaidPayment())
      .unwrap()
      .then((originalPromiseResult: any) => {
        // console.log('conatctslist', originalPromiseResult);
        setUnPaymentList(originalPromiseResult);
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
      unPaymentList,
      item => item?.appointmentDate?.toLowerCase(),
      [newSortOrder],
    );
    setUnPaymentList(sortedPayment);
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
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={unPaymentList}
            renderItem={({item, index}) => {
              return <UnpaidAppointmentCard item={item} index={index} />;
            }}
            keyExtractor={(item, index) => item + index.toString()}
          />
        </View>
      )}
    </>
  );
};

export default UnpaidAppointments;

import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Screen, Text, View} from 'ui';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import AppInnerHeader from 'newComponents/AppHeader';
import ChartPaymentAppointment from 'screens/PaymentFlow/ChartPaymentAppointment';
import UnpaidAppointments from 'screens/PaymentFlow/UnpaidAppointments';
import PaidAppointments from 'screens/PaymentFlow/PaidAppointments';
import {useSelector} from 'react-redux';
import {
  fetchPaidPayment,
  fetchUnPaidPayment,
  getUnPaidPayment,
  getUnPaidPaymentLoading,
  getUnpaidPaymentCount,
} from 'reducers/PaymentReducer';
import {useDispatch} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const PaymentStack: React.FC<Props> = props => {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const unPaidPayment = useSelector(getUnPaidPayment);
  const paymentLoading = useSelector(getUnPaidPaymentLoading);
  const paymentCount = useSelector(getUnpaidPaymentCount);
  const [isFetching, setIsFetching] = useState(false);

  console.log('paymentLoadingpaymentLoading', paymentLoading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      dispatch(fetchUnPaidPayment());
      dispatch(fetchPaidPayment());
      setIsFetching(true);
    });

    return unsubscribe;
  }, []);
  const unPaidLength =
    unPaidPayment.length == undefined ? '' : unPaidPayment.length;

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}
      >
        <AppInnerHeader />
        <Title title="Payments" />
        <View height={verticalScale(10)} />

        <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
          }}
          tabBar={props => {
            return (
              <View
                style={{marginLeft: '6%'}}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'row'}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {props.state.routes.map((item, index) => {
                    const isFocused = props.state.index === index;

                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate(item.name)}
                        style={{
                          paddingHorizontal:
                            index === 1 ? scale(30) : scale(20),
                          alignItems: 'center',
                          paddingVertical: scale(12),
                          borderRadius: scale(20),
                          borderWidth: 1,
                          borderColor: isFocused
                            ? colors.black
                            : colors.silverChalice,

                          justifyContent: 'center',
                          marginRight: scale(15),
                        }}
                      >
                        <Text
                          style={[
                            textStyle.cta2,
                            {
                              color: isFocused
                                ? colors.black
                                : colors.silverChalice,
                            },
                          ]}
                        >
                          {index == 1
                            ? paymentCount == undefined
                              ? 'Unpaid'
                              : `Unpaid  (${paymentCount})`
                            : item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            );
          }}
        >
          <Tab.Screen
            initialParams={{isComplete: false}}
            name="Paid"
            component={PaidAppointments}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Unpaid"
            component={UnpaidAppointments}
          />
          <Tab.Screen
            initialParams={{isComplete: true}}
            name="Spend"
            component={ChartPaymentAppointment}
          />
        </Tab.Navigator>
      </View>
    </Screen>
  );
};

import {useNavigation, useTheme} from '@react-navigation/native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PaymentIcon} from 'react-native-payment-icons';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import SelectIcon from '../../assets/SelectIcon.svg';
import {Screen, Pressable, View, Text} from 'ui';
import Button from 'newComponents/Button';
import {GetCards} from 'services/Payment';
import NoPaymentScreen from 'screens/NoPaymentScreen';
import {useDispatch} from 'react-redux';
import {
  fetchPaymentCard,
  getPaymentCard,
  setSelectedCard,
} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import NoCards from './NoCards';
import CashIcon from '../../../src/assets/CashIcon.svg';
import SimpleToast from 'react-native-simple-toast';
import TimeCounter from 'newComponents/TimeCounter';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';
import AddPaymentCardButton from 'screens/ProfileFlow/AddPaymentCardButton';
import {getAddAppointment} from 'reducers/addAppointmentReducer';

const PayReservationFess = props => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const choosePaymentProp = props?.route?.params?.choosePayment;
  console.log(
    '🚀 ~ file: index.tsx:30 ~ PayReservationFess ~ choosePaymentProp:',
    choosePaymentProp,
  );
  const appointmentId = props?.route?.params?.appointmentId;
  const paymentType = props?.route?.params?.paymentType;
  const isReservationFee = useSelector(getAddAppointment).isReservationFee;

  const [selectCard, setSelectCard] = useState();

  const cardsList = useSelector(getPaymentCard);
  const navigation = useNavigation();
  const serverAppointment = useSelector(getAppointmentDetails);

  useEffect(() => {
    dispatch(fetchPaymentCard());
  }, []);
  const onAddCardButton = () => {
    navigation.navigate('CardPrompt');
  };

  const submit = () => {
    if (!selectCard) {
      SimpleToast.show('Please select payment method');

      return;
    }

    const selectedCard = {
      cardId: selectCard,
      appointmentId: appointmentId,
      paymentType: paymentType,
    };

    dispatch(setSelectedCard(selectedCard));
    if (choosePaymentProp) {
      navigation.navigate('AddTips');
    } else {
      navigation.navigate('ReviewDetails');
    }
  };
  return (
    <Screen edges={['right', 'top', 'left']}>
      {cardsList?.length == 0 ? (
        <>
          <NoCards navigation={navigation} />
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
            }}
          >
            {choosePaymentProp ? (
              <BackButtonHeader showPages={false} />
            ) : (
              <BackButtonHeader
                current="5"
                total={isReservationFee ? '6' : '5'}
                showCancel={true}
                onCancelPress={() => navigation.navigate('Pending')}
              />
            )}

            {choosePaymentProp ? (
              <Pressable>
                <Title title="Choose payment" />
              </Pressable>
            ) : (
              <Title title="Pay reservation fee" />
            )}
            {choosePaymentProp ? null : (
              <View style={{paddingHorizontal: '6%'}}>
                {/* <TimeCounter /> */}
              </View>
            )}

            <View height={verticalScale(40)} />
            <View style={{marginLeft: '7%'}}>
              <Text
                style={[
                  textStyle.cta1,
                  {color: colors.black, marginBottom: scale(5)},
                ]}
              >
                Payment method
              </Text>
            </View>

            <View alignItems={'center'} justifyContent={'center'}>
              <ScrollView
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <View>
                  {cardsList.map((item, index) => {
                    return (
                      <Pressable
                        key={index.toString()}
                        onPress={() => {
                          setSelectCard(item.id);
                        }}
                        style={styles.cardContainer}
                      >
                        <View
                          alignItems={'center'}
                          justifyContent={'center'}
                          flex={1}
                        >
                          {selectCard == item.id ? (
                            <SelectIcon
                              style={{marginTop: scale(7)}}
                              width={scale(65)}
                              height={scale(65)}
                            />
                          ) : (
                            <View
                              style={{
                                borderColor: colors.black,
                                borderWidth: 2,
                              }}
                              height={scale(20)}
                              width={scale(20)}
                              borderRadius={scale(50)}
                            />
                          )}
                        </View>

                        <View
                          flex={3}
                          justifyContent={'center'}
                          flexDirection={'column'}
                        >
                          <Text
                            style={[
                              textStyle.b3,
                              {
                                color: colors.black,
                                textTransform: 'capitalize',
                              },
                            ]}
                          >
                            {item.cardBrand}
                          </Text>
                          <Text
                            style={{
                              color: colors.silverChalice,
                            }}
                          >
                            {`Card ending in ${item.lastFourDigits}`}
                          </Text>
                        </View>
                        <View
                          justifyContent={'center'}
                          alignItems={'center'}
                          flex={1}
                        >
                          <PaymentIcon type={item.cardBrand?.toLowerCase()} />
                        </View>
                      </Pressable>
                    );
                  })}

                  {paymentType == 'af' ? (
                    <Pressable
                      onPress={() => {
                        setSelectCard('cash');
                      }}
                      style={styles.cardContainer}
                    >
                      <View
                        alignItems={'center'}
                        justifyContent={'center'}
                        flex={1}
                      >
                        {selectCard == 'cash' ? (
                          <SelectIcon
                            style={{marginTop: scale(7)}}
                            width={scale(65)}
                            height={scale(65)}
                          />
                        ) : (
                          <View
                            style={{
                              borderColor: colors.black,
                              borderWidth: 2,
                            }}
                            height={scale(20)}
                            width={scale(20)}
                            borderRadius={scale(50)}
                          />
                        )}
                      </View>

                      <View
                        flex={3}
                        justifyContent={'center'}
                        flexDirection={'column'}
                      >
                        <Text
                          style={[
                            textStyle.b3,
                            {
                              color: colors.black,
                            },
                          ]}
                        >
                          Cash
                        </Text>
                        <Text
                          style={{
                            color: colors.silverChalice,
                          }}
                        >
                          Lorem ipsum
                        </Text>
                      </View>
                      <View
                        justifyContent={'center'}
                        alignItems={'center'}
                        flex={1}
                      >
                        <CashIcon width={scale(30)} height={scale(30)} />
                      </View>
                    </Pressable>
                  ) : null}
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.proBtn}>
            <Button
              disabled={selectCard ? false : true}
              label={choosePaymentProp ? 'Continue' : 'Review'}
              width={'90%'}
              onPress={submit}
            />
          </View>
        </>
      )}

      <View style={{bottom: '12%'}}>
        <AddPaymentCardButton onPress={onAddCardButton} />
      </View>
    </Screen>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
    cardContainer: {
      paddingRight: scale(15),
      paddingLeft: scale(5),
      paddingTop: scale(5),
      marginVertical: scale(10),
      zIndex: 100,
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(300),
      height: scale(70),
      alignSelf: 'flex-start',

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.13,
      shadowRadius: 10,
      elevation: 3,
    },
  });

export default PayReservationFess;

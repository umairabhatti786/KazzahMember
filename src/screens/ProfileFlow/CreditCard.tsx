import {useNavigation, useTheme} from '@react-navigation/native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {PaymentIcon} from 'react-native-payment-icons';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Screen, Pressable, View, Text} from 'ui';
import {useDispatch} from 'react-redux';
import {fetchPaymentCard, getPaymentCard} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import NoCards from '../PayReservationFees/NoCards';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DeleteCardBottomSheet from './DeleteCardBottomSheet';
import AddPaymentCardButton from './AddPaymentCardButton';
import {useToast} from 'react-native-toast-notifications';
import {deleteCard} from 'reducers/updateProfileReducer';

const CreditCard = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const styles = makeStyles(colors);
  const [selectCard, setSelectCard] = useState();
  const [showDeleteCardMenu, setShowDeleteCardMenu] = useState(false);
  const cardsList = useSelector(getPaymentCard);
  const toast = useToast();

  const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchPaymentCard());
  }, [cardsList]);

  const onAddCardButton = () => {
    navigation.navigate('CardPrompt');
  };

  const onPressConfirmDelete = () => {
    dispatch(deleteCard(selectCard))
      .unwrap()
      .then(originalPromiseResult => {
        console.log('cowdjsvbjevj', originalPromiseResult.data);
        toast.show(originalPromiseResult.message, {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        // handle result here
      })
      .catch(rejectedValueOrSerializedError => {
        toast.show(rejectedValueOrSerializedError, {
          type: 'error_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });
        // handle error here
      });
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      {cardsList.length <= 0 ? (
        <NoCards navigation={navigation} />
      ) : (
        <React.Fragment>
          <View
            style={{
              flex: 1,
            }}>
            <BackButtonHeader showPages={false} />
            <Title title="Credit card" />
            <View height={verticalScale(40)} />
            <View style={{marginLeft: '7%'}}>
              <Text
                style={[
                  textStyle.cta1,
                  {color: colors.black, marginBottom: scale(5)},
                ]}>
                Card
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
                }}>
                <View>
                  {cardsList.map((item, index) => {
                    return (
                      <Pressable
                        key={index.toString()}
                        onPress={() => {
                          setSelectCard(item.id);
                        }}
                        style={styles.cardContainer}>
                        <View
                          alignItems={'center'}
                          justifyContent={'center'}
                          flex={1}>
                          <PaymentIcon type={item.cardBrand?.toLowerCase()} />
                        </View>

                        <View
                          flex={3}
                          justifyContent={'center'}
                          flexDirection={'column'}>
                          <Text
                            style={[
                              textStyle.b3,
                              {
                                color: colors.black,
                                textTransform: 'capitalize',
                              },
                            ]}>
                            {item.cardBrand}
                          </Text>
                          <Text
                            style={{
                              color: colors.silverChalice,
                            }}>
                            {`Card ending in ${item.lastFourDigits}`}
                          </Text>
                        </View>
                        <Pressable
                          onPress={() => {
                            setSelectCard(item.id);
                            setShowDeleteCardMenu(!showDeleteCardMenu);
                          }}
                          justifyContent={'center'}
                          alignItems={'center'}
                          flex={1}>
                          <SimpleLineIcons
                            color={'black'}
                            name="options"
                            size={22}
                          />
                        </Pressable>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </React.Fragment>
      )}
      <DeleteCardBottomSheet
        visible={showDeleteCardMenu}
        setVisible={setShowDeleteCardMenu}
        onPressConfirmDelete={onPressConfirmDelete}
      />

      {cardsList.length <= 0 ? null : (
        <AddPaymentCardButton onPress={onAddCardButton} />
      )}
    </Screen>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
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

export default CreditCard;

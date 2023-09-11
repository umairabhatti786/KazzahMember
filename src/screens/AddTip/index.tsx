import {useNavigation, useTheme} from '@react-navigation/native';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {Title} from 'newComponents/TextComponents';
import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import SelectIcon from '../../assets/SelectIcon.svg';
import {Screen, Pressable, View, Text} from 'ui';
import Button from 'newComponents/Button';
import {useSelector} from 'react-redux';
import {getSelectedCard, setSelectedCard} from 'reducers/PaymentReducer';
import SimpleToast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {getAppointmentDetails} from 'reducers/appoinmentReducer';

const AddTips = () => {
  const appointmentDetails = useSelector(getAppointmentDetails);

  const amountList = [
    {
      tipValue: '0%',
      tipPrice: '',
    },
    {
      tipValue: '5%',
      tipPrice: (5 / 100) * appointmentDetails.grandTotal,
    },
    {
      tipValue: '10%',
      tipPrice: (10 / 100) * appointmentDetails.grandTotal,
    },
    {
      tipValue: '20%',
      tipPrice: (20 / 100) * appointmentDetails.grandTotal,
    },

    {
      tipValue: 'Custom',
      tipPrice: '',
    },
  ];
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const [contactIndex, setContactIndex] = useState();
  const [selectTip, setSelectTip] = useState();
  const dispatch = useDispatch();
  const cardDetail = useSelector(getSelectedCard);
  console.log('cardDetail', cardDetail);
  const navigation = useNavigation();
  const lastIndex = amountList.length - 1;
  const submit = () => {
    if (contactIndex == lastIndex) {
      dispatch(setSelectedCard({...cardDetail, tip: '', tipValue: ''}));

      navigation.navigate('AddTipAmount');
    } else {
      if (!selectTip) {
        SimpleToast.show('Please select tip');
      } else {
        dispatch(
          setSelectedCard({
            ...cardDetail,
            tip: selectTip.tipPrice,
            tipValue: selectTip.tipValue,
          }),
        );
        navigation.navigate('PaymentReview');
      }
    }
  };

  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}>
        <BackButtonHeader showPages={false} />

        <Title title="Add tip" />

        <View height={verticalScale(20)} />
        <View style={{marginLeft: '7%'}}>
          <Text
            style={[
              textStyle.cta1,
              {color: colors.black, marginBottom: scale(5)},
            ]}>
            Amount
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
            {amountList.length > 0 ? (
              <View>
                {amountList.map((item, index) => {
                  return (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        setContactIndex(index);
                        setSelectTip(item);
                      }}
                      style={styles.cardContainer}>
                      <View
                        alignItems={'center'}
                        justifyContent={'center'}
                        flex={1}>
                        {contactIndex == index ? (
                          <SelectIcon
                            style={{marginTop: scale(7)}}
                            width={scale(65)}
                            height={scale(65)}
                          />
                        ) : (
                          <View
                            style={{borderColor: colors.black, borderWidth: 2}}
                            height={scale(20)}
                            width={scale(20)}
                            borderRadius={scale(50)}
                          />
                        )}
                      </View>

                      <View
                        flex={3}
                        justifyContent={'center'}
                        flexDirection={'column'}>
                        <Text
                          style={[
                            textStyle.b4,
                            {
                              color: colors.black,
                              fontWeight: '600',
                            },
                          ]}>
                          {item.tipValue}
                        </Text>
                      </View>
                      {/* {lastIndex != index && ( */}
                      <View
                        justifyContent={'center'}
                        alignItems={'center'}
                        flex={1}>
                        <Text
                          style={[
                            textStyle.b3,
                            {
                              color: colors.black,
                            },
                          ]}>
                          {lastIndex != index && index != 0
                            ? `$${Number(item?.tipPrice).toFixed(2)}`
                            : ''}
                        </Text>
                      </View>
                      {/* )} */}
                    </Pressable>
                  );
                })}
              </View>
            ) : (
              <View
                height={scale(300)}
                width={'100%'}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text style={[textStyle.b2, {color: colors.black}]}>
                  No Tip method Found
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <View style={styles.proBtn}>
        <Button
          disabled={selectTip ? false : true}
          label={'Review'}
          width={'90%'}
          onPress={submit}
        />
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
      marginVertical: scale(7),
      zIndex: 100,
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(300),
      height: scale(60),
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

export default AddTips;

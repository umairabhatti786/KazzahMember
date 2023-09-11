import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import ProInfo from 'newComponents/ProInfo';
import textStyle from 'theme/typoGraphy';
import TimeCounter from 'newComponents/TimeCounter';
import {useToast} from 'react-native-toast-notifications';
import {
  getAddAppointment,
  setAppointmentProvider,
} from 'reducers/addAppointmentReducer';
import services from 'services';
import ServiceDetails from 'screens/AddAppoinmentFlow/ReviewDetails/ServiceDetails';
import AppointmentApprovalSheet from 'screens/AddAppoinmentFlow/ReviewDetails/AppointmentApprovalSheet';
import {useDispatch} from 'react-redux';
import {
  fetchAppointmentDetails,
  getAppointmentDetails,
} from 'reducers/appoinmentReducer';
import {
  getApponintmentCashFeeResponse,
  getApponintmentFeeResponse,
  getSelectedCard,
  payAppointmentCash,
  payAppointmentFee,
  setEmptyPaymentCashResponse,
  setEmptyPaymentResponse,
} from 'reducers/PaymentReducer';
import PaymentServicesDetail from './PaymentServicesDetail';
import AppointmentService from 'newComponents/AppointmentService';
import PaymentSendSheet from './PaymentSendSheet';
import {TriggerNotification} from 'services/notification';
import moment from 'moment';

const PaymentReview = (props: any) => {
  const [ApprovalSheet, setApprovalSheet] = useState(false);
  const [time, setTime] = useState(4);
  const [seconds, setSeconds] = useState(59);
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const appointmentDetail = useSelector(getAppointmentDetails);
  const AddTipProp = props?.route?.params?.AddTip;
  console.log('AddTipProp', AddTipProp);

  const styles = makeStyles(colors);
  const cardData = useSelector(getSelectedCard);
  const servicePaymentResponse = useSelector(getApponintmentFeeResponse);
  console.log('servicePaymentResponse', servicePaymentResponse);
  const serviceCashPaymentResponse = useSelector(
    getApponintmentCashFeeResponse,
  );
  const navigation = useNavigation();
  const appointmentDetails = useSelector(getAppointmentDetails);

  const toggleBottomSheet = () => {
    setApprovalSheet(!ApprovalSheet);
  };
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAppointmentDetails(cardData?.appointmentId));

    dispatch(
      setAppointmentProvider({
        id: appointmentDetail?.provider.id,
        name: `${appointmentDetail?.provider.firstName} ${appointmentDetail?.provider.lastName}`,
        firstName: appointmentDetail?.provider.firstName,
        lastName: appointmentDetail?.provider.lastName,
        profilePicture: appointmentDetail?.provider.thumbnailUrl,
        channel: appointmentDetail?.provider.service?.service.name,
        address: appointmentDetail?.provider.address,
      }),
    );
  }, []);

  const sendNotification = async () => {
    const res = await TriggerNotification({
      trigger: 'CASH_PAYMENT_CONFIRMATION',
      modelId: appointmentDetails.provider.id,
      channel: 'push',
      title: 'Cash Payment Confirmation',
      messageParams: [
        {
          member_name: `${appointmentDetails.provider.firstName} ${appointmentDetails.provider.lastName}`,
        },
        {
          date: moment(appointmentDetails.appointmentDate, 'YYYY-MM-DD').format(
            'dddd MM,YYYY',
          ),
        },
      ],
      data: [
        {
          class: 'CASH_PAYMENT_CONFIRMATION',
          appointmentId: appointmentDetails.id,
        },
      ],
    });
  };

  const submit = async () => {
    if (cardData.cardId == 'cash') {
      if (cardData.tip != '') {
        let paymentBody = {
          appointmentId: Number(cardData.appointmentId),
          miscFee:
            appointmentDetails.miscFee == null ? 0 : appointmentDetails.miscFee,
          tip: Number(cardData.tip),
        };

        dispatch(payAppointmentCash(paymentBody));
      } else {
        sendNotification();

        toast.show('Payment Request Successfull');
        navigation.navigate('Home');
      }

      return;
    }
    let paymentBody = {
      cardId: cardData.cardId,
      appointmentId: cardData.appointmentId,
      paymentType: cardData.paymentType,
    };
    if (cardData.tip != '') {
      paymentBody['tip'] = Number(cardData.tip);
    }
    dispatch(payAppointmentFee(paymentBody));
    if (servicePaymentResponse.success) {
      setApprovalSheet(true);
    }
  };

  useEffect(() => {
    if (servicePaymentResponse.success) {
      setApprovalSheet(true);
    } else {
      setApprovalSheet(false);
    }

    if (serviceCashPaymentResponse.success) {
      sendNotification();
      navigation.navigate('Home');
    }
  }, [servicePaymentResponse, serviceCashPaymentResponse]);

  console.log('servicePaymentResponse', serviceCashPaymentResponse);
  return (
    <>
      <Screen edges={['right', 'top', 'left']}>
        <View
          style={{
            flex: 1,
          }}>
          <BackButtonHeader showPages={false} />

          <Title title="Review" />

          <View style={{paddingHorizontal: '6%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  paddingBottom: scale(300),
                  backgroundColor: 'transparent',
                  width: '100%',
                }}>
                <View height={verticalScale(30)} />
                <ProInfo AddTipProp={true} />
                <View height={verticalScale(20)} />

                <View
                  style={{backgroundColor: colors.silverChalice, height: 0.5}}
                />
                <AppointmentService
                  appointmentDetail={appointmentDetail}
                  AddTipProp={true}
                />
              </View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.proBtn}>
          <Button label="Pay now" width={'90%'} onPress={submit} />
        </View>
      </Screen>
      <PaymentSendSheet
        visible={ApprovalSheet}
        setVisible={toggleBottomSheet}
      />
    </>
  );
};

export default PaymentReview;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });

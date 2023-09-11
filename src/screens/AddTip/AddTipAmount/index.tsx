import {Screen, Text, View} from 'ui';
import React from 'react';
import * as yup from 'yup';
import {scale, verticalScale} from 'react-native-size-matters';
import {Platform, KeyboardAvoidingView} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import TextInput from '../../../newComponents/TextInput';
import Button from '../../../newComponents/Button';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Wrapper} from '../../../newComponents/wrappers';
import BackButtonHeader from '../../../newComponents/BackButtonHeader';
import {Title} from '../../../newComponents/TextComponents';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {getSelectedCard, setSelectedCard} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import textStyle from 'theme/typoGraphy';
import {useToast} from 'react-native-toast-notifications';

const schema = yup.object().shape({
  addTip: yup.string().required('AddTip is required'),
});

const AddTipAmount = () => {
  const dispatch = useDispatch();
  const cardData = useSelector(getSelectedCard);
  const {handleSubmit, control} = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const toast = useToast();

  console.log('control', control?.name);
  const navigation = useNavigation();
  const submit = data => {
    if (data?.addTip == '$0' || data?.addTip == '$') {
      toast.show('Tip must be greater than 0');
    } else {
      dispatch(
        setSelectedCard({...cardData, tip: data?.addTip.replace('$', '')}),
      );
      navigation.navigate('PaymentReview');
    }

    //  dispatch(setSelectedCard({...cardData, tip: data}));
  };
  const {colors} = useTheme();
  return (
    <Screen edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(-5) : responsiveHeight(1)
        }>
        <BackButtonHeader showPages={false} />
        <Wrapper
          style={{
            flex: 1,
          }}
          animation="fadeInUp">
          <Title title={'Enter amount'} />

          <View alignItems={'center'}>
            <TextInput
              defaultValue="$"
              control={control}
              name="addTip"
              label="Tip"
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
        </Wrapper>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button onPress={handleSubmit(submit)} label={'Pay now'} />
          {Platform.OS === 'ios' ? <View height={verticalScale(50)} /> : <></>}
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default AddTipAmount;

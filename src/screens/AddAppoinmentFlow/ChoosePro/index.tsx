import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'ui';
import {verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Button from 'newComponents/Button';
import ProsForm from './ProsForm';
import {useToast} from 'react-native-toast-notifications';
import {getAppointmentProvider} from 'reducers/addAppointmentReducer';

const ChoosePro = (props: any) => {
  const [selectPro, setSelectPro] = useState();
  const toast = useToast();
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const selectedPro = useSelector(getAppointmentProvider);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{paddingHorizontal: '6%'}}>
        <View height={verticalScale(10)} />
        <ProsForm selectPros={selectPro} setSelectPros={setSelectPro} />
      </View>
    </View>
  );
};

export default ChoosePro;

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

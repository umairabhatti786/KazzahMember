import {FlatList, StyleSheet, ScrollView} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import CrossIcon from '../../../src/assets/CrossIcon.svg';
import Approval from '../../../src/assets/Approval.svg';

import {BottomSheet} from 'react-native-btr';
import textStyle from 'theme/typoGraphy';
import {getAddAppointment} from 'reducers/addAppointmentReducer';

const ViewNotificationSheet = ({visible, setVisible, onReturn, data}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={setVisible}
      onBackdropPress={setVisible}
    >
      <View
        flexDirection={'column'}
        style={{backgroundColor: colors.background, padding: '6%'}}
        height={'55%'}
        width={'100%'}
        borderTopLeftRadius={scale(15)}
        borderTopRightRadius={scale(15)}
        overflow="hidden"
      >
        <Pressable
          width={scale(50)}
          height={scale(50)}
          onPress={() => setVisible()}
        >
          <CrossIcon
            onPress={() => setVisible()}
            style={{color: colors.black, width: scale(40), height: scale(40)}}
          />
        </Pressable>
        <ScrollView>
          <View
            style={{
              width: '100%',
              // marginTop: verticalScale(20),
            }}
          >
            <View style={{marginHorizontal: scale(10)}}>
              <Text style={[textStyle.h3, {color: '#000000'}]}>
                {data?.notificationClass}
              </Text>
              <View height={verticalScale(10)} />

              <Text
                // lineHeight={0.1}
                style={[textStyle.b1, {lineHeight: 40, color: '#000000'}]}
              >
                {data?.message}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default ViewNotificationSheet;

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

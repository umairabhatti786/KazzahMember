import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Screen, View, Text} from 'ui';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ContactIcon from 'assets/ContactIcon.svg';

import ManuallyIcon from 'assets/ManuallyIcon.svg';
import {scale, verticalScale} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { setEmptyAddPro } from 'reducers/addProReducer';

const MethodContainer = (props: any) => {
  const {colors} = useTheme();
  const dispatch=useDispatch()

  return (
    <View>
      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          {
            dispatch(setEmptyAddPro())
          
          props.navigation.navigate('ChooseContact', {addPro: props.addPro})

          }
          
        }
        style={styles.main}>
        <View style={styles.inner}>
          <ContactIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, marginTop: verticalScale(4)},
              ]}>
              Choose from contacts
            </Text>
            <Text
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: verticalScale(2)},
              ]}>
              Open your Contacts and choose friend
            </Text>
          </View>
        </View>

        <Image
          source={require('../../../assets/NextIcon.png')}
          style={{width: scale(8), height: scale(8)}}
        />
      </TouchableOpacity>

      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.main}
        onPress={() =>
          props.navigation.navigate('AddContactName', {addPro: props.addPro})
        }>
        <View style={styles.inner}>
          <ManuallyIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, marginTop: verticalScale(4)},
              ]}>
              Add manually
            </Text>

            <Text
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: verticalScale(2)},
              ]}>
              Open your Contacts and choose friend
            </Text>
          </View>
        </View>

        <Image
          source={require('../../../assets/NextIcon.png')}
          style={{width: scale(8), height: scale(8)}}
        />
      </TouchableOpacity>

      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />
    </View>
  );
};

export default MethodContainer;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(17),
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

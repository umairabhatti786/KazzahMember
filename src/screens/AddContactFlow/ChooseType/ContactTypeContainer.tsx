import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Screen, View, Text} from 'ui';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import HandIcon from 'assets/HandIcon.svg';

import StarIcon from 'assets/StarIcon.svg';
import {scale, verticalScale} from 'react-native-size-matters';

const ContactTypeContainer = (props: any) => {
  const {colors} = useTheme();
  return (
    <View>
      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => props.navigation.navigate('SelectMethod')}
        style={styles.main}>
        <View style={styles.inner}>
          <HandIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, marginTop: verticalScale(4)},
              ]}>
              Friend
            </Text>
            <Text
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: verticalScale(2)},
              ]}>
              Lorem ipsum dolor
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
          props.navigation.navigate('SelectMethod', {addPro: true})
        }>
        <View style={styles.inner}>
          <StarIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
            <Text
              style={[
                textStyle.b3,
                {color: colors.black, marginTop: verticalScale(4)},
              ]}>
              Pro
            </Text>
            <Text
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: verticalScale(2)},
              ]}>
              Sit amet, con
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

export default ContactTypeContainer;

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

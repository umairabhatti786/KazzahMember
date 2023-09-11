import React from 'react';
import {Screen, Text, View} from 'ui';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Wrapper} from 'newComponents/wrappers';
import {Title} from 'newComponents/TextComponents';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import PersonIcon from '../../../src/assets/PersonIcon.svg';
import {SvgUri} from 'react-native-svg';

export const ProviderServices = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  let imageFormate = props?.item?.service?.icon?.split('.').pop();

  return (
    <View style={styles.containerStyle}>
      {imageFormate === 'svg' ? (
        <View
          style={{
            height: scale(30),
            width: scale(30),
            backgroundColor: '#000000',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgUri
            width={scale(20)}
            height={scale(20)}
            uri={props?.item.service.icon}
          />
        </View>
      ) : null}

      <Text
        numberOfLines={1}
        style={[
          textStyle.b5,
          {
            color: colors.black,
            marginTop: verticalScale(5),
            textAlign: 'center',
            paddingHorizontal: scale(5),
          },
        ]}>
        {props?.item.service?.name}
      </Text>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    imageStyle: {
      height: scale(20),
      width: scale(20),
    },
    containerStyle: {
      height: scale(90),
      width: scale(90),
      paddingVertical: scale(13),
      borderRadius: scale(10),
      margin: scale(7),
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: colors.background,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },

      shadowOpacity: 0.13,
      shadowRadius: 7,
      elevation: 2,
    },
    circleContainer: {
      height: scale(20),
      width: scale(20),
      borderRadius: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.black,
    },
    innerCircleContainer: {
      height: scale(8),
      width: scale(8),
      backgroundColor: colors.background,
      borderRadius: scale(50),
    },
  });

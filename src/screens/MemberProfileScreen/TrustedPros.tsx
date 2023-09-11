import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';

const TrustedProsList = props => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      key={props.index}
      style={styles.mainContainer}
      onLongPress={() => props?.onCrossPress(props?.item)}
      onPress={() => props?.onPress(props?.item)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 0.9,
        }}>
        <View
          height={scale(45)}
          width={scale(45)}
          justifyContent={'center'}
          alignItems={'center'}>
          <Image
            style={{
              width: scale(35),
              height: scale(35),
              borderRadius: scale(50),
              marginRight: scale(10),
            }}
            source={props?.item?.img}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.categoryContainer}>
        <Text numberOfLines={1} style={[textStyle.b3, {color: colors.black}]}>
          {props?.item?.name}
        </Text>
        <Text
          variant={'info'}
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[
            textStyle.b5,
            {color: colors.silverChalice, marginTop: scale(3)},
          ]}>
          {props?.item?.name}
        </Text>
      </View>
      <Pressable
        height={scale(25)}
        width={scale(40)}
        borderRadius={scale(20)}
        alignItems={'center'}
        justifyContent={'center'}
        style={styles.BookContainer}>
        <Text
          style={[
            textStyle.cta2,
            {
              color: colors.black,
              marginTop: Platform.OS === 'ios' ? scale(3) : 0,
            },
          ]}>
          Book
        </Text>
      </Pressable>
    </TouchableOpacity>
  );
};

export default TrustedProsList;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      paddingRight: scale(20),
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(280),
      margin: scale(10),
      height: verticalScale(65),
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 3,
    },
    categoryContainer: {
      justifyContent: 'center',
      flex: 2.3,
      marginTop: verticalScale(5),
    },
    BookContainer: {
      backgroundColor: colors.background,
      borderColor: colors.black,
      borderWidth: 1,
      flex: 0.9,
    },
  });

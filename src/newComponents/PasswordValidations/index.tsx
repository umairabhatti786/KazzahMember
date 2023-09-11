import {StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import Check from '../../../src/assets/Check.svg';

type Props = {
  inputValue: any;
};

const PasswordValidations = ({inputValue}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{width: '100%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{...styles.innerContainer, width: '50%'}}>
          <Check
            style={{
              color: !inputValue?.match(/^(?=.*[A-Z])/)
                ? colors.silverChalice
                : colors.green,
            }}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.labe2,
              {
                color: !inputValue?.match(/^(?=.*[A-Z])/)
                  ? colors.silverChalice
                  : colors.green,
                marginLeft: scale(5),
              },
            ]}>
            1 upper case character
          </Text>
        </View>
        <View style={{...styles.innerContainer, width: '50%'}}>
          <Check
            style={{
              color: !inputValue?.match(
                /^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/,
              )
                ? colors.silverChalice
                : colors.green,
            }}
            width={scale(15)}
            height={scale(15)}
          />
          <Text
            style={[
              textStyle.labe2,
              {
                color: !inputValue?.match(
                  /^(?=.*[!@#$%^&*()\-_=+{};:,<.>£%©®™✓°¢$¥€~`|•√π÷×¶∆])/,
                )
                  ? colors.silverChalice
                  : colors.green,
                marginLeft: scale(5),
              },
            ]}>
            1 special character
          </Text>
        </View>
      </View>
      <View style={{height: verticalScale(10)}} />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{...styles.innerContainer, width: '50%'}}>
          <Check
            style={{
              color: !inputValue?.match(/^(?=.*[0-9])/

              )
                ? colors.silverChalice
                : colors.green,
            }}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.labe2,
              {
                color: !inputValue?.match(
                    /^(?=.*[0-9])/
                )
                  ? colors.silverChalice
                  : colors.green,
                marginLeft: scale(5),
              },
            ]}>
            1 number
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Check
            style={{
              color: inputValue?.length<8
                ? colors.silverChalice
                : colors.green,
            }}
            width={scale(15)}
            height={scale(15)}
          />

          <Text
            style={[
              textStyle.labe2,
              {
                color: inputValue?.length<8
                  ? colors.silverChalice
                  : colors.green,
                marginLeft: scale(5),
              },
            ]}>
            8 characters minimum
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PasswordValidations;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
    innerContainer: {flexDirection: 'row', alignItems: 'center'},
  });

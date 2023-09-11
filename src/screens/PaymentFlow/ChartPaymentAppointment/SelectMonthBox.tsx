import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ArrowDown from '../../../assets/ArrowDown.svg';

type Props = {
  monthLeft: any;
  setMonthLeft: any;
  monthRight: any;
  setMonthRight: any;
  setShowLeftMonth: any;
  setShowRightMonth: any;
  showLeftMonth: any;
  showRightMonth: any;
};

const SelectMonthBox = ({
  monthLeft,
  setMonthLeft,
  monthRight,
  setMonthRight,
  setShowLeftMonth,
  setShowRightMonth,
  showLeftMonth,
  showRightMonth,
}: Props) => {
  const {colors} = useTheme();
  return (
    <View
      alignItems={'center'}
      justifyContent={'space-between'}
      flexDirection={'row'}
      height={scale(60)}
      style={{zIndex: 100}}
      width={'100%'}>
      <Pressable
        onPress={() => setShowLeftMonth(true)}
        style={{borderColor: colors.silverChalice, borderWidth: 0.5}}
        borderRadius={scale(5)}
        alignItems={'center'}
        justifyContent={'space-around'}
        flexDirection={'row'}
        height={scale(50)}
        width={'45%'}>
        <Text style={[textStyle.b3, {color: colors.silverChalice}]}>
          {`${monthLeft ? moment(monthLeft).format('MMMM') : ''}`}
        </Text>
        <ArrowDown
          color={colors.silverChalice}
          height={scale(9)}
          width={scale(9)}
        />
      </Pressable>

      <Pressable
        onPress={() => setShowRightMonth(true)}
        style={{borderColor: colors.silverChalice, borderWidth: 0.5}}
        borderRadius={scale(5)}
        alignItems={'center'}
        justifyContent={'space-around'}
        flexDirection={'row'}
        height={scale(50)}
        width={'45%'}>
        <Text style={[textStyle.b3, {color: colors.silverChalice}]}>
          {`${monthRight ? moment(monthRight).format('MMMM') : ''}`}
        </Text>
        <ArrowDown
          color={colors.silverChalice}
          height={scale(9)}
          width={scale(9)}
        />
      </Pressable>
      {showLeftMonth && (
        <View
          style={{
            zIndex: 100,
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: colors.background,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.13,
            shadowRadius: 10,
            elevation: 3,
          }}
          alignItems={'center'}
          justifyContent={'space-around'}
          height={scale(450)}
          width={'100%'}>
          <DatePicker
            mode="date"
            date={monthLeft}
            onDateChange={date => setMonthLeft(date)}
          />
          <Button
            label="Done"
            width={'50%'}
            onPress={() => setShowLeftMonth(!showLeftMonth)}
          />
        </View>
      )}
      {showRightMonth && (
        <View
          style={{
            zIndex: 100,
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: colors.background,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.13,
            shadowRadius: 10,
            elevation: 3,
          }}
          alignItems={'center'}
          justifyContent={'space-around'}
          height={scale(400)}
          width={'100%'}>
          <DatePicker
            mode="date"
            date={monthRight}
            onDateChange={date => setMonthRight(date)}
          />
          <Button
            label="Done"
            width={'50%'}
            onPress={() => setShowRightMonth(!showRightMonth)}
          />
        </View>
      )}
    </View>
  );
};

export default SelectMonthBox;

import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import AppointmentSelectIcon from '../../../assets/AppointmentSelectIcon.svg';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';

type Props = {
  TimeframeType: any;
  checkboxState: any;
  setCheckboxState: any;
};

const TimeFrame = ({TimeframeType, checkboxState, setCheckboxState}: Props) => {
  const {colors} = useTheme();
  return (
    <View marginVertical={'xxl'} marginHorizontal={'m'}>
      <Text
        style={[textStyle.h3, {color: colors.black, marginBottom: scale(10)}]}>
        Timeframe
      </Text>
      {TimeframeType.map((item, index) => {
        return (
          <Pressable
            key={index.toString()}
            onPress={() => {
              setCheckboxState(index);
            }}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <View flex={1} justifyContent={'center'} height={scale(43)}>
              {checkboxState == index ? (
                <AppointmentSelectIcon
                  style={{start: scale(-20), bottom: -5}}
                  width={scale(60)}
                  height={scale(60)}
                />
              ) : (
                <View
                  style={{borderColor: colors.black, borderWidth: 2}}
                  height={scale(20)}
                  width={scale(20)}
                  borderRadius={scale(50)}
                />
              )}
            </View>
            <View flex={7} justifyContent={'center'} height={scale(43)}>
              <Text
                style={[
                  textStyle.b3,
                  {color: colors.black, marginTop: scale(5)},
                ]}>
                {item.type}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TimeFrame;

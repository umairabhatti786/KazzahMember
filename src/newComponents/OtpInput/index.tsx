import React from 'react';
import {useController} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {scale, verticalScale} from 'react-native-size-matters';
import {Text, View} from 'ui';
import textStyle from 'theme/typoGraphy';

interface Props {
  name: string;
  control: any;
}
const OtpInput = ({control, name}: Props) => {
  const {colors} = useTheme();

  const {field, fieldState} = useController({control, name});

  return (
    <>
      <View>
        <OtpInputs
          //   autofillFromClipboard={true}
          keyboardType="phone-pad"
          handleChange={field.onChange}
          numberOfInputs={6}
          placeholder="--"
          inputStyles={{
            marginHorizontal: scale(10),
            color: 'black',
            height: verticalScale(30),
            width: verticalScale(22),
            textAlign: 'center',
            fontSize: 18,
          }}
          style={[
            {
              backgroundColor: colors.background,
              width: scale(310),
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              borderColor: colors.black,
              height: verticalScale(45),
              borderRadius: 5,
              fontFamily: 'Calibre',
              fontWeight: '400',
            },
          ]}
        />

        {fieldState.error && (
          <Text
            marginStart={'s'}
            marginBottom={'s'}
            marginTop={'s'}
            style={[textStyle.label, {color: colors.red}]}>
            {fieldState.error.message}
          </Text>
        )}
      </View>
    </>
  );
};

export default OtpInput;

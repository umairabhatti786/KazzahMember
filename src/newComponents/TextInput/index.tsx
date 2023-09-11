import * as React from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  TouchableOpacity,
  ReturnKeyType,
} from 'react-native';
import {useController} from 'react-hook-form';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import {TextInput as TextInputP} from 'react-native-paper';
import textStyle from 'theme/typoGraphy';
import EyeIcon from '../../assets/EyeIcon.svg';
import EyeOffIcon from '../../assets/EyeOffIcon.svg';
import {Text, View} from 'ui';

interface Props {
  name: string;
  control: any;
  label: string;
  width?: any;
  defaultValue?: string;
  disabled?: boolean;
  inputType?: 'default' | 'password';
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType?: ReturnKeyType | undefined;
  maxLength?: number | undefined;
  onChange?: any;
  multiline?: any;
}

function TextInput({
  name,
  control,
  width = 310,
  label,
  defaultValue,
  disabled = false,
  inputType = 'default',
  keyboardType,
  returnKeyType,
  maxLength,
  onChange,
  multiline,
}: Props) {
  const inputTypeIsPassword = inputType == 'password';

  const {colors} = useTheme();
  const {field, fieldState} = useController({control, name});

  const [isSecureText, setIsSecureText] = React.useState(inputTypeIsPassword);

  return (
    <View
      style={{
        minHeight: verticalScale(60),
        maxHeight: verticalScale(75),
        marginVertical: Platform.OS == 'ios' ? scale(10) : 0,
      }}>
      <TextInputP
        maxLength={maxLength}
        keyboardType={keyboardType}
        disabled={disabled}
        secureTextEntry={isSecureText}
        theme={{
          roundness: 7,
          fonts: {
            regular: {
              fontFamily: 'Calibre',
            },
          },
          colors: {
            text: colors.black,
          },
        }}
        defaultValue={defaultValue}
        label={
          <Text
            style={{
              color: colors.black,
              backgroundColor: colors.background,
              fontSize: 14,
              fontFamily: 'Calibre',
            }}>
            {label}
          </Text>
        }
        mode="outlined"
        autoCapitalize="none"
        multiline={multiline}
        outlineColor={colors.silverChalice}
        activeOutlineColor={colors.black + 'A1'}
        returnKeyType={returnKeyType}
        onChangeText={text => {
          field.onChange(text);
          onChange?.(text);
        }}
        style={{
          backgroundColor: colors.background,
          width: scale(width),
          // minHeight: scale(50),
          borderRadius: 15,
          fontSize: moderateScale(15),
          fontFamily: 'Calibre',
          fontWeight: '500',
        }}
        value={field.value as string}
      />
      {inputTypeIsPassword && (
        <TouchableOpacity
          onPress={() => setIsSecureText(!isSecureText)}
          style={{
            position: 'absolute',
            end: scale(20),
            top: scale(22),
          }}>
          {isSecureText ? (
            <EyeOffIcon stroke={colors.silverChalice} />
          ) : (
            <EyeIcon stroke={colors.silverChalice} />
          )}
        </TouchableOpacity>
      )}

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
  );
}

export default TextInput;

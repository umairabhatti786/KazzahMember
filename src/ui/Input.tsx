import * as React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import {Control, Path, RegisterOptions, useController} from 'react-hook-form';

import {Text} from './Text';
import {View} from './View';
import {theme, useTheme} from './theme';
import {scale, verticalScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-number-input';
import * as RNLocalize from 'react-native-localize';
// types
type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = {[name in keyof T]: TRule};
export type InputControllerType<T> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface Props<T> extends TextInputProps, InputControllerType<T> {
  disabled?: boolean;
  label?: string;
  leftIcon?: React.ReactElement;
  placeholder?: string | undefined;
  style?: StyleProp<TextStyle>;
  marginBottom?: boolean;
  isPhoneInput?: boolean;
  ref: any;
}

export function Input<T>(props: Props<T>) {
  const {
    label,
    style,
    placeholder,
    name,
    control,
    rules,
    isPhoneInput,
    marginBottom,
    ref,
    leftIcon,
    ...inputProps
  } = props;
  const {colors} = useTheme();
  const {field, fieldState} = useController({control, name, rules});
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = () => setIsFocussed(false);
  const onFocus = () => setIsFocussed(true);

  return (
    <View key={`input-${name}`} marginBottom={marginBottom ? 'm' : undefined}>
      <View
      //borderWidth={fieldState.error ? 1 : 0}
      //borderColor={fieldState.error ? 'red' : isFocussed ? 'white' : 'white'}
      >
        {isPhoneInput ? (
          <PhoneInput
            defaultValue={field.value as string}
            defaultCode="US"
            layout="second"
            onChangeFormattedText={field.onChange}
            placeholder={'Phone Number'}
            textInputProps={{
              maxLength: 10,
              returnKeyType: 'done',
              textAlignVertical: 'center',
              style: {
                width: '100%',
                height: scale(43),
                fontSize: scale(12),
                letterSpacing: 0.5,
                fontWeight: 'bold',
              },
              placeholderTextColor: inputProps.placeholderTextColor,
            }}
            textContainerStyle={{
              width: '120%',
              start: -40,

              backgroundColor: 'transprent',
            }}
            countryPickerButtonStyle={{start: -19}}
            containerStyle={
              style
                ? style
                : [
                    styles.input,
                    {
                      width: '100%',
                      borderColor: fieldState.error
                        ? '#D22B2B'
                        : isFocussed
                        ? 'white'
                        : 'white',
                      borderWidth: fieldState.error ? 1 : 0,
                    },
                  ]
            }
          />
        ) : (
          <TextInput
            ref={ref}
            placeholderTextColor={colors.black}
            placeholder={placeholder}
            style={
              style
                ? style
                : [
                    styles.input,
                    {
                      borderColor: fieldState.error
                        ? '#D22B2B'
                        : isFocussed
                        ? 'white'
                        : 'white',
                      borderWidth: fieldState.error ? 1 : 0,
                    },
                  ]
            }
            autoCapitalize="none"
            onChangeText={field.onChange}
            value={field.value as string}
            onBlur={onBlur}
            onFocus={onFocus}
            {...inputProps}
          />
        )}
      </View>

      {fieldState.error && (
        <Text
          marginStart={'s'}
          marginBottom={'s'}
          fontWeight={'400'}
          // color="red"
          fontSize={scale(15)}
          style={{color: '#D22B2B'}}>
          {fieldState.error.message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: scale(16),
    borderRadius: scale(10),
    color: 'black',
    paddingLeft: 10,
    height: verticalScale(44),
    backgroundColor: 'white',
  },
});

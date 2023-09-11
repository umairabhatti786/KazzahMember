import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {TextInputProps, StyleSheet, TextStyle, StyleProp} from 'react-native';
import {Control, Path, RegisterOptions, useController} from 'react-hook-form';

import {Text} from '../../ui/Text';
import {View} from '../../ui/View';
import {theme, useTheme} from '../../ui/theme';
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

export function InputField<T>(props: Props<T>) {
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
      <View>
        <TextInput
          mode="outlined"
          textColor={colors.black}
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
          onChangeText={field.onChange}
          value={field.value as string}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
        />
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

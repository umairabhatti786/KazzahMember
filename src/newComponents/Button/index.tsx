import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';

type Props = {
  label: string;
  variant?: 'primary' | 'secondary' | 'outlined';
  onPress: any;
  width?: string | number | undefined;
  paddingTop?: string | number | undefined;
  height?: string | number | undefined;
  disabled?: boolean | null | undefined;
  loading?: boolean | null | undefined;
};

const Button = ({
  label,
  variant = 'primary',
  onPress,
  width = '90%',
  height = verticalScale(45),
  disabled = false,
  loading = false,
  paddingTop = Platform.OS === 'ios' ? verticalScale(5) : 0,
}: Props) => {
  const {colors} = useTheme();

  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles[variant],
        {width, height, paddingTop, flexDirection: 'row'},
      ]}
    >
      {loading && (
        <ActivityIndicator
          style={{position: 'absolute', start: '20%'}}
          size={'small'}
          color={colors.text}
        />
      )}
      {disabled ? (
        <Text style={[textStyle.cta1, styles.disabledText]}>{label}</Text>
      ) : (
        <Text style={[textStyle.cta1, styles[`${variant}Text`]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    primary: {
      backgroundColor: colors.black,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondary: {
      backgroundColor: colors.background,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    outlined: {
      borderColor: colors.black,
      borderWidth: 2,
      backgroundColor: colors.background,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
      color: colors.text,
    },
    secondaryText: {
      color: colors.textBlack,
    },
    outlinedText: {
      color: colors.textBlack,
    },
    disabledText: {
      color: colors.doveGray,
    },
  });

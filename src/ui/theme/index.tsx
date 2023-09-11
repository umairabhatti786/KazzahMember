import * as React from 'react';
// import { createTheme, BaseTheme } from '@shopify/restyle';
import {
  ThemeProvider as ReThemeProvider,
  TextProps,
  BoxProps,
  useTheme as useRTheme,
} from '@shopify/restyle';

type BaseThemeType = typeof BaseTheme & {
  textVariants: {[key: string]: TextProps<typeof BaseTheme>};
  navigation: any;
  buttonVariants: {[key: string]: BoxProps<typeof BaseTheme>};
};

import {scale} from 'react-native-size-matters';

const createTheme = <T extends BaseThemeType>(themeObject: T): T => themeObject;

const BaseTheme = {
  colors: {
    text: '#202124',
    background: '#fff',
    primary: 'rgb(32,182,196)',
    secondary: 'rgb(32,182,196)',
    muted: '#f1f3f4',
    transparent: 'transparent',
    green: '#39E3BF',
    green1:"#008000",
    grayphyte: '#4C5661',
    // from figma file

    black: '#151522',
    grey1: '#333333',
    grey2: '#666666',
    grey3: '#C3C3C3',
    grey4: '#E4E4E4',
    white: 'white',
    red: '#EB5757',
  },
  spacing: {
    xxs: scale(2),
    xs: scale(4),
    s: scale(8),
    m: scale(10),
    l: scale(12),
    xl: scale(14),
    xxl: scale(16),
    '3xl': scale(18),
    '4xl': scale(20),
    '5xl': scale(30),
    '6xl': scale(40),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const theme = createTheme({
  ...BaseTheme,
  // TODO : Not sure if this the best way to handel navigation theme
  navigation: {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: '#f8f8fa',
      card: '#f8f8fa',
      green: '#39E3BF',

      text: '#0c1245',
      border: 'rgb(199, 199, 204)',
      notification: 'red',
    },
  },
  buttonVariants: {
    defaults: {},
    primary: {
      backgroundColor: 'primary',
      height: scale(48),
      alignItems: 'center',
    },
    secondary: {
      backgroundColor: 'secondary',
      width: scale(150),
    },
    outline: {
      backgroundColor: 'white',
      borderColor: 'primary',
      width: scale(150),
    },
  },
  textVariants: {
    defaults: {},
    large: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
      fontSize: scale(22),
      lineHeight: 42.5,
      color: 'white',
    },
    info: {
      fontFamily: 'Inter',
      fontSize: scale(14),
      color: 'white',
    },
    link: {
      fontFamily: 'Inter',
      fontSize: scale(14),
      color: 'white',
      textDecorationLine: 'underline',
    },
    button_secondary: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 22,
      color: 'white',
    },
    button_primary: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 22,
      color: 'white',
    },
    button_outline: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 22,
      color: 'text',
    },
    label: {
      fontFamily: 'Inter',
      fontSize: 13,
      lineHeight: 18,
      color: 'grey2',
      paddingVertical: 's',
    },
  },
});

export type Theme = typeof theme;

export const ThemeProvider = ({children}: {children: React.ReactNode}) => (
  <ReThemeProvider theme={theme}>{children}</ReThemeProvider>
);

export const useTheme = () => useRTheme<Theme>();

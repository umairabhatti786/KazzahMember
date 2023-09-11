import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';

const commonColors = {
  green: '#74BC62',
  yellow: '#E1D461',
  red: '#FF5555',
};

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#ffffff',
    textBlack: '#000000',
    concrete: '#f3f3f3',
    gallery: '#EAEAEA',
    silverChalice: '#AAAAAA',
    appColor5: '#006AFF',
    doveGray: '#6a6a6a',
    mineShaft: '#2a2a2a',
    codGray: '#1a1a1a',
    black: '#000000',
    container: '#ffffff',
    ...commonColors,
  },
  dark: false,
} as Theme;
export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000',
    text: '#000000',
    textBlack: '#ffffff',
    concrete: '#1a1a1a',
    gallery: '#2a2a2a',
    silverChalice: '#6a6a6a',
    appColor5: '#006AFF',
    doveGray: '#AAAAAA',
    mineShaft: '#eaeaea',
    codGray: '#f3f3f3',
    black: '#ffffff',
    container: '#1a1a1a',
    ...commonColors,
  },
  dark: true,
} as Theme;

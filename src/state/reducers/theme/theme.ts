import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ColorSet = {
  text: string;
  primary: string;
  textWhite: string;
  blue: string;
  success: string;
  successPale: string;
  error: string;
  errorPale: string;
  appBgBack: string;
  appBgFront: string;
  asideActive: string;
  card: string;
  secondary: string;
  shade: string;
  border: string;
};

export const colorLib = {
  text: '#1F2937',
  primary: '#2F4E79',
  textWhite: '#F9FAFB',
  blue: '#2E5EA1',
  success: '#2a8314',
  sucessPale: '#d4eed4',
  error: '#d32f2f',
  errorPale: '#FFD6D6',
  appBgBack: '#1F2937',
  appBgFront: '#F9FAFB',
  asideActive: '#4e6688',
  card: '#F2F8FF',
  shade: '#e5f1ff',
  border: '#e0e0e0',

  textDark: '#b2c5e1', //#b2c5e1
  primaryDark: '#3C6DBC',
  textWhiteDark: 'rgb(220, 224, 228)',
  blueDark: '#336cc1',
  successDark: '#4CAF50',
  sucessPaleDark: '#37593C',
  errorDark: '#F44336',
  errorPaleDark: '#593737',
  appBgBackDark: '#111827',
  appBgFrontDark: '#2E3646',
  asideActiveDark: '#33485F',
  cardDark: '#1E293B',
  shadeDark: '#1a243a', //#1a243a
  borderDark: '#455473', // #455473
};

export const colorsApp: { light: ColorSet; dark: ColorSet } = {
  light: {
    text: colorLib.text,
    textWhite: colorLib.textWhite,
    primary: colorLib.primary,
    secondary: colorLib.blue,
    blue: colorLib.blue,
    success: colorLib.success,
    successPale: colorLib.sucessPale,
    error: colorLib.error,
    errorPale: colorLib.errorPale,
    appBgBack: colorLib.appBgBack,
    appBgFront: colorLib.appBgFront,
    asideActive: colorLib.asideActive,
    card: colorLib.card,
    shade: colorLib.shade,
    border: colorLib.border,
  },
  dark: {
    text: colorLib.textDark,
    textWhite: colorLib.textWhiteDark,
    primary: colorLib.primaryDark,
    secondary: colorLib.blueDark,
    blue: colorLib.blueDark,
    success: colorLib.successDark,
    successPale: colorLib.sucessPaleDark,
    error: colorLib.errorDark,
    errorPale: colorLib.errorPaleDark,
    appBgBack: colorLib.appBgBackDark,
    appBgFront: colorLib.appBgFrontDark,
    asideActive: colorLib.asideActiveDark,
    card: colorLib.cardDark,
    shade: colorLib.shadeDark,
    border: colorLib.borderDark,
  },
};

interface State {
  scheme: Scheme;
  colors: ColorSet;
}

const initialState: State = {
  scheme: 'light',
  colors: colorsApp.light,
};

export type Scheme = 'light' | 'dark';
export type ColorName = keyof ColorSet;
export type ColorLib = typeof colorLib;

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColors: (state, action: PayloadAction<Partial<ColorSet>>) => {
      state.colors = { ...state.colors, ...action.payload };
    },
    setScheme: (state, action: PayloadAction<Scheme>) => {
      const scheme = action.payload;
      state.scheme = scheme;
      state.colors = colorsApp[scheme];

      document.body.style.backgroundColor = colorsApp[scheme].appBgFront;
    },
  },
});

export default slice.reducer;

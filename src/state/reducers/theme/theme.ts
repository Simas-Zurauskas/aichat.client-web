import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ColorSet = {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  card: string;
  cardBorder: string;
  // waves
  wave1: string;
  wave2: string;
  wave3: string;
  wave4: string;

  error: string;
};

export const colorLib = {
  white: '#FFFFFF', // #FFFFFF
  whiteDark: '#E2E8F0', // #E2E8F0
  black: '#1D222A', // #1D222A
  chineseBlack: '#11181C', // #11181C
  blueRadiance: '#3B82F6', // #3B82F6
  blueRadianceDark: '#1E3A8A', // #1E3A8A
  tropicalTeal: '#29AA7B', // #29AA7B
  tropicalTealDark: '#157256', // #157256
  card: '#F9FAFB', // #F9FAFB
  cardDark: '#2D3748', // #2D3748
  cardBorder: '#D1D1D1', // #D1D1D1
  cardBorderDark: '#4A5568', // #4A5568
  // ===== waves light =====
  azureBlue: 'rgba(0, 119, 182, 0.7)',
  lightSkyBlue: 'rgba(72, 202, 228, 0.5)',
  blueEyes: 'rgba(144, 224, 239, 0.3)',
  aliceBlue: 'rgba(223, 249, 251, 0.8)',
  // ===== waves dark =====
  azureBluedark: 'rgba(0, 47, 90, 0.7)',
  lightSkyBlueDark: 'rgba(25, 82, 112, 0.5)',
  blueEyesDark: 'rgba(40, 120, 150, 0.3)',
  aliceBluedark: 'rgba(50, 140, 180, 0.8)',

  error: '#FF0000',
  errorDark: '#FF0000',
};

export const colorsApp: { light: ColorSet; dark: ColorSet } = {
  light: {
    primary: colorLib.blueRadiance,
    secondary: colorLib.tropicalTeal,
    text: colorLib.chineseBlack,
    background: colorLib.white,
    card: colorLib.card,
    cardBorder: colorLib.cardBorder,

    wave1: colorLib.azureBlue,
    wave2: colorLib.lightSkyBlue,
    wave3: colorLib.blueEyes,
    wave4: colorLib.aliceBlue,

    error: colorLib.error,
  },
  dark: {
    primary: colorLib.blueRadianceDark,
    secondary: colorLib.tropicalTealDark,
    text: colorLib.whiteDark,
    background: colorLib.black,
    card: colorLib.cardDark,
    cardBorder: colorLib.cardBorderDark,

    wave1: colorLib.azureBluedark,
    wave2: colorLib.lightSkyBlueDark,
    wave3: colorLib.blueEyesDark,
    wave4: colorLib.aliceBluedark,

    error: colorLib.errorDark,
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

      document.body.style.backgroundColor = colorsApp[scheme].background;
    },
  },
});

export default slice.reducer;

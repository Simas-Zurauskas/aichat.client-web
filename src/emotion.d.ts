import '@emotion/react';
// import theme from './lib/theme';
import { ColorSet, Scheme } from './state/reducers/theme';
// import { Theme as MUITheme } from '@emotion/react';
import { Theme as MUITheme } from '@mui/material';

// type MUITheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends MUITheme {
    scheme: Scheme;
    colors: ColorSet;
  }
}

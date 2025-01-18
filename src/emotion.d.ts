import '@emotion/react';
import theme from './lib/theme';
import { ColorSet, Scheme } from './state/reducers/theme';

type MUITheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends MUITheme {
    scheme: Scheme;
    colors: ColorSet;
  }
}

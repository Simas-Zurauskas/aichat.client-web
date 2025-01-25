import styled from '@emotion/styled';
import { TextField } from '@mui/material';

interface InputProps {}

export const Input = styled(TextField)`
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary)};
    border-radius: 4px;
  }

  .MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.primary};
  }

  .Mui-error {
    &.MuiFormLabel-root {
      color: ${({ theme }) => theme.colors.error} !important;
    }
  }

  input,
  textarea {
    color: ${({ theme }) => theme.colors.text};
  }
`;

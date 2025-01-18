import styled from '@emotion/styled';
import { TextField } from '@mui/material';

interface InputProps {}

export const Input = styled(TextField)`
  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? 'red' : theme.colors.primary)};
    border-radius: 0px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ error, theme }) => (error ? 'red' : theme.colors.primary)};
    border-radius: 0px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${({ error, theme }) => (error ? 'red' : theme.colors.primary)};
    border-radius: 0px;
  }

  .MuiFormLabel-root {
    color: ${({ theme }) => theme.colors.primary};
  }

  input,
  textarea {
    color: ${({ theme }) => theme.colors.text};
  }
`;

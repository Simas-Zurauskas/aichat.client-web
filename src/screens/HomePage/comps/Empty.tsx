import { Button } from '@/components/form';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Div = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;

  button {
    color: ${({ theme }) => theme.colors.blue};
    width: 300px;
    height: 140px;
    font-size: 24px;
    font-weight: 400;
    background-color: #e5f1ff;
    &:hover {
      background-color: #d6e8ff;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    button {
      width: 200px;
      height: 100px;
      font-size: 18px;
    }
  }
`;

interface EmptyProps {
  onClick: () => void;
}

export const Empty: React.FC<EmptyProps> = ({ onClick }) => {
  return (
    <Div>
      <svg width="68" height="78" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.75 23.7855V54.2145L34 69.4115L60.25 54.2145V23.7855L34 8.5885L7.75 23.7855ZM34 0.5L67.25 19.75V58.25L34 77.5L0.75 58.25V19.75L34 0.5ZM14.7465 31.895L30.5 41.0195V58.691H37.5V41.0195L53.2535 31.902L49.7465 25.8435L34 34.9575L18.2535 25.84L14.7465 31.895Z"
          fill="#87B0E0"
        />
      </svg>
      <Box mt={4} />
      <Typography variant="h1" sx={{ fontWeight: 500 }} textAlign={'center'}>
        🚀 Launch Your First AI Workspace
      </Typography>
      <Box mt={2} />
      <Typography variant="body1" textAlign="center">
        Transform documents into intelligent conversations.
        <br />
        Click <strong>+ Create</strong> to upload PDF/DOCX files and create your
        <br />
        secure, encrypted AI environment that evolves with your content.
      </Typography>
      <Box mt={6} />
      <Button variant="outlined" onClick={onClick}>
        + Create
      </Button>
    </Div>
  );
};

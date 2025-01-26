import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  p {
    max-width: 700px;
  }
`;

interface WelcomeProps {}

export const Welcome: React.FC<WelcomeProps> = () => {
  return (
    <Div>
      <svg width="68" height="78" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.75 23.7855V54.2145L34 69.4115L60.25 54.2145V23.7855L34 8.5885L7.75 23.7855ZM34 0.5L67.25 19.75V58.25L34 77.5L0.75 58.25V19.75L34 0.5ZM14.7465 31.895L30.5 41.0195V58.691H37.5V41.0195L53.2535 31.902L49.7465 25.8435L34 34.9575L18.2535 25.84L14.7465 31.895Z"
          fill="#87B0E0"
        />
      </svg>
      <Box mt={4} />
      <Typography variant="h4" sx={{ fontWeight: 500 }}>
        Chat Powered by Your Documents
      </Typography>
      <Box mt={2} />
      <Typography variant="body1" textAlign="center">
        This chat understands <strong>your PDF/DOCX files</strong>.
        <br />
        Ask questions, request summaries, or explore connections -
        <br />
        responses are contextualized using your uploaded data.
      </Typography>
      <Box mt={2} />
      <Typography variant="body2" color="text.secondary" textAlign="center">
        <Box component="span" sx={{ fontStyle: 'italic' }}>
          Secure & Temporary:{' '}
        </Box>
        Files encrypted (AES-256) on AWS S3 • Node auto-deletes in 30 days
      </Typography>
      <Box mt={4} />
    </Div>
  );
};

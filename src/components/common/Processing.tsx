import styled from '@emotion/styled';
import { Sync } from '@mui/icons-material';
import { Typography } from '@mui/material';

const Div = styled.div`
  font-size: 14px;
  color: #f5a623;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
  border: 1px solid gray;
  padding: 2px 4px;
  border-radius: 4px;
  svg {
    margin-left: 4px;
    animation: spin 2s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }
  }
`;

interface ProcessingProps {}

export const Processing: React.FC<ProcessingProps> = () => {
  return (
    <div>
      <Div>
        <Typography variant="body2">Processing...</Typography>
        <Sync fontSize="small" />
      </Div>
    </div>
  );
};

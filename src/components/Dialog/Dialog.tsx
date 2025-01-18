import * as React from 'react';
import { Button, Dialog as MuiDialog } from '@mui/material';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledDialog = styled(MuiDialog)`
  .MuiPaper-root {
    padding: 20px !important;
    background-color: ${({ theme }) => theme.colors.background};
    .btns {
      display: flex;
      justify-content: flex-end;
      grid-gap: 8px;
    }
  }
`;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, onConfirm, title = 'Are you sure you want to delete?' }) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Typography variant="h6">{title}</Typography>
      <Box mb={2} />
      <div className="btns">
        <Button variant="outlined" onClick={onClose}>
          No
        </Button>
        {onConfirm && (
          <Button variant="contained" onClick={onConfirm}>
            Yes
          </Button>
        )}
      </div>
    </StyledDialog>
  );
};

export default Dialog;

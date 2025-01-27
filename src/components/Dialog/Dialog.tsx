import * as React from 'react';
import { Dialog as MuiDialog } from '@mui/material';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Button } from '../form';

const StyledDialog = styled(MuiDialog)`
  .MuiPaper-root {
    width: 400px;
    padding: 20px !important;
    background-color: ${({ theme }) => theme.colors.appBgFront};
    .btns {
      display: flex;
      justify-content: flex-end;
      grid-gap: 8px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .MuiPaper-root {
      padding: 16px !important;
      max-width: calc(100% - 24px);
    }
  }
`;

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onConfirmText?: string;
  title?: string;
  subtitle?: string;
  cancelText?: string;
  disabled?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onConfirmText = 'Yes',
  cancelText = 'No',
  title = 'Are you sure you want to delete?',
  subtitle,
  disabled,
}) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Typography variant="h6">{title}</Typography>
      {subtitle && (
        <>
          <Box mb={1} />
          <Typography variant="body1">{subtitle}</Typography>
        </>
      )}
      <Box mb={2} />
      <div className="btns">
        <Button variant="outlined" onClick={onClose} disabled={disabled}>
          {cancelText}
        </Button>
        {onConfirm && (
          <Button variant="contained" onClick={onConfirm} disabled={disabled}>
            {onConfirmText}
          </Button>
        )}
      </div>
    </StyledDialog>
  );
};

export default Dialog;

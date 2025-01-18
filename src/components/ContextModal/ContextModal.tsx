import styled from '@emotion/styled';
import { Box, Dialog } from '@mui/material';
import { Button, Input } from '../form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFile, updateInstance } from '@/api/routes/instances';
import { toast } from 'react-toastify';
import { QKey } from '@/types';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 420px !important;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 20px;
    .btns {
      display: flex;
      justify-content: flex-end;
      grid-gap: 8px;
    }
  }
`;

interface ContextModalProps {
  instanceId: string;
  fileId: string;
  isOpen: boolean;
  onClose: () => void;
  value: string;
}

const ContextModal: React.FC<ContextModalProps> = ({ onClose, isOpen, value, instanceId, fileId }) => {
  const [inputValue, setInputValue] = useState(value);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateFile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKey.instance, instanceId],
      });
      toast.success('File context updated');
      onClose();
    },
    onError: () => {
      toast.error('Failed to update file context');
    },
  });

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Input
        size="small"
        label="File context"
        multiline
        minRows={3}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Box mb={2} />
      <div className="btns">
        <Button variant="outlined" color="primary" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => mutate({ instanceId, fileId, context: inputValue })}
          disabled={value === inputValue || !inputValue || isPending}
        >
          Save
        </Button>
      </div>
    </StyledDialog>
  );
};

export default ContextModal;

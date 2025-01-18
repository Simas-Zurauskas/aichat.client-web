import styled from '@emotion/styled';
import { Box, Dialog } from '@mui/material';
import { Button, Input } from '../form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInstance } from '@/api/routes/instances';
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

interface SettingsModalProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  value: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, isOpen, value, id }) => {
  const [inputValue, setInputValue] = useState(value);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateInstance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKey.instance, id],
      });
      toast.success('User settings updated');
      onClose();
    },
    onError: () => {
      toast.error('Failed to update user settings');
    },
  });

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Input
        size="small"
        label="User settings"
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
          onClick={() => mutate({ uxId: id, userSettings: inputValue })}
          disabled={value === inputValue || !inputValue || isPending}
        >
          Save
        </Button>
      </div>
    </StyledDialog>
  );
};

export default SettingsModal;

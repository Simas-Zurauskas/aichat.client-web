import { delChat, extendAccess, getChat, setLLM, setTemperature } from '@/api/routes/instances';
import { Instance, LLM, ResponseStyle } from '@/api/types';
import { Button, LlmSelect, ResponseStyleSelect } from '@/components/form';
import { numeralFormat } from '@/lib/misc';
import { useStateSelector } from '@/state';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { DeleteOutlineSharp, InsertDriveFileOutlined, SettingsOutlined } from '@mui/icons-material';
import { FileDrawer } from '../FileDrawer';
import { AddFilesModal, CiModal } from '@/components/modal';
import Dialog from '@/components/Dialog';

const Div = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 120px);

  .statrow {
    display: flex;
    justify-content: space-between;
  }

  .processing {
    display: flex;
    grid-gap: 8px;
    align-items: center;
  }

  .instructions {
    flex: 1;
    overflow-y: auto;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 12px;
    max-height: calc(100vh - 76px);
    width: 250px;
  }
`;

interface ToolbarProps {
  data: Instance;
}

export const Toolbar: React.FC<ToolbarProps> = ({ data }) => {
  const user = useStateSelector(({ auth }) => auth.user);
  const colors = useStateSelector(({ theme }) => theme.colors);
  const [isFileDrawerOpen, setIsFileDrawerOpen] = useState(false);
  const [isAddFilesModalOpen, setIsAddFilesModalOpen] = useState(false);
  const [isCiOpen, setIsCiOpen] = useState(false);
  const [isExtendOpen, setIsExtendOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: [QKey.chat, data.uxId],
    queryFn: () => getChat(data.uxId),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: setLLM,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.instance, data.uxId],
      });
      toast.success('Model updated');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
  const { mutate: mutateRs, isPending: isPendingRs } = useMutation({
    mutationFn: setTemperature,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.instance, data.uxId],
      });
      toast.success('Response style updated');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const { mutate: extend, isPending: isPendingExtend } = useMutation({
    mutationFn: extendAccess,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.instance, data.uxId],
      });
      setIsExtendOpen(false);
      toast.success('Node lifetime extended');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const { mutate: mutateDelChat, isPending: isPendingDelChat } = useMutation({
    mutationFn: delChat,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.chat, data.uxId],
      });
      toast.success('Chat cleared');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const handleChangeLLM = (llm: LLM) => {
    mutate({ instanceUxId: data.uxId, llm });
  };
  const handleChangeRS = (temperature: ResponseStyle) => {
    mutateRs({ instanceUxId: data.uxId, temperature });
  };

  const isProcessing = data?.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing');

  return (
    <>
      <Dialog
        isOpen={isExtendOpen}
        title="Extend Node Access?"
        onConfirmText="Extend"
        cancelText="Cancel"
        onConfirm={() => extend(data.uxId)}
        onClose={() => setIsExtendOpen(false)}
        subtitle="This will add 30 days to the node's lifespan starting from today's date."
        disabled={isPendingExtend}
      />
      <FileDrawer isOpen={isFileDrawerOpen} onClose={() => setIsFileDrawerOpen(false)} files={data?.files || []} />
      <AddFilesModal open={isAddFilesModalOpen} onClose={() => setIsAddFilesModalOpen(false)} data={data} />
      <CiModal
        id={data.uxId}
        open={isCiOpen}
        onClose={() => setIsCiOpen(false)}
        initialValue={data?.userSettings || ''}
      />
      <Div>
        <div className="statrow">
          <Typography>Vectors: </Typography>
          <Typography fontWeight={500}>
            {numeralFormat(data?.files.reduce((acc, el) => acc + el.vectorCount, 0))}
          </Typography>
        </div>
        <div className="statrow">
          <Typography>Vector operations:</Typography>
          <Typography fontWeight={500}>
            {numeralFormat(user?.usage.vectorOps)} / {numeralFormat(user?.usage.vectorOpsLimit)}
          </Typography>
        </div>
        <Box mb={2} />

        <LlmSelect value={data.llm} onChange={handleChangeLLM} color="secondary" disabled={isPending} />
        <Box mb={2} />
        <ResponseStyleSelect value={data.temperature} onChange={handleChangeRS} disabled={isPendingRs} />
        <Box mb={2} />
        <Button variant="outlined" color="secondary" onClick={() => setIsFileDrawerOpen(true)}>
          <InsertDriveFileOutlined
            sx={{
              fontSize: 18,
              marginRight: 0.5,
            }}
          />
          View files ({data?.files.length})
        </Button>
        <Box mb={2} />
        <Button variant="outlined" color="secondary" onClick={() => setIsAddFilesModalOpen(true)}>
          + Add files
        </Button>

        <Box mb={2} />
        <Button variant="outlined" color="secondary" onClick={() => setIsCiOpen(true)}>
          <SettingsOutlined
            sx={{
              fontSize: 18,
              marginRight: 0.5,
            }}
          />
          Custom instructions
        </Button>

        {isProcessing && (
          <>
            <Box mb={2} />
            <div className="processing">
              <CircularProgress size={16} />
              <Typography>Processing...</Typography>
            </div>
          </>
        )}
        <Box mb={2} />
        <div className="instructions styled-scroll">
          <Typography variant="body2" style={{ opacity: 0.8 }}>
            {data.userSettings}
          </Typography>
        </div>

        <Box mb={2} sx={{ marginTop: 'auto' }} />
        <Button variant="outlined" color="secondary" onClick={() => setIsExtendOpen(true)}>
          Extend Access
        </Button>
        <Box mb={2} />
        <Button
          color="error"
          variant="outlined"
          onClick={() => mutateDelChat(data.uxId)}
          disabled={isPendingDelChat || !messages.length}
          fullWidth
        >
          <DeleteOutlineSharp
            sx={{
              fontSize: 18,
              marginRight: 0.5,
            }}
          />
          Clear Chat
        </Button>
      </Div>
    </>
  );
};

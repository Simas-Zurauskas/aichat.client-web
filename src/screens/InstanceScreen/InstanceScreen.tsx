'use client';
import { delChat, getInstance, uploadFiles } from '@/api/routes/instances';
import Chat from '@/components/Chat';
import { Processing } from '@/components/common';
import { PageContainer } from '@/components/layout';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { Box, Button, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileDrawer, Toolbar } from './comps';
import { FileWithPath } from 'react-dropzone';
import { FileInput, Input } from '@/components/form';
import { toast } from 'react-toastify';
import { isTenMB } from '@/lib/misc';
import SettingsModal from '@/components/SettingsModal';

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  height: 100%;
`;

const Wrap = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  flex: 1;
  .head {
    /* border: 1px solid white; */
    display: flex;
    justify-content: space-between;
    &__meta {
      display: flex;
      align-items: center;
      grid-gap: 16px;
      /* border: 1px solid red; */
    }
  }
`;

const InstanceScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileDrawerOpen, setIsFileDrawerOpen] = useState(false);
  const [addFilesMode, setAddFilesMode] = useState(false);
  const [newFiles, setNewFiles] = useState<FileWithPath[]>([]);
  const [context, setContext] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [QKey.instance, id],
    queryFn: () => getInstance(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKey.instance, id],
      });
      toast.success('Files uploaded');
      setAddFilesMode(false);
      setNewFiles([]);
      setContext('');
    },
    onError: () => {
      toast.error('Error uploading files');
    },
  });

  const { mutate: mutateDelChat, isPending: isPendingDelChat } = useMutation({
    mutationFn: delChat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKey.chat, id],
      });
      toast.success('Chat cleared');
    },
    onError: () => {
      toast.error('Error clearing chat');
    },
  });

  useEffect(() => {
    setIsProcessing(!!data?.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing'));
  }, [data]);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        console.log('invalidate');
        queryClient.invalidateQueries({
          queryKey: [QKey.instance, id],
        });
        queryClient.invalidateQueries({
          queryKey: [QKey.user],
        });
        console.log('YAYAY');
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data, id, isProcessing]);

  const validFiles = newFiles.filter((f) => !data?.files.map((el) => el.originalName).includes(f.name));
  const tooLargeError = isTenMB(validFiles.reduce((acc, el) => acc + el.size, 0)) ? '' : 'Total size exceeds 10MB';

  return (
    <Main>
      <Wrap>
        <SettingsModal
          id={id}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          value={data?.userSettings || ''}
        />
        {data && (
          <>
            <FileDrawer isOpen={isFileDrawerOpen} onClose={() => setIsFileDrawerOpen(false)} files={data.files} />
            <div className="head">
              <Typography className="ptitle">{data?.name}</Typography>
              <div className="head__meta">
                {!addFilesMode && (
                  <>
                    <Typography>Vectors: {data?.files.reduce((acc, el) => acc + el.vectorCount, 0)}</Typography>
                    <Button variant="contained" size="small" onClick={() => setIsFileDrawerOpen(true)}>
                      Files ({data?.files.length})
                    </Button>
                  </>
                )}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    if (addFilesMode) {
                      setNewFiles([]);
                    }
                    setAddFilesMode(!addFilesMode);
                  }}
                  disabled={isPending}
                >
                  {addFilesMode ? 'CANCEL' : '+ ADD FILES'}
                </Button>
                {!addFilesMode && (
                  <>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setIsSettingsOpen(true)}
                      disabled={isPendingDelChat}
                    >
                      Settings
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      size="small"
                      onClick={() => mutateDelChat(id)}
                      disabled={isPendingDelChat}
                    >
                      Clear
                    </Button>
                  </>
                )}
              </div>
            </div>
            {!addFilesMode && <Typography>User settings: {data.userSettings || <i>None</i>}</Typography>}
            {isProcessing && <Processing />}
            {!addFilesMode && <Chat id={id} />}
            {addFilesMode && (
              <>
                <Input
                  label="Context (optional)"
                  value={context}
                  size="small"
                  onChange={(e) => setContext(e.target.value)}
                />
                <Box mt={2} />

                <FileInput
                  files={newFiles}
                  setFiles={setNewFiles}
                  existingFileNames={data.files.map((el) => el.originalName)}
                  tooLargeError={tooLargeError}
                />
                {!!newFiles.length && (
                  <div>
                    <Box mt={2} />
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => mutate({ files: newFiles, uxId: id, context })}
                      disabled={isPending || !!tooLargeError}
                    >
                      UPLOAD
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </Wrap>

      <Toolbar />
    </Main>
  );
};

export default InstanceScreen;

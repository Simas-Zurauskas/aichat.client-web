import { createInstance } from '@/api/routes/instances';
import { Button, FileInput, Input } from '@/components/form';
import { isTenMB } from '@/lib/misc';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { toast } from 'react-toastify';

const Div = styled.div``;

interface CreateNewProps {
  onCreate: () => void;
}

export const CreateNew: React.FC<CreateNewProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [userSettings, setUserSettings] = useState('');
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createInstance,
    onSuccess: (data) => {
      toast.success('Instance created successfully');
      queryClient.invalidateQueries({
        queryKey: [QKey.instances],
      });
      onCreate();
    },
    onError: () => {
      toast.error('Error creating instance');
    },
  });

  const tooLargeError = isTenMB(files.reduce((acc, el) => acc + el.size, 0)) ? '' : 'Total size exceeds 10MB';

  return (
    <Div>
      <div>
        <Input
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          label="Name"
          size="small"
          value={name}
          placeholder='e.g. "My new instance"'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ width: 320 }}
        />
        <Box mb={2} />
        <Input
          onChange={(e) => setUserSettings(e.target.value)}
          variant="outlined"
          label="User settings (optional)"
          size="small"
          value={userSettings}
          placeholder='e.g. "The response you give is in Spanish."'
          multiline
          minRows={3}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ width: 320 }}
        />
        <Box mb={2} />
        <Input
          name="template.context"
          onChange={(e) => setContext(e.target.value)}
          variant="outlined"
          label="File context (optional)"
          size="small"
          value={context}
          placeholder='e.g. "Members list"'
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          sx={{ width: 320 }}
        />
        <Box mb={2} />
        <FileInput files={files} setFiles={setFiles} tooLargeError={tooLargeError} />

        <Box mb={2} />
        <Button
          variant="contained"
          color="primary"
          disabled={!name || !files.length || isPending || !!tooLargeError}
          onClick={() => mutate({ files, name, context, userSettings })}
          // size="small"
        >
          UPLOAD
        </Button>
      </div>
    </Div>
  );
};

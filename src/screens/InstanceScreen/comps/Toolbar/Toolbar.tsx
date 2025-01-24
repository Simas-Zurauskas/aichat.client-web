import { setLLM } from '@/api/routes/instances';
import { Instance, LLM } from '@/api/types';
import { numeralFormat } from '@/lib/misc';
import { useStateSelector } from '@/state';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Div = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

interface ToolbarProps {
  data: Instance;
}

export const Toolbar: React.FC<ToolbarProps> = ({ data }) => {
  const user = useStateSelector(({ auth }) => auth.user);
  const [model, setModel] = useState(data.llm);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: setLLM,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QKey.instance, data.uxId],
      });
      toast.success('LLM updated');
    },
    onError: () => {
      toast.error('Failed to update LLM');
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as LLM);
    mutate({ instanceUxId: data.uxId, llm: event.target.value as LLM });
  };

  return (
    <Div>
      <Typography>
        Vector operations: {numeralFormat(user?.usage.vectorOps)} / {numeralFormat(user?.usage.vectorOpsLimit)}
      </Typography>
      <Box mb={2} />
      <FormControl fullWidth>
        <InputLabel size="small">LLM</InputLabel>
        <Select value={model} label="LLM" onChange={handleChange} size="small">
          <MenuItem value={LLM.GPT4O}>{LLM.GPT4O}</MenuItem>
          <MenuItem value={LLM.GEMINI15PRO}>{LLM.GEMINI15PRO}</MenuItem>
          <MenuItem value={LLM.R1}>{LLM.R1}</MenuItem>
        </Select>
      </FormControl>
    </Div>
  );
};

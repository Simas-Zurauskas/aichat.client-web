import styled from '@emotion/styled';
import { ModalBase } from './comps/ModalBase';
import { Box } from '@mui/material';
import { Button, FileInput, Input, LlmSelect } from '../form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LLM } from '@/api/types';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInstance } from '@/api/routes/instances';
import { toast } from 'react-toastify';
import { QKey } from '@/types';
import { FileWithPath } from 'react-dropzone';
import { isOverUploadSize } from '@/lib/misc';

const Div = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    button {
      width: 200px;
    }
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(50, 'Name must be less than 50 characters'),
  llm: Yup.string().required('LLM is required'),
  userSettings: Yup.string().max(2000, 'User settings must be less than 2000 characters'),
  context: Yup.string().max(300, 'User settings must be less than 300 characters'),
});

interface CreateInstanceModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateInstanceModal: React.FC<CreateInstanceModalProps> = ({ open, onClose }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createInstance,
    onSuccess: async (data) => {
      toast.success('Node created successfully');
      await queryClient.invalidateQueries({
        queryKey: [QKey.instances],
      });
      onClose();
    },
    onError: () => {
      toast.error('Error creating node');
    },
  });

  const { values, handleChange, setFieldValue, handleBlur, errors, touched, resetForm, isValid, handleSubmit } =
    useFormik({
      validationSchema,
      initialValues: {
        name: '',
        llm: '' as LLM,
        userSettings: '',
        context: '',
      },
      onSubmit: (values) => {
        return mutate({ ...values, files });
      },
    });

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const tooLargeError = isOverUploadSize(files.reduce((acc, el) => acc + el.size, 0)) ? '' : 'Total size exceeds 20MB';

  return (
    <ModalBase open={open} onClose={onClose} title="Create Node">
      <Div>
        <Input
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          label="Name"
          size="small"
          value={values.name}
          error={!!errors.name && touched.name}
          helperText={touched.name && errors.name}
          required
          fullWidth
        />
        <Box mb={2} />

        <Input
          name="userSettings"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          label="Custom instructions (optional)"
          size="small"
          value={values.userSettings}
          placeholder='e.g. "The response you give is in Spanish."'
          multiline
          minRows={3}
          error={!!errors.userSettings && touched.userSettings}
          helperText={touched.userSettings && errors.userSettings}
          fullWidth
        />
        <Box mb={2} />
        <LlmSelect value={values.llm} onChange={(val) => setFieldValue('llm', val)} />
        <Box mb={2} />
        <FileInput files={files} setFiles={setFiles} tooLargeError={tooLargeError} />
        <Box mb={2} />
        <Input
          name="context"
          onChange={handleChange}
          variant="outlined"
          label="File context (optional)"
          size="small"
          value={values.context}
          placeholder='e.g. "Draft for presentation"'
          fullWidth
        />
        <Box mb={3} />
        <div className="btn">
          <Button
            variant="contained"
            disabled={!isValid || isPending || !!tooLargeError || !files.length}
            onClick={() => handleSubmit()}
          >
            Create
          </Button>
        </div>
      </Div>
    </ModalBase>
  );
};

import styled from '@emotion/styled';
import { ModalBase } from './comps/ModalBase';
import { Box } from '@mui/material';
import { Button, FileInput, Input, LlmSelect } from '../form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LLM } from '@/api/types';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInstance, updateFile, updateInstance } from '@/api/routes/instances';
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
  userSettings: Yup.string().max(2000, 'User settings must be less than 2000 characters'),
});

interface FileContextModalProps {
  open: boolean;
  onClose: () => void;
  initialValue: string;
  instanceId: string;
  fileId: string;
}

export const FileContextModal: React.FC<FileContextModalProps> = ({
  open,
  onClose,
  initialValue,
  instanceId,
  fileId,
}) => {
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

  const { values, handleChange, handleBlur, errors, touched, resetForm, isValid, handleSubmit } = useFormik({
    validationSchema,
    initialValues: {
      context: initialValue,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      return mutate({ ...values, instanceId, fileId });
    },
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <ModalBase open={open} onClose={onClose} title="File context">
      <Div>
        <Input
          name="context"
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          label="File context"
          size="small"
          value={values.context}
          placeholder='e.g. "This file contains the results of the experiment"'
          multiline
          minRows={3}
          error={!!errors.context && touched.context}
          helperText={touched.context && errors.context}
          fullWidth
        />

        <Box mb={3} />
        <div className="btn">
          <Button variant="contained" disabled={!isValid || isPending} onClick={() => handleSubmit()}>
            Update
          </Button>
        </div>
      </Div>
    </ModalBase>
  );
};

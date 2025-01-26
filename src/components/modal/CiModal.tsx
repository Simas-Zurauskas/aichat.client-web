import styled from '@emotion/styled';
import { ModalBase } from './comps/ModalBase';
import { Box } from '@mui/material';
import { Button, FileInput, Input, LlmSelect } from '../form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LLM } from '@/api/types';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInstance, updateInstance } from '@/api/routes/instances';
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

interface CiModalProps {
  open: boolean;
  onClose: () => void;
  initialValue: string;
  id: string;
}

export const CiModal: React.FC<CiModalProps> = ({ open, onClose, initialValue, id }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateInstance,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.instance, id],
      });
      toast.success('Updated');
      onClose();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const { values, handleChange, handleBlur, errors, touched, resetForm, isValid, handleSubmit } = useFormik({
    validationSchema,
    initialValues: {
      userSettings: initialValue,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      return mutate({ ...values, uxId: id });
    },
  });

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <ModalBase open={open} onClose={onClose} title="Custom instructions">
      <Div>
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

import styled from '@emotion/styled';
import { ModalBase } from './comps/ModalBase';
import { Box } from '@mui/material';
import { Button, FileInput, Input } from '../form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Instance } from '@/api/types';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFiles } from '@/api/routes/instances';
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
  context: Yup.string().max(300, 'User settings must be less than 300 characters'),
});

interface AddFilesModalProps {
  open: boolean;
  onClose: () => void;
  data: Instance;
}

export const AddFilesModal: React.FC<AddFilesModalProps> = ({ open, onClose, data }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QKey.instance, data.uxId],
      });
      onClose();
      toast.success('Uploaded');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  const { values, handleChange, setFieldValue, handleBlur, errors, touched, resetForm, isValid, handleSubmit } =
    useFormik({
      validationSchema,
      initialValues: {
        context: '',
      },
      onSubmit: (values) => {
        return mutate({ uxId: data.uxId, ...values, files });
      },
    });

  useEffect(() => {
    if (!open) {
      resetForm();
      setFiles([]);
    }
  }, [open]);

  const validFiles = files.filter((f) => !data?.files.map((el) => el.originalName).includes(f.name));
  const tooLargeError = isOverUploadSize(validFiles.reduce((acc, el) => acc + el.size, 0))
    ? ''
    : 'Total size exceeds 20MB';

  return (
    <ModalBase open={open} onClose={onClose} title="Add files">
      <Div>
        <FileInput
          files={files}
          setFiles={setFiles}
          tooLargeError={tooLargeError}
          existingFileNames={data.files.map((el) => el.originalName)}
        />
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
            Add
          </Button>
        </div>
      </Div>
    </ModalBase>
  );
};

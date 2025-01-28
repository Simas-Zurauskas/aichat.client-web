import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { FileItem } from './comps';
import { useState } from 'react';
import { SupportedFileTypes } from '@/types';
import { formatBits } from '@/lib/misc';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Div = styled.div`
  .dropzone {
    border: 1px dashed ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.shade};
    border-radius: 4px;
    padding: 24px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    img {
      width: 36px;
      margin-bottom: 8px;
    }
  }

  .files {
    display: grid;
  }
`;

interface FileInputProps {
  files: FileWithPath[];
  setFiles: (files: FileWithPath[]) => void;
  existingFileNames?: string[];
  tooLargeError?: string;
}

export const FileInput: React.FC<FileInputProps> = ({ files, setFiles, existingFileNames = [], tooLargeError }) => {
  const [ignoredFiles, setIgnoredFiles] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: { [SupportedFileTypes.pdf]: [], [SupportedFileTypes.docx]: [] },
    onDropAccepted: (files) => {
      handleSetFiles(files);
    },
  });

  const handleSetFiles = (files: FileWithPath[]) => {
    setIgnoredFiles([]);
    const newFiles = files.filter((f) => !existingFileNames.includes(f.name));
    const ignored = files.filter((f) => existingFileNames.includes(f.name)).map((f) => f.name);
    setFiles(newFiles);
    setIgnoredFiles(ignored);
  };

  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <Div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <UploadFileIcon sx={{ marginBottom: 1 }} color="primary" />
        <Typography variant="body2">Drag & drop some files here or click to select files.</Typography>
      </div>
      {!!files.length && (
        <>
          <Box mb={1} />
          <div className="files">
            {files.map((file) => (
              <FileItem
                key={file.path}
                data={file}
                onRemove={() => setFiles(files.filter((f) => f.path !== file.path))}
              />
            ))}
          </div>
        </>
      )}
      {!!ignoredFiles.length && (
        <>
          <Box mb={2} />
          <Typography color="error" variant="body2" style={{ maxWidth: 450 }}>
            These files already exist in this chat instance:
            <br />
            {ignoredFiles.map((el) => (
              <Typography color="error" variant="body2" fontWeight={500}>
                {el}
              </Typography>
            ))}
          </Typography>
        </>
      )}
      <Box mb={2} />
      <Typography variant="body2" fontWeight={500}>
        Total size: {formatBits(totalSize)}
      </Typography>
      {tooLargeError && (
        <>
          <Typography color="error" variant="body2" fontWeight={500}>
            {tooLargeError}
          </Typography>
        </>
      )}
    </Div>
  );
};

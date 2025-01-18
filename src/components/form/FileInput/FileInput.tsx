import styled from '@emotion/styled';
import { Alert, Box, Typography } from '@mui/material';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { FileItem } from './comps';
import { useState } from 'react';
import { SupportedFileTypes } from '@/types';
import { formatBits } from '@/lib/misc';

const Div = styled.div`
  .dropzone {
    border: 1px dashed ${({ theme }) => theme.colors.wave1};
    background-color: ${({ theme }) => theme.colors.wave3};
    border-radius: 4px;
    padding: 40px 18px;
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
    gap: 4px;
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
        <img src="/icon_file.png" alt="" />
        <Typography>Drag & drop some files here or click to select files.</Typography>
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
          <Alert severity="warning">
            The following files were ignored as they already exist in the instance:
            <br />
            <b>
              {ignoredFiles.map((el) => (
                <div>{el}</div>
              ))}
            </b>
          </Alert>
        </>
      )}
      <Box mb={2} />
      <Typography>Total size: {formatBits(totalSize)}</Typography>
      {tooLargeError && (
        <>
          <Box mb={2} />
          <Alert severity="error">{tooLargeError}</Alert>
        </>
      )}
    </Div>
  );
};

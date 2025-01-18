import styled from '@emotion/styled';
import { Dialog } from '@mui/material';
import { Docx, Pdf } from './comps';
import { FileRef } from '@/api/types';
import { SupportedFileTypes } from '@/types';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    min-width: 820px !important;
    background-color: ${({ theme }) => theme.colors.background};
    .btns {
      display: flex;
      justify-content: flex-end;
      grid-gap: 8px;
    }
  }
`;

interface FileModalProps {
  fileRef: FileRef | null;
  onClose: () => void;
}

const FileModal: React.FC<FileModalProps> = ({ fileRef, onClose }) => {
  return (
    <StyledDialog open={!!fileRef?.url} onClose={onClose}>
      {fileRef && (
        <>
          {fileRef.mimetype === SupportedFileTypes.pdf && <Pdf url={fileRef.url} />}
          {fileRef.mimetype === SupportedFileTypes.docx && <Docx url={fileRef.url} />}
        </>
      )}
    </StyledDialog>
  );
};

export default FileModal;

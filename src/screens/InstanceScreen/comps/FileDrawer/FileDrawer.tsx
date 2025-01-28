import * as React from 'react';
import { Drawer, IconButton, Typography } from '@mui/material';
import { FileMeta } from '@/api/types';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useStateSelector } from '@/state';
import { FileCard } from './comps';

const Wrap = styled(Drawer)`
  .MuiPaper-root {
    background-color: ${({ theme }) => theme.colors.appBgFront};
  }

  .fd-content {
    width: 420px;
    padding: 24px;
    display: grid;
    grid-gap: 8px;

    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
`;

interface FileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileMeta[];
}

export const FileDrawer: React.FC<FileDrawerProps> = ({ isOpen, onClose, files }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);

  return (
    <Wrap anchor={'right'} open={isOpen} onClose={onClose}>
      <div className="fd-content">
        <div className="fd-content__head">
          <Typography variant="h3">Files</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon style={{ color: colors.text }} />
          </IconButton>
        </div>
        {files.map((el) => (
          <FileCard key={el._id} file={el} />
        ))}
      </div>
    </Wrap>
  );
};

import * as React from 'react';
import { Box, Drawer } from '@mui/material';
import { FileMeta } from '@/api/types';
import { FileItem } from './comps';
import styled from '@emotion/styled';

const Wrap = styled(Drawer)`
  .MuiPaper-root {
    background-color: ${({ theme }) => theme.colors.appBgFront};
  }

  .fd-content {
    width: 500px;
    padding: 16px;
    display: grid;
    grid-gap: 8px;
  }
`;

interface FileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileMeta[];
}

export const FileDrawer: React.FC<FileDrawerProps> = ({ isOpen, onClose, files }) => {
  return (
    <Wrap anchor={'right'} open={isOpen} onClose={onClose}>
      <div className="fd-content">
        {files.map((el) => (
          <FileItem key={el._id} file={el} />
        ))}
      </div>
    </Wrap>
  );
};

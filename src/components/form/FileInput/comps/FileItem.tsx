import { formatBits } from '@/lib/misc';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { FileWithPath } from 'react-dropzone';
import { Clear } from '@mui/icons-material';
import { useStateSelector } from '@/state';

const Div = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  grid-gap: 8px;
`;

interface FileItemProps {
  data: FileWithPath;
  onRemove: (file: FileWithPath) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ data, onRemove }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  return (
    <Div>
      <Typography fontSize={14}>
        {data.name} - {formatBits(data.size)}
      </Typography>
      <Clear fontSize="small" sx={{ color: colors.error, cursor: 'pointer' }} onClick={() => onRemove(data)} />
    </Div>
  );
};

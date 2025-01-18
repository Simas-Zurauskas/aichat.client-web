import { FileMeta, FileRef } from '@/api/types';
import { Processing } from '@/components/common';
import { formatBits } from '@/lib/misc';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RemoveCircle, Edit } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Dialog from '@/components/Dialog';
import { toast } from 'react-toastify';
import { QKey } from '@/types';
import { useParams } from 'next/navigation';
import { delFile, requestFileUrl } from '@/api/routes/instances';
import FileModal from '@/components/FileModal';
import ContextModal from '@/components/ContextModal';

const Div = styled.div<{ isDeleting?: boolean }>`
  /* display: flex; */
  border: 1px solid rgba(122, 122, 122, 0.3);
  padding: 4px 8px;
  padding-right: 24px;
  border-radius: 4px;
  overflow-x: hidden;
  background-color: rgba(122, 122, 122, 0.05);
  position: relative;

  .fi-head {
    display: flex;
    grid-gap: 16px;
  }
  .fi-meta {
    display: flex;
    grid-gap: 16px;
  }

  .fi-delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    z-index: 1;
    svg {
      color: #c37878;
      font-size: 18px;
    }
  }

  .fi-edit {
    position: absolute;
    bottom: 4px;
    right: 4px;
    cursor: pointer;
    z-index: 1;
    svg {
      font-size: 18px;
    }
  }

  ${({ isDeleting }) =>
    isDeleting &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

const Title = styled(Typography)<{ $isLoading?: boolean }>`
  font-weight: 500;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      opacity: 0.5;
      &:hover {
        cursor: wait;
      }
    `}
`;

interface FileItemProps {
  file: FileMeta;
}

export const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const { id } = useParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRequestingUrl, setIsRequestingUrl] = useState(false);
  const [filreRef, setFileRef] = useState<FileRef | null>(null);
  const isProcessing = file.jobStatus === 'processing' || file.jobStatus === 'pending';

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: delFile,
    onError: () => {
      toast.error('Error deleting file');
    },

    onSuccess: () => {
      toast.success('File deleted');
      return queryClient.invalidateQueries({
        queryKey: [QKey.instance, id],
      });
    },
  });

  const handleRequestUrl = () => {
    setIsRequestingUrl(true);
    requestFileUrl({ uxId: id, fileId: file._id })
      .then((ref) => {
        setFileRef(ref);
      })
      .finally(() => {
        setIsRequestingUrl(false);
      });
  };

  return (
    <>
      <ContextModal
        instanceId={id}
        fileId={file._id}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        value={file.context}
      />
      <FileModal fileRef={filreRef} onClose={() => setFileRef(null)} />
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          mutate({ uxId: id, fileId: file._id });
        }}
      />
      <Div isDeleting={isPending}>
        <div className="fi-head">
          <Title $isLoading={isRequestingUrl} noWrap onClick={handleRequestUrl}>
            {file.originalName}
          </Title>
        </div>

        <Typography variant="body2">
          Context: {file.context ? file.context : <i style={{ color: 'orangered' }}>No context</i>}
        </Typography>
        <div className="fi-meta">
          {file.jobStatus === 'failed' ? (
            <Typography color="error" variant="body2" fontWeight={600}>
              FAILED
            </Typography>
          ) : (
            <>
              <Typography variant="body2">Vectors: {file.vectorCount}</Typography>
              <Typography variant="body2">Size: {formatBits(file.size)}</Typography>
            </>
          )}
          <div
            className="fi-delete"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteDialogOpen(true);
            }}
          >
            <RemoveCircle />
          </div>

          <div
            className="fi-edit"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditDialogOpen(true);
            }}
          >
            <Edit />
          </div>
        </div>
        {isProcessing && (
          <div>
            <Box mb={1} />
            <Processing />
          </div>
        )}
      </Div>
    </>
  );
};

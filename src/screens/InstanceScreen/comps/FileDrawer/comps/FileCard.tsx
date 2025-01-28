import { delFile, requestFileUrl } from '@/api/routes/instances';
import { FileMeta, FileRef } from '@/api/types';
import Dialog from '@/components/Dialog';
import FileModal from '@/components/FileModal';
import { FileContextModal } from '@/components/modal';
import { useStateSelector } from '@/state';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { formatBits } from '@/lib/misc';

const Div = styled.div<{ isDeleting?: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.asideActive};
  overflow: hidden;
  display: flex;
  font-size: unset;

  .chead {
    width: 38px;
    background: ${({ theme }) => theme.colors.asideActive};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;

    &__delete {
      cursor: pointer;
      position: relative;
      z-index: 1;
      &:after {
        content: '';
        position: absolute;
        top: -8px;
        left: -10px;
        right: -10px;
        bottom: -6px;
        border-radius: 50%;
        z-index: -1;
      }
      path {
        fill: ${({ theme }) => theme.colors.textWhite};
      }
      &:hover {
        path {
          fill: ${({ theme }) => theme.colors.error};
        }
        &:before {
          content: '';
          position: absolute;
          top: 2px;
          left: 1px;
          right: 1px;
          bottom: 8px;
          background-color: ${({ theme }) => theme.colors.textWhite};
          border-radius: 50%;
          z-index: -1;
        }
      }
    }
  }

  .ccontent {
    display: flex;
    flex: 1;
    padding: 10px 16px;
    background: ${({ theme }) => theme.colors.card};
    flex-direction: column;
    grid-gap: 2px;
    &__processing {
      display: flex;
      align-items: center;
      grid-gap: 8px;
    }
  }

  .fi-edit {
    cursor: pointer;
    svg {
      font-size: 20px;
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

interface FileCardProps {
  file: FileMeta;
}

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const { id } = useParams<{ id: string }>();
  const colors = useStateSelector(({ theme }) => theme.colors);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRequestingUrl, setIsRequestingUrl] = useState(false);
  const [filreRef, setFileRef] = useState<FileRef | null>(null);
  const isProcessing = file.jobStatus === 'processing' || file.jobStatus === 'pending';

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: delFile,

    onSuccess: () => {
      toast.success('File deleted');
      return queryClient.invalidateQueries({
        queryKey: [QKey.instance, id],
      });
    },
    onError: () => {
      toast.error('Something went wrong');
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
      <FileContextModal
        instanceId={id}
        fileId={file._id}
        initialValue={file.context}
        onClose={() => setIsEditDialogOpen(false)}
        open={isEditDialogOpen}
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
        <div className="ccontent">
          <Title
            $isLoading={isRequestingUrl || isProcessing}
            noWrap
            onClick={!isProcessing ? handleRequestUrl : undefined}
          >
            {file.originalName}
          </Title>
          {file.jobStatus === 'failed' ? (
            <Typography color="error" variant="body2" fontWeight={600}>
              FAILED
            </Typography>
          ) : (
            <>
              <Typography variant="body2">Vectors: {file.vectorCount}</Typography>
              <Typography variant="body2">Size: {formatBits(file.size)}</Typography>
              <Typography variant="body2">
                Context: {file.context ? file.context : <i style={{ opacity: 0.7 }}>No context</i>}
              </Typography>
            </>
          )}

          {isProcessing && (
            <>
              <Box mb={1} />
              <div className="ccontent__processing">
                <CircularProgress size={20} />
                <Typography>Processing...</Typography>
              </div>
            </>
          )}
        </div>
        <div className="chead">
          <div
            className="chead__delete"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteDialogOpen(true);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C3.581 0 0 3.582 0 8C0 12.418 3.581 16 8 16C12.419 16 16 12.418 16 8C16 3.582 12.419 0 8 0ZM11.707 10.293C11.8945 10.4805 11.9998 10.7348 11.9998 11C11.9998 11.2652 11.8945 11.5195 11.707 11.707C11.5195 11.8945 11.2652 11.9998 11 11.9998C10.7348 11.9998 10.4805 11.8945 10.293 11.707L8 9.414L5.707 11.707C5.61435 11.8002 5.50419 11.8741 5.38285 11.9246C5.26152 11.9751 5.13141 12.001 5 12.001C4.86859 12.001 4.73848 11.9751 4.61715 11.9246C4.49581 11.8741 4.38565 11.8002 4.293 11.707C4.10553 11.5195 4.00021 11.2652 4.00021 11C4.00021 10.7348 4.10553 10.4805 4.293 10.293L6.586 8L4.293 5.707C4.10549 5.51949 4.00015 5.26518 4.00015 5C4.00015 4.73482 4.10549 4.48051 4.293 4.293C4.48051 4.10549 4.73482 4.00015 5 4.00015C5.26518 4.00015 5.51949 4.10549 5.707 4.293L8 6.586L10.293 4.293C10.4805 4.10549 10.7348 4.00015 11 4.00015C11.2652 4.00015 11.5195 4.10549 11.707 4.293C11.8945 4.48051 11.9998 4.73482 11.9998 5C11.9998 5.26518 11.8945 5.51949 11.707 5.707L9.414 8L11.707 10.293Z"
                fill={colors.text}
              />
            </svg>
          </div>

          <div
            className="fi-edit"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditDialogOpen(true);
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.988 2.01221L21.988 5.01221L19.701 7.30021L16.701 4.30021L18.988 2.01221ZM8 16.0002H11L18.287 8.71321L15.287 5.71321L8 13.0002V16.0002Z"
                fill={colors.textWhite}
              />
              <path
                d="M19 19H8.158C8.132 19 8.105 19.01 8.079 19.01C8.046 19.01 8.013 19.001 7.979 19H5V5H11.847L13.847 3H5C3.897 3 3 3.896 3 5V19C3 20.104 3.897 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V10.332L19 12.332V19Z"
                fill={colors.textWhite}
              />
            </svg>
          </div>
        </div>
      </Div>
    </>
  );
};

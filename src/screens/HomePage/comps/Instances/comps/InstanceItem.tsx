import { Instance } from '@/api/types';
import { formatBits, formatDate } from '@/lib/misc';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RemoveCircle } from '@mui/icons-material';
import Dialog from '@/components/Dialog';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delInstance } from '@/api/routes/instances';
import { toast } from 'react-toastify';
import { QKey } from '@/types';
import { Processing } from '@/components/common';

const Div = styled.div<{ $isDeleting?: boolean }>`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 20px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: grid;
  position: relative;
  cursor: pointer;

  .ii-delete {
    position: absolute;
    top: 4px;
    right: 4px;
    svg {
      color: #c37878;
      font-size: 18px;
    }
  }

  .ii-item {
    display: flex;
    justify-content: space-between;
  }

  ${({ $isDeleting }) =>
    $isDeleting &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      /* pointer-events: none; */
      .ii-delete {
        display: none;
      }
      &:hover {
      }
    `}
`;

interface InstanceItemProps {
  data: Instance;
  isProcessing: boolean;
}

export const InstanceItem: React.FC<InstanceItemProps> = ({ data, isProcessing }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: delInstance,
    onError: () => {
      toast.error('Error deleting instance');
    },

    onSuccess: () => {
      toast.success('Instance deleted');
      return queryClient.invalidateQueries({
        queryKey: [QKey.instances],
      });
    },
  });

  console.log('InstanceItem', data);
  return (
    <>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          mutate(data.uxId);
        }}
      />
      <Div
        $isDeleting={isPending}
        onClick={() => {
          !isPending && router.push(`/instance/${data.uxId}`);
        }}
      >
        <div
          className="ii-delete"
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteDialogOpen(true);
          }}
        >
          <RemoveCircle />
        </div>

        <Typography noWrap fontWeight={500}>
          {data.name}
        </Typography>
        <Box mb={1} />
        <div>{isProcessing && <Processing />}</div>
        <div className="ii-item">
          <Typography noWrap>Vectors:</Typography>
          <Typography noWrap>{data.files.reduce((acc, el) => acc + el.vectorCount, 0)}</Typography>
        </div>
        <div className="ii-item">
          <Typography noWrap>Files:</Typography>
          <Typography noWrap>{data.files.length}</Typography>
        </div>
        <div className="ii-item">
          <Typography noWrap>Mesages:</Typography>
          <Typography noWrap>{data.chat.length}</Typography>
        </div>
        <div className="ii-item">
          <Typography noWrap>Updated:</Typography>
          <Typography noWrap>{formatDate(data.updatedAt)}</Typography>
        </div>
        <div className="ii-item">
          <Typography noWrap>Created:</Typography>
          <Typography noWrap>{formatDate(data.createdAt)}</Typography>
        </div>
        <div className="ii-item">
          <Typography noWrap color="error">
            Will delete:
          </Typography>
          <Typography noWrap color="error">
            {formatDate(data.deleteAt)}
          </Typography>
        </div>
        {/* <div className="ii-item">
          <Typography noWrap>Size:</Typography>
          <Typography noWrap>{formatBits(data.size)}</Typography>
        </div> */}
        {/* <div className="ii-item">
          <Typography noWrap>Vectors:</Typography>
          <Typography noWrap>{data.vectorIds?.length}</Typography>
        </div> */}
      </Div>
    </>
  );
};

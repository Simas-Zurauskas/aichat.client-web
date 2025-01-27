import { delInstance } from '@/api/routes/instances';
import { Instance, llmNaming, responseStyleNaming } from '@/api/types';
import Dialog from '@/components/Dialog';
import { formatDate, numeralFormat } from '@/lib/misc';
import { useStateSelector } from '@/state';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ButtonBase, CircularProgress, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Div = styled(ButtonBase)<{ isDeleting: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.asideActive};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: unset;

  .chead {
    height: 40px;
    background: ${({ theme }) => theme.colors.asideActive};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 16px;
    width: 100%;

    &__processing {
      display: flex;
      align-items: center;
      grid-gap: 8px;
    }

    &__delete {
      cursor: pointer;
      position: relative;
      z-index: 1;
      &:after {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -6px;
        border-radius: 50%;
        z-index: -1;
      }
      &:hover {
        path {
          fill: ${({ theme }) => theme.colors.error};
        }
        &:before {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          bottom: 5px;
          background-color: white;
          border-radius: 50%;
          z-index: -1;
        }
      }
    }
  }

  .ccontent {
    background: ${({ theme }) => theme.colors.card};
    height: 216px;
    width: 100%;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    &__item {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  &:hover {
    .ccontent {
      background: #e5f1ff;
    }
  }

  ${({ isDeleting }) =>
    isDeleting &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      .chead__delete {
        display: none;
      }
    `}
`;

interface CardProps {
  data: Instance;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isProcessing = data.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing');

  const { mutate, isPending } = useMutation({
    mutationFn: delInstance,
    onError: () => {
      toast.error('Error deleting node');
    },

    onSuccess: () => {
      toast.success('Node deleted');
      return queryClient.invalidateQueries({
        queryKey: [QKey.instances],
      });
    },
  });

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
      <Div onClick={isPending ? undefined : () => router.push(`/node/${data.uxId}`)} isDeleting={isPending}>
        <div className="chead">
          <div>
            {isProcessing && (
              <div className="chead__processing">
                <CircularProgress size={'14px'} style={{ color: colors.textWhite }} />
                <Typography variant="body2" style={{ color: colors.textWhite }}>
                  Processing...
                </Typography>
              </div>
            )}
          </div>
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
                fill={colors.textWhite}
              />
            </svg>
          </div>
        </div>
        <div className="ccontent">
          <Typography variant="body1" fontWeight={500} noWrap sx={{ maxWidth: '100%', marginBottom: '4px' }}>
            {data.name}
          </Typography>
          <div className="ccontent__item">
            <Typography noWrap>Vectors:</Typography>
            <Typography noWrap>{numeralFormat(data.files.reduce((acc, el) => acc + el.vectorCount, 0))}</Typography>
          </div>
          <div className="ccontent__item">
            <Typography noWrap>Files:</Typography>
            <Typography noWrap>{data.files.length}</Typography>
          </div>
          <div className="ccontent__item">
            <Typography noWrap>Model:</Typography>
            <Typography noWrap>{llmNaming[data.llm]}</Typography>
          </div>
          <div className="ccontent__item">
            <Typography noWrap>Response style:</Typography>
            <Typography noWrap>{responseStyleNaming[data.temperature]}</Typography>
          </div>
          <div className="ccontent__item">
            <Typography noWrap>Mesages:</Typography>
            <Typography noWrap>{data.chat.length}</Typography>
          </div>
          <div className="ccontent__item">
            <Typography noWrap color="error">
              Will delete:
            </Typography>
            <Typography noWrap color="error">
              {formatDate(data.deleteAt)}
            </Typography>
          </div>
        </div>
      </Div>
    </>
  );
};

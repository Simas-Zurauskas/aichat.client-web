import { Message } from '@/api/types';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { MsgWrap } from './styled';
import { Button } from '@/components/form';
import { ThumbUp, ThumbDown, ThumbUpAltOutlined, ThumbDownAltOutlined, ContentCopyOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveFeedback } from '@/api/routes/instances';
import { toast } from 'react-toastify';
import { QKey } from '@/types';

const Div = styled.div`
  display: flex;
  grid-gap: 4px;
  flex-direction: column;

  .msg-panel {
    display: flex;
    opacity: 0.7;
    button {
      min-width: 28px;
      width: 28px;
      border: none;
    }

    &__copy {
      min-width: 70px !important;
      width: 70px !important;
    }
  }

  .MuiButton-outlined {
    background-color: transparent;
  }
`;

interface MsgProps {
  data: Message;
  instanceUxId: string;
}

export const Msg: React.FC<MsgProps> = ({ data, instanceUxId }) => {
  const queryClient = useQueryClient();
  const isAI = data.role === 'ai';

  const { mutate, isPending } = useMutation({
    mutationFn: leaveFeedback,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QKey.chat, instanceUxId] });
      toast.success('Feedback submitted');
    },
    onError: () => {
      toast.error('Error submitting feedback');
    },
  });

  return (
    // <RevealFx speed="medium" trigger={true} translateY={0} delay={0}>
    <Div>
      <MsgWrap $isAI={isAI}>
        <Typography>{data.content}</Typography>
      </MsgWrap>
      {isAI && (
        <div className="msg-panel">
          <Button
            variant={'outlined'}
            onClick={() => {
              const feedback = data.feedback === 'positive' ? null : 'positive';
              mutate({ instanceUxId, messageId: data._id, feedback });
            }}
            disabled={isPending}
            size="small"
          >
            {data.feedback === 'positive' ? (
              <ThumbUp fontSize="small" sx={{ fontSize: 18 }} />
            ) : (
              <ThumbUpAltOutlined fontSize="small" sx={{ fontSize: 18 }} />
            )}
          </Button>
          <Button
            variant={'outlined'}
            onClick={() => {
              const feedback = data.feedback === 'negative' ? null : 'negative';
              mutate({ instanceUxId, messageId: data._id, feedback });
            }}
            disabled={isPending}
            size="small"
          >
            {data.feedback === 'negative' ? (
              <ThumbDown fontSize="small" sx={{ fontSize: 18 }} />
            ) : (
              <ThumbDownAltOutlined fontSize="small" sx={{ fontSize: 18 }} />
            )}
          </Button>
          <Button
            className="msg-panel__copy"
            variant={'outlined'}
            onClick={() => {
              navigator.clipboard.writeText(data.content);
              toast.success('Copied to clipboard');
            }}
            size="small"
          >
            <ContentCopyOutlined fontSize="small" sx={{ marginRight: 0.5, fontSize: 16 }} />
            Copy
          </Button>
        </div>
      )}
    </Div>
    // </RevealFx>
  );
};

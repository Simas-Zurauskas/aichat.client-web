import { Message } from '@/api/types';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { MsgWrap } from './styled';
import { Button } from '@/components/form';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { leaveFeedback } from '@/api/routes/instances';
import { toast } from 'react-toastify';
import { QKey } from '@/types';

const Div = styled.div`
  display: flex;
  grid-gap: 8px;
  .msg-panel {
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    button {
      min-width: 32px !important;
      width: 32px !important;
    }
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

  console.log('data', data);

  return (
    <Div>
      <MsgWrap $isAI={isAI}>
        <Typography>{data.content}</Typography>
      </MsgWrap>
      {isAI && (
        <div className="msg-panel">
          <Button
            variant={data.feedback === 'positive' ? 'contained' : 'outlined'}
            onClick={() => {
              const feedback = data.feedback === 'positive' ? null : 'positive';
              mutate({ instanceUxId, messageId: data._id, feedback });
            }}
            disabled={isPending}
            size="small"
          >
            <ThumbUp fontSize="small" />
          </Button>
          <Button
            variant={data.feedback === 'negative' ? 'contained' : 'outlined'}
            onClick={() => {
              const feedback = data.feedback === 'negative' ? null : 'negative';
              mutate({ instanceUxId, messageId: data._id, feedback });
            }}
            disabled={isPending}
            size="small"
          >
            <ThumbDown fontSize="small" />
          </Button>
        </div>
      )}
    </Div>
  );
};

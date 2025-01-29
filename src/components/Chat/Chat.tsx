import { getChat, sendChatMessage } from '@/api/routes/instances';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { Msg, Thinking, Welcome } from './comps';
import { Message } from '@/api/types';
import { toast } from 'react-toastify';
import { Button, Input } from '../form';
import { useStateSelector } from '@/state';
import { Box } from '@mui/material';

const Div = styled.div<{ isEmpty: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'unset')};

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;

    &__container {
      max-width: 745px;
      margin: 0 auto;
      display: grid;
      grid-gap: 22px;
      grid-auto-rows: min-content;
    }
  }

  .input {
    padding: 0 20px;
    flex-shrink: 0;
    width: 100%;
    padding-bottom: 1rem;
    display: flex;
    max-width: 745px;
    margin: 0 auto;

    &__wrap {
      background-color: ${({ theme }) => theme.colors.card};
      border-radius: 8px;
      flex: 1;
    }

    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.blue};
      border-radius: 8px;
    }
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${({ theme }) => theme.colors.blue};
      border-radius: 8px;
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 2px solid ${({ theme }) => theme.colors.blue};
      border-radius: 8px;
    }

    .MuiFormLabel-root {
      color: ${({ theme }) => theme.colors.blue};
    }

    input {
      padding-top: 13px;
      padding-bottom: 13px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .messages {
      padding: 10px 16px;
      flex: 1;
      overflow-y: auto;
      padding: 0%.8 0;

      &__container {
        grid-gap: 14px;
      }
    }

    .input {
      padding: 0 16px;
      padding-bottom: 0.8rem;
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    .messages {
      &__container {
        grid-gap: 10px;
      }
    }
  }
`;

const SendBtn = styled(Button)`
  margin-left: 0.5rem;
  border-radius: 8px;
  min-width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => theme.colors.card};

  &:hover {
    background-color: #e5f1ff;
  }
`;

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const [text, setText] = useState('');
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const colors = useStateSelector(({ theme }) => theme.colors);

  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: [QKey.chat, id],
    queryFn: () => getChat(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendChatMessage,
    onMutate: async (data) => {},
    onSuccess: (data) => {
      queryClient.setQueryData<Message[]>([QKey.chat, id], (prev) => [...(prev || []), data]);
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong');
    },
  });

  const scrollToBottom = useCallback(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll, scrollToBottom]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    const trimmedText = text.trim();
    if (trimmedText.length === 0) return;

    const newMessage: Message = {
      _id: String(Date.now()),
      role: 'user',
      date: new Date(),
      content: trimmedText,
    };

    queryClient.setQueryData<Message[]>([QKey.chat, id], (prev) => [...(prev || []), newMessage]);
    mutate({ uxId: id, message: trimmedText });
    setText('');
  };

  const handleScroll = () => {
    if (!messagesRef.current) return;
    const el = messagesRef.current;
    const scrollPosition = el.scrollTop + el.clientHeight;
    const scrollHeight = el.scrollHeight;

    const nearBottom = scrollHeight - scrollPosition < 350;
    setShouldAutoScroll(nearBottom);
  };

  const isDisabled = isPending || !text.trim();
  const isEmpty = !messages.length && !isLoading;

  return (
    <Div isEmpty={isEmpty} className="styled-scroll">
      {!isEmpty && (
        <div className="messages styled-scroll" ref={messagesRef} onScroll={handleScroll}>
          <div className="messages__container">
            {messages.map((msg) => (
              <Msg key={msg._id} data={msg} instanceUxId={id} />
            ))}
            {isPending && <Thinking />}
            <Box mb={2} />
          </div>
        </div>
      )}

      {isEmpty && <Welcome />}

      <div className="input">
        <div className="input__wrap">
          <Input
            placeholder="Message ProMax.AI"
            disabled={isPending}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            multiline
            maxRows={3}
            autoFocus
          />
        </div>
        <SendBtn variant="outlined" onClick={() => sendMessage()} disabled={isDisabled}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.4 19.4251C4.06667 19.5585 3.75 19.5291 3.45 19.3371C3.15 19.1451 3 18.8661 3 18.5001V14.0001L11 12.0001L3 10.0001V5.50014C3 5.13347 3.15 4.85447 3.45 4.66314C3.75 4.4718 4.06667 4.44247 4.4 4.57514L19.8 11.0751C20.2167 11.2585 20.425 11.5668 20.425 12.0001C20.425 12.4335 20.2167 12.7418 19.8 12.9251L4.4 19.4251Z"
              fill={colors.blue}
              opacity={isDisabled ? 0.7 : 1}
            />
          </svg>
        </SendBtn>
      </div>
    </Div>
  );
};

export default Chat;

import { getChat, sendChatMessage } from '@/api/routes/instances';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { Msg, Thinking } from './comps';
import { Message } from '@/api/types';
import { toast } from 'react-toastify';

const Div = styled.div`
  /* max-width: 600px; */
  border: 1px solid gray;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: grid;
    grid-gap: 0.5rem;
    grid-auto-rows: min-content;
  }

  .input {
    flex-shrink: 0;
    /* background-color: green; */
    width: 100%;
    padding: 1px 16px 16px 16px;

    input {
      width: 100%;
      padding: 0.5rem;
    }
  }
`;

interface ChatProps {
  id: string;
}

const Chat: React.FC<ChatProps> = ({ id }) => {
  const [text, setText] = useState('');
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: [QKey.chat, id],
    queryFn: () => getChat(id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendChatMessage,
    onMutate: async (data) => {},
    onSuccess: (data) => {
      queryClient.setQueryData<Message[]>([QKey.chat, id], (prev) => [...(prev || []), data]);
    },
    onError: () => {
      toast.error('Error sending message');
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
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // sendChatMessage

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

  return (
    <Div>
      <div className="messages" ref={messagesRef} onScroll={handleScroll}>
        {messages.map((msg) => (
          <Msg key={msg._id} data={msg} instanceUxId={id} />
        ))}
        {isPending && <Thinking />}
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Type your message..."
          disabled={isPending}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </Div>
  );
};

export default Chat;

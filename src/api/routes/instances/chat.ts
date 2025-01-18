import { client } from '../../client';
import { ApiResponse, Message } from '../../types';
export * from './file';

type DelChat = (uxId: string) => Promise<ApiResponse<Message[]>>;

export const delChat: DelChat = (uxId) => {
  return client({
    url: `/instances/${uxId}/chat`,
    method: 'DELETE',
  }).then((res) => res.data.data);
};
// ----------------------------------------------------------------------------------------

type SendChatMessage = (params: { uxId: string; message: string }) => Promise<ApiResponse<Message>>;

export const sendChatMessage: SendChatMessage = ({ uxId, ...data }) => {
  return client({
    url: `/instances/${uxId}/chat`,
    method: 'POST',
    data,
  }).then((res) => res.data.data);
};

// ----------------------------------------------------------------------------------------
type LeaveFeedback = (params: {
  instanceUxId: string;
  messageId: string;
  feedback: 'negative' | 'positive' | null;
}) => Promise<ApiResponse<Message>>;

export const leaveFeedback: LeaveFeedback = ({ instanceUxId, messageId, ...data }) => {
  return client({
    url: `/instances/${instanceUxId}/chat/feedback/${messageId}`,
    method: 'PUT',
    data,
  }).then((res) => res.data.data);
};

// ----------------------------------------------------------------------------------------

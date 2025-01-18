import styled from '@emotion/styled';

export const MsgWrap = styled.div<{ $isAI: boolean }>`
  border: 1px solid gray;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: ${({ $isAI }) => ($isAI ? 'left' : 'right')};
  align-self: ${({ $isAI }) => ($isAI ? 'flex-start' : 'flex-end')};
  margin-left: ${({ $isAI }) => ($isAI ? '0' : 'auto')};
  margin-right: ${({ $isAI }) => ($isAI ? 'auto' : '0')};
  background-color: ${({ $isAI }) => ($isAI ? 'rgb(180,180,250,0.2)' : 'rgb(180,180,180,0.1)')};
  min-height: 40px;

  white-space: pre-wrap;
`;

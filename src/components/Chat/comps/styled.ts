import styled from '@emotion/styled';

export const MsgWrap = styled.div<{ $isAI: boolean }>`
  border: 1px solid #c3ccd6;
  padding: 10px 18px;
  border-radius: 8px;
  text-align: ${({ $isAI }) => ($isAI ? 'left' : 'right')};
  align-self: ${({ $isAI }) => ($isAI ? 'flex-start' : 'flex-end')};
  margin-left: ${({ $isAI }) => ($isAI ? '0' : 'auto')};
  margin-right: ${({ $isAI }) => ($isAI ? 'auto' : '0')};
  background-color: ${({ $isAI, theme }) =>
    $isAI
      ? theme.scheme === 'light'
        ? '#ECF1F6'
        : '#ECF1F6'
      : theme.scheme === 'light'
      ? theme.colors.appBgFront
      : theme.colors.appBgFront};
  min-height: 44px;

  white-space: pre-wrap;
`;

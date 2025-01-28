import styled from '@emotion/styled';

export const MsgWrap = styled.div<{ $isAI: boolean }>`
  border: 1px solid ${({ theme }) => (theme.scheme === 'light' ? '#c3ccd6' : 'rgb(61, 75, 84)')};
  padding: 10px 18px;
  border-radius: 8px;
  align-self: ${({ $isAI }) => ($isAI ? 'flex-start' : 'flex-end')};
  margin-left: ${({ $isAI }) => ($isAI ? '0' : 'auto')};
  margin-right: ${({ $isAI }) => ($isAI ? 'auto' : '0')};
  background-color: ${({ $isAI, theme }) =>
    $isAI
      ? theme.scheme === 'light'
        ? '#ECF1F6'
        : '#1C252C'
      : theme.scheme === 'light'
      ? theme.colors.appBgFront
      : theme.colors.appBgFront};
  min-height: 44px;
  white-space: pre-wrap;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 8px 14px;
    min-height: unset;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 6px 12px;
  }
`;

import styled from '@emotion/styled';
import { MsgWrap } from './styled';

const Wrap = styled(MsgWrap)`
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.text};
    margin: 0 3px;
    animation: bounce 1s infinite;
    margin-top: 8px;
  }

  div:nth-of-type(1) {
    animation-delay: 0s;
  }

  div:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  div:nth-of-type(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-6px);
    }
  }
`;

interface ThinkingProps {}

export const Thinking: React.FC<ThinkingProps> = () => {
  return (
    <Wrap $isAI>
      <div />
      <div />
      <div />
    </Wrap>
  );
};

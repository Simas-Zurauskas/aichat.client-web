import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const Div = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
  overflow: hidden;

  &:hover {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(200, 200, 255, 0.07);
    }
  }

  .label {
    color: ${({ theme }) => theme.colors.textWhite};
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.asideActive};
    `}
`;

interface RouteItemProps {
  title: string;
  icon: React.ReactNode;
  path: string;
  pathRegex: RegExp[];
}
[/^\/$/, /^\/account$/, /^\/instance\/[a-zA-Z0-9-]+$/];

export const RouteItem: React.FC<RouteItemProps> = ({ icon, title, path, pathRegex }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathRegex.some((regex) => regex.test(pathname));

  return (
    <Div onClick={() => router.push(path)} isActive={isActive}>
      {icon}
      <Typography className="label">{title}</Typography>
    </Div>
  );
};

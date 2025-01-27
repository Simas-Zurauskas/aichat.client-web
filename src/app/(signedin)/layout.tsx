'use client';
import { useStateSelector } from '@/state';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import Aside from '@/components/main/Aside';

const Div = styled.div`
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 300px 1fr;

  main {
    height: 100%;
    flex: 1;
    overflow-y: auto;
    color-scheme: light dark;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 200px 1fr;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    grid-template-columns: 52px 1fr;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSignedIn = useStateSelector(({ auth }) => !!auth.user);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isSignedIn) {
      router.replace('/auth');
    }
  }, [isSignedIn]);

  if (!isSignedIn) return;

  return (
    <Div>
      <Aside />
      <main>{children}</main>
    </Div>
  );
};

export default Layout;

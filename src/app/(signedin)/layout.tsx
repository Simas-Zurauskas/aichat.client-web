'use client';
import { authorise } from '@/api/routes/auth';
import { getToken, removeToken } from '@/api/utils';
import Nav from '@/components/Nav';
import { useStateSelector } from '@/state';
import useActionsAuth from '@/state/actionHooks/useActionsAuth';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';
import styled from '@emotion/styled';
import Aside from '@/components/main/Aside';

const Div = styled.div`
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: 220px 1fr;

  main {
    height: 100%;
    flex: 1;
    overflow-y: auto;
    color-scheme: light dark;
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

'use client';
import { getInstance } from '@/api/routes/instances';
import Chat from '@/components/Chat';
import { PageContainer } from '@/components/layout';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Toolbar } from './comps';
import { Loading } from '@/components/Loading';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mui/material';
import { KeyboardDoubleArrowRight, KeyboardDoubleArrowLeft } from '@mui/icons-material';

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  position: relative;

  .chat {
    overflow-y: auto;
    height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar {
    background-color: ${({ theme }) => (theme.scheme === 'light' ? '#ecf1f6' : '#1c252c')};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &__handle {
      position: absolute;
      top: 0px;
      padding: 8px;
      cursor: pointer;
      border-radius: 50px;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 1fr 0px;

    .chat {
      height: calc(100vh - 76px);
    }

    .toolbar {
      padding-top: 24px;
      right: 0;
      height: 100%;
      position: absolute;
      -webkit-tap-highlight-color: transparent;
    }
  }
`;

const InstanceScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const queryClient = useQueryClient();

  const isMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { data } = useQuery({
    queryKey: [QKey.instance, id],
    queryFn: () => getInstance(id),
  });

  useEffect(() => {
    setIsProcessing(!!data?.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing'));
  }, [data]);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        console.log('invalidate');
        queryClient.invalidateQueries({
          queryKey: [QKey.instance, id],
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        queryClient.invalidateQueries({
          queryKey: [QKey.user],
        });
      };
    }
  }, [data, id, isProcessing]);

  return (
    <PageContainer title={data?.name || ''} contentStyle={{ padding: 0 }}>
      <Main>
        <div className="chat">{data ? <>{data && <Chat id={id} />}</> : <Loading />}</div>
        <motion.div
          className="toolbar"
          initial={false}
          animate={{ x: isMd ? (isToolbarOpen ? 0 : 250) : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMd && (
            <motion.div
              initial={false}
              animate={{
                x: isToolbarOpen ? 0 : -40,
              }}
              className="toolbar__handle"
              onClick={() => setIsToolbarOpen(!isToolbarOpen)}
            >
              {isToolbarOpen ? <KeyboardDoubleArrowRight /> : <KeyboardDoubleArrowLeft />}
            </motion.div>
          )}
          {data && <Toolbar data={data} />}
        </motion.div>
      </Main>
    </PageContainer>
  );
};

export default InstanceScreen;

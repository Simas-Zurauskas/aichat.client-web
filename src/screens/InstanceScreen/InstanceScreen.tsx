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
import SettingsModal from '@/components/SettingsModal';
import { Loading } from '@/components/Loading';

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;

  .chat {
    /* padding: 0 38px; */
    overflow-y: auto;
    height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toolbar {
    background-color: #ecf1f6;
    border-left: 1px solid #e0e0e0;
  }
`;

const InstanceScreen = () => {
  const { id } = useParams<{ id: string }>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
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
    <>
      <SettingsModal
        id={id}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        value={data?.userSettings || ''}
      />

      <PageContainer title={data?.name || ''} contentStyle={{ padding: 0 }}>
        <Main>
          <div className="chat">{data ? <>{data && <Chat id={id} />}</> : <Loading />}</div>
          <div className="toolbar">{data && <Toolbar data={data} />}</div>
        </Main>
      </PageContainer>
    </>
  );
};

export default InstanceScreen;

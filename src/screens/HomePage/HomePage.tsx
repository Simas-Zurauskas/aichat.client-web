'use client';
import { CircularProgress } from '@mui/material';
import { Card, Empty } from './comps';
import { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QKey } from '@/types';
import { getInstances } from '@/api/routes/instances';
import { CreateInstanceModal } from '@/components/modal';
import styled from '@emotion/styled';
import { CardNew } from './comps/CardNew';

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 16px;
`;

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: [QKey.instances],
    queryFn: getInstances,
  });

  useEffect(() => {
    const isProcessing = data?.some((el) =>
      el.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing'),
    );
    if (isProcessing) {
      const interval = setInterval(() => {
        queryClient.invalidateQueries({
          queryKey: [QKey.instances],
        });
      }, 1000);
      return () => {
        queryClient.invalidateQueries({
          queryKey: [QKey.user],
        });
        clearInterval(interval);
      };
    }
  }, [data]);

  return (
    <>
      <CreateInstanceModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <PageContainer title="Nodes">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {data.length ? (
              <Div>
                {data.map((el) => {
                  return <Card key={el._id} data={el} />;
                })}
                {data.length < 10 && <CardNew onClick={() => setIsCreateModalOpen(true)} />}
              </Div>
            ) : (
              <Empty onClick={() => setIsCreateModalOpen(true)} />
            )}
          </>
        )}
      </PageContainer>
    </>
  );
};

export default HomePage;

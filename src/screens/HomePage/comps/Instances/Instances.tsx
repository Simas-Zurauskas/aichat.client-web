import { getInstances } from '@/api/routes/instances';
import { QKey } from '@/types';
import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { InstanceItem } from './comps/InstanceItem';
import { useEffect } from 'react';

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;
`;

interface InstancesProps {}

export const Instances: React.FC<InstancesProps> = () => {
  const queryClient = useQueryClient();

  const { data = [] } = useQuery({
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
    <Div>
      {data?.map((el) => {
        const isProcessing = el.files.some((el) => el.jobStatus === 'pending' || el.jobStatus === 'processing');
        return <InstanceItem key={el._id} data={el} isProcessing={isProcessing} />;
      })}
    </Div>
  );
};

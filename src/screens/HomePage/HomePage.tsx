'use client';
import { Box, Button, Typography } from '@mui/material';
import { CreateNew, Instances } from './comps';
import { useState } from 'react';
import { PageContainer } from '@/components/layout';

const HomePage = () => {
  const [section, setSection] = useState<'instances' | 'new'>('instances');
  return (
    <PageContainer>
      <Typography className="ptitle">Instances</Typography>
      <Box mb={4} />
      {section === 'instances' && (
        <>
          <Button variant="outlined" onClick={() => setSection('new')}>
            + CREATE NEW
          </Button>
          <Box mb={2} />
          <Instances />
        </>
      )}
      {section === 'new' && (
        <>
          <Button variant="outlined" onClick={() => setSection('instances')}>
            CANCEL
          </Button>
          <Box mb={2} />
          <CreateNew onCreate={() => setSection('instances')} />
        </>
      )}
    </PageContainer>
  );
};

export default HomePage;

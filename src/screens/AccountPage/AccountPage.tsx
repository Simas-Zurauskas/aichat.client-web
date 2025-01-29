'use client';
import { Alert, Box, Typography } from '@mui/material';
import { PageContainer } from '@/components/layout';
import { useStateSelector } from '@/state';
import { makeLogout } from '@/api/utils';
import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/api/routes/account';
import { toast } from 'react-toastify';
import { formatDate, numeralFormat } from '@/lib/misc';
import Link from 'next/link';
import styled from '@emotion/styled';
import Dialog from '@/components/Dialog';
import { useState } from 'react';
import { Button } from '@/components/form';

const Wrap = styled.div`
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const AccountPage = () => {
  const { user } = useStateSelector(({ auth }) => {
    return { user: auth.user };
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteAccount,
    onError: (error) => {
      toast.error('Error deleting account');
    },
    onSuccess: () => {
      toast.success('Account deleted');
      makeLogout();
    },
  });

  return (
    <>
      <Dialog
        title="Delete Your Profile?"
        subtitle="This action will permanently delete your account, all instances, uploaded files, embeddings, and chat history. This cannot be undone."
        cancelText="Cancel"
        onConfirmText="Delete My Profile"
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => mutate()}
        disabled={isPending}
      />
      <PageContainer title="My Account">
        <Wrap>
          <Typography variant="h6">User details</Typography>
          <Box mb={0.5} />
          <Typography>{user?.email}</Typography>
          <Box mb={0.3} />
          <Button variant="outlined" onClick={makeLogout}>
            Log Out
          </Button>
          <Box mb={4} />
          <Typography variant="h6">Usage</Typography>
          <Box mb={0.5} />
          <Typography>
            Vector operations: {numeralFormat(user?.usage.vectorOps)} / {numeralFormat(user?.usage.vectorOpsLimit)}
          </Typography>
          <Box mb={0.3} />
          <Typography>
            Usage resets at: <span style={{ fontWeight: 500 }}>{formatDate(user?.usage.cycleReset)}</span>
          </Typography>

          <Box mb={4} />
          <Typography variant="h6">Terms and policy</Typography>
          <Box mb={0.5} />
          <Link href="/terms-of-service" target="_blank">
            Terms of service
          </Link>
          <Box mb={0.3} />
          <Link href="/privacy-policy" target="_blank">
            Privacy policy
          </Link>

          <Box mb={4} />

          <Typography variant="h6">Danger zone</Typography>
          <Box mb={0.5} />
          <Button variant="outlined" color="error" onClick={() => setIsDeleteOpen(true)} disabled={isPending}>
            Delete Account
          </Button>
        </Wrap>
      </PageContainer>
    </>
  );
};

export default AccountPage;

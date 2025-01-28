'use client';
import { Alert, Box, Button, Chip, Typography } from '@mui/material';
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

const Wrap = styled.div``;

const AccountPage = () => {
  const { user, scheme } = useStateSelector(({ auth, theme }) => {
    return { user: auth.user, scheme: theme.scheme };
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
          <Typography>{user?.email}</Typography>
          <Box mb={2} />
          <Typography fontWeight={500}>Usage:</Typography>
          <Typography>
            Vector operations: {numeralFormat(user?.usage.vectorOps)} / {numeralFormat(user?.usage.vectorOpsLimit)}
          </Typography>
          <Alert severity="info">
            Usage resets at: <span style={{ fontWeight: 500 }}>{formatDate(user?.usage.cycleReset)}</span>
          </Alert>
          <Box mb={4} />
          <Link href="/terms-of-service" target="_blank">
            Terms of service
          </Link>
          <div />
          <Link href="/privacy-policy" target="_blank">
            Privacy policy
          </Link>

          <Box mb={4} />
          <Button variant="outlined" onClick={makeLogout}>
            LOGOUT
          </Button>
          <Box mb={2} />
          <Button variant="outlined" color="error" onClick={() => setIsDeleteOpen(true)} disabled={isPending}>
            DELETE ACCOUNT
          </Button>
        </Wrap>
      </PageContainer>
    </>
  );
};

export default AccountPage;

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

const AccountPage = () => {
  const { user, scheme } = useStateSelector(({ auth, theme }) => {
    return { user: auth.user, scheme: theme.scheme };
  });

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
    <PageContainer>
      <Typography className="ptitle">Account</Typography>
      <Box mb={4} />
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
      <Link href="/terms-and-conditions">Terms and conditions</Link>
      <div />
      <Link href="/privacy-policy">Privacy policy</Link>

      <Box mb={4} />
      <Button variant="outlined" onClick={makeLogout}>
        LOGOUT
      </Button>
      <Box mb={2} />
      <Button variant="outlined" onClick={() => mutate()} disabled={isPending}>
        DELETE ACCOUNT
      </Button>
    </PageContainer>
  );
};

export default AccountPage;

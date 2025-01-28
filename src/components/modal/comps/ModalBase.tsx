import styled from '@emotion/styled';
import { Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStateSelector } from '@/state';

const Wrap = styled(Dialog)`
  .MuiPaper-root {
    padding: 24px 36px 36px 36px !important;
    background-color: ${({ theme }) => theme.colors.appBgFront};
    min-width: 540px;
    border-radius: 24px;

    .mhead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    .MuiPaper-root {
      padding: 20px !important;
      min-width: 320px;
      width: 100%;
      border-radius: 16px;
    }
  }
`;

interface ModalBaseProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalBase: React.FC<ModalBaseProps> = ({ open, title, onClose, children }) => {
  const scheme = useStateSelector(({ theme }) => theme.scheme);
  return (
    <Wrap open={open}>
      <div className="mhead">
        <Typography variant="h3" fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: scheme === 'light' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.54)' }} />
        </IconButton>
      </div>
      {children}
    </Wrap>
  );
};

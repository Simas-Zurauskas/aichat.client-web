import styled from '@emotion/styled';
import { Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
`;

interface ModalBaseProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalBase: React.FC<ModalBaseProps> = ({ open, title, onClose, children }) => {
  return (
    <Wrap open={open}>
      <div className="mhead">
        <Typography variant="h3" fontWeight={600}>
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {children}
    </Wrap>
  );
};

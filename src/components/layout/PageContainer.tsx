import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const Wrap = styled.div`
  background-color: ${({ theme }) => theme.colors.appBgBack};
  padding: 24px;
  padding-left: 0px;
  height: 100vh;
  max-height: 100vh;
  flex: 1;

  main {
    height: 100%;
    flex: 1;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.colors.appBgFront};
    border-radius: 24px;
    display: grid;
    grid-template-rows: 72px 1fr;

    .head {
      padding: 0 38px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
    }
    .content {
      padding: 24px 38px;
      overflow: hidden;
      /* border: 1px solid red; */
      flex: 1;
      height: 100%;
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 12px;
    main {
      grid-template-rows: 52px 1fr;
      .head {
        height: 52px;
        padding: 0 12px;
      }
      .content {
        padding: 12px;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-left: 0px;
  }
`;

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const PageContainer: React.FC<PageContainerProps> = ({ title, children, style, contentStyle }) => {
  return (
    <Wrap style={style}>
      <main>
        <div className="head">
          <Typography variant="h2">{title}</Typography>
        </div>
        <div className="content" style={contentStyle}>
          {children}
        </div>
      </main>
    </Wrap>
  );
};

import { useStateSelector } from '@/state';

interface Props {
  colorOverride?: string;
}

export const LogoSvg: React.FC<Props> = ({ colorOverride }) => {
  const colors = useStateSelector(({ theme }) => theme.colors);
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 7.653V16.347L12 20.689L19.5 16.347V7.653L12 3.311L4.5 7.653ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.499 9.97L11 12.577V17.626H13V12.577L17.501 9.972L16.499 8.241L12 10.845L7.501 8.24L6.499 9.97Z"
        fill={colorOverride || colors.textWhite}
      />
    </svg>
  );
};

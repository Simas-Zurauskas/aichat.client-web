import localFont from 'next/font/local';
import { Registry } from './_registry';

const montserrat = localFont({
  src: './fonts/Montserrat.ttf',
  variable: '--font-montserrat',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}

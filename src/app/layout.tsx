import localFont from 'next/font/local';
import { Registry } from './_registry';
import { Metadata } from 'next';

const poppins = localFont({
  src: [
    {
      path: './fonts/Poppins-Regular.ttf',
      weight: '400',
    },
    {
      path: './fonts/Poppins-Medium.ttf',
      weight: '500',
    },
    {
      path: './fonts/Poppins-SemiBold.ttf',
      weight: '600',
    },
  ],

  variable: '--font-poppins',
});

const SITE_URL = 'https://promaxai.simas.tech';

export const metadata: Metadata = {
  title: 'ProMax.AI',
  description: 'description',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'ProMax.AI',
    description: 'Your Personal AI Workspace for Smarter Conversations',
    siteName: 'ProMax.AI',
    images: [
      {
        url: `${SITE_URL}/og.png`,
      },
    ],
  },
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}

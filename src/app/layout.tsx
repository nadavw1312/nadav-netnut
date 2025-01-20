import { ReactNode } from 'react';
import AppProviders from '../components/AppProviders'; 
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
        <AppProviders>{children}</AppProviders>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/next-theme-provider';
import { DM_Sans } from 'next/font/google';
import db from '@/lib/supabase/db';
import { twMerge } from 'tailwind-merge';
import AppStateProvider from '@/lib/providers/state-provider';
import { SupabaseUserProvider } from '@/lib/providers/supabase-user-provider';
import { Toaster } from '@/components/ui/toaster';
import { SocketProvider } from '@/lib/providers/socket-provider';

const dmsans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prodogen',
  description: 'An AI Productivity Tool for Everyone',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
	}) {
	console.log(db);
  return (
		<html lang='en'>
			<body className={twMerge('bg-background', dmsans.className)}>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
				>
					<AppStateProvider>
						<SupabaseUserProvider>
							<SocketProvider>
								{children}
								<Toaster />
							</SocketProvider>
						</SupabaseUserProvider>
					</AppStateProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

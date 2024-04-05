import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import io from 'socket.io-client';
import { useRouter } from 'next/router';
// @mui
import {
	createTheme,
	CssBaseline,
	ThemeProvider,
	CircularProgress,
} from '@mui/material';
// @store
import { useUiStore, useStore } from '@/store/session';
// @styles
import '../styles/globals.css';
import { themeSettings } from '@/styles/theme';

function MyApp({
	Component,
	pageProps,
}: {
	Component: React.ElementType;
	pageProps: any;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(true);

	const { mode } = useUiStore(
		useShallow((state) => ({
			mode: state.mode,
		}))
	);

	const { isAuthenticated } = useStore(
		useShallow((state) => ({
			isAuthenticated: state.isAuthenticated,
		}))
	);

	React.useEffect(() => {
		// Connect to the server
		const socket = io(process.env.NEXT_PUBLIC_BASE_URL as string);

		// Listen for 'connect' event
		socket.on('connect', () => {
			console.info('Connected to server');
			setIsLoading(false); // Connection established, no longer loading
		});

		// Listen for 'disconnect' event
		socket.on('disconnect', () => {
			console.info('Disconnected from server');
		});

		// Cleanup function to disconnect when component unmounts
		return () => {
			socket.disconnect();
		};
	}, []);

	React.useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isAuthenticated]);

	const theme = React.useMemo(() => createTheme(themeSettings(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{isLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<Component {...pageProps} />
			)}
		</ThemeProvider>
	);
}

export default MyApp;

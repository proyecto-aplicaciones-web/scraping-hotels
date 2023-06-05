import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'config/tanstackQuery';
import { AuthProvider } from 'context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { theme } from 'utils/theme';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<AuthProvider>
		<ThemeProvider theme={ theme }>
			<QueryClientProvider client={ queryClient }>
				<App />
			</QueryClientProvider>
		</ThemeProvider>
	</AuthProvider>
	// </React.StrictMode>
);

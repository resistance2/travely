import { StrictMode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import App from '@/App.tsx';
import GlobalStyles from '@/styles/GlobalStyles';
import { theme, muiTheme } from '@/styles/theme';
import Toast from './components/Toast';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MUIThemeProvider theme={muiTheme}>
      <EmotionThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <App />
          <Toast />
        </QueryClientProvider>
      </EmotionThemeProvider>
    </MUIThemeProvider>
  </StrictMode>,
);

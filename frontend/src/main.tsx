import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { AuthorizationProvider } from './context/AuthorizationContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
   <Provider store={store}>
    <AuthorizationProvider>
    <App />
    
    </AuthorizationProvider>
    </Provider>
    </QueryClientProvider>
  </StrictMode>,
)

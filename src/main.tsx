import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { LabPage } from '@/pages/LabPage';
import { LabProvider } from '@/context/LabContext';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LabPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LabProvider>
        <div className="scanline-overlay" />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </LabProvider>
    </QueryClientProvider>
  </StrictMode>,
)
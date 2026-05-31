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
import { HomePage } from '@/pages/HomePage'
import { ExploreBeatsPage } from '@/pages/ExploreBeatsPage'
import { BattlesPage } from '@/pages/BattlesPage'
import { BeatDetailPage } from '@/pages/BeatDetailPage'
import { SubmitBeatPage } from '@/pages/SubmitBeatPage'
import { ProducerProfilePage } from '@/pages/ProducerProfilePage'
import { AppLayout } from '@/components/layout/AppLayout'
import { AudioPlayerProvider } from '@/context/AudioPlayerContext'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout><HomePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/explore",
    element: <AppLayout><ExploreBeatsPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/battles",
    element: <AppLayout><BattlesPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/beats/:id",
    element: <AppLayout><BeatDetailPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/submit",
    element: <AppLayout><SubmitBeatPage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/profile/:id",
    element: <AppLayout><ProducerProfilePage /></AppLayout>,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AudioPlayerProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AudioPlayerProvider>
    </QueryClientProvider>
  </StrictMode>,
)
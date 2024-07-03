import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider';

// Tanstack query 
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <HelmetProvider>
       
        <QueryClientProvider client={queryClient}>
          <div className='mx-auto'>
            <RouterProvider router={router} /> 
          </div>
      </QueryClientProvider>
          
      </HelmetProvider>
    </AuthProvider> 
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import './i18n.js';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.js';

const system = createSystem(defaultConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App1 from './App1.jsx';
import { ChakraProvider, createSystem, defaultConfig} from '@chakra-ui/react';
import { ThemeProvider } from "next-themes"
import './i18n.js';

const system = createSystem(defaultConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider>
        <App1 />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

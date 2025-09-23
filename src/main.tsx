import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider, createSystem, defaultConfig} from '@chakra-ui/react';
import { ThemeProvider } from "next-themes"
import './i18n';

const system = createSystem(defaultConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

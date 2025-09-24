import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';
import { buildRoute } from './utils/router.utils';

export const router = createBrowserRouter([
  {
    path: '/:language',
    element: <App />,
  },
  {
    path: '*',
    element: (
      <Navigate
        to={buildRoute('/', { language: 'en', saveSearchParams: true })}
      />
    ),
  },
]);

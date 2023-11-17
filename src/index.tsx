import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './components/App';
import { Shop } from './pages/shop';
import { About } from './pages/about';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback="{loading...}">
            <About />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="{loading...}">
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);
const container = createRoot(root);

container.render(<RouterProvider router={router} />);

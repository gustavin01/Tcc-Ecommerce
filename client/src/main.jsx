import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '.';
import Provider from './components/api/Provider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);

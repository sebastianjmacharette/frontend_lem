import React from 'react';
import ReactDOM from 'react-dom/client';
// Se eliminan las importaciones relacionadas con Redux

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Se eliminan Provider y PersistGate */}
    <App />
  </React.StrictMode>
);

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './components/token/store.jsx'; // Importa tu store de Redux
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envuelve tu App con el Provider y pasa el store como prop */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

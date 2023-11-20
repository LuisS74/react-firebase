import React from 'react';
import ReactDOM from 'react-dom/client'; // Importación actualizada
import App from './App';

// Uso de createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

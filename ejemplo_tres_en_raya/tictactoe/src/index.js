import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// 📌 Ruta actualizada porque movimos App.js dentro de la carpeta 'components/'
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// 📌 ARRANQUE DE REACT 18: Busca el <div id="root"> en public/index.html y monta ahí toda la aplicación.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 📌 StrictMode: En modo desarrollo ejecuta dos veces ciertos renderizados/efectos para ayudar a detectar bugs
  // (por eso en consola a veces verás el console.log del fetch dos veces). En producción no afecta.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
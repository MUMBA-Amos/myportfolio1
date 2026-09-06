import React from 'react';
import ReactDOM from 'react-dom/client';
// Bootstrap must load before any custom CSS, otherwise its rules win on
// source order and every override below is silently discarded.
import 'bootstrap/dist/css/bootstrap.min.css';
// Lenis needs its own stylesheet: it sets html.lenis { height: auto },
// which undoes the html,body { height: 100% } rule in App.css that would
// otherwise stop the page scrolling smoothly.
import 'lenis/dist/lenis.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

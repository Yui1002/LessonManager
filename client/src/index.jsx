import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
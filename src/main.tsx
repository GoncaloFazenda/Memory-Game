import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './_presentation/_components/theme-provider.tsx';
import Header from './navigation/components/Header.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Header />
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);

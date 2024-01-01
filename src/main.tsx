import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './_presentation/_components/theme-provider.tsx';
import { ToggleThemeButton } from './_presentation/_components/ui/toggleThemeButton.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <nav className=" absolute right-10 top-10">
                <ToggleThemeButton />
            </nav>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// Pages
import ScorePage from './_presentation/score/ScorePage';
import GamePage from './_presentation/game/GamePage';
import LoginPage from './_presentation/login/LoginPage';
import PrivateRoutes from './navigation/PrivateRoutes';

function App() {
    let location = useLocation();
    let background = location.state && location.state.background;

    return (
        <div className="flex flex-1 dark:bg-background bg-slate-100">
            <Routes location={background || location}>
                <Route path="/" element={<LoginPage />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/game" element={<GamePage />}></Route>
                    <Route path="*" element={<Navigate to="/" />}></Route>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path={`${background.pathname}/score`} element={<ScorePage />} />
                    </Route>
                </Routes>
            )}
        </div>
    );
}

export default App;

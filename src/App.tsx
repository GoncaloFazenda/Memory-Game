import { Routes, Route, useLocation } from 'react-router-dom';
// Pages
import ScorePage from './_presentation/score/ScorePage';
import GamePage from './_presentation/game/GamePage';
import LoginPage from './_presentation/Login/LoginPage';

function App() {
    let location = useLocation();
    let background = location.state && location.state.background;
    console.log('background', background);

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/game" element={<GamePage />}></Route>
            </Routes>
            <Routes>{background && <Route path={`${background.pathname}/score`} element={<ScorePage />} />}</Routes>
        </>
    );
}

export default App;

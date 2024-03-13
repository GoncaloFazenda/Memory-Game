import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '@/useCases/user';
import UtilityGameMenu from './components/utilityGameMenu';
import { useEffect, useState } from 'react';
import GameBoard from './components/gameBoard';
import { formatTime } from '@/utils/helpers';
import { useFetchLoader } from '@/hooks';
import ClipLoader from 'react-spinners/ClipLoader';
import { Card, CardList } from '@/entities';
import { IncreaseOnHover, Button } from '@/_presentation/_components/ui';

export const GamePage = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [pauseTimer, setPauseTimer] = useState<boolean>(false);
    const [gameEnded, setGameEnded] = useState<boolean>(false);

    const { images, loading } = useFetchLoader({
        request: {
            url: import.meta.env.VITE_IMAGE_API_BASEURL + '/search?query=neon%20lights&per_page=6',
            options: {
                headers: {
                    Authorization: import.meta.env.VITE_IMAGE_API_KEY,
                    'Content-Type': 'application/json',
                },
            },
        },
    });

    function onLogout() {
        logout();
        navigate('/');
    }

    function navigateToScoreboard() {
        setPauseTimer(true);
        navigate('/game/score', { state: { background: location } });
    }

    function onGameFinished() {
        // Add to scoreboard
        let previousScoreBoard = JSON.parse(localStorage.getItem('ScoreBoard') || '[]');
        previousScoreBoard.push({ username: localStorage.getItem('username'), time: formatTime(timeInSeconds) });
        localStorage.setItem('ScoreBoard', JSON.stringify(previousScoreBoard));
        navigateToScoreboard();
        setGameEnded(true);
    }

    function formatImagesToCardListData(data: any): CardList {
        return data.map((item: any, index: number): Card => {
            return { id: index, imgURL: item.src.medium, isFlipped: false };
        });
    }

    useEffect(() => {
        const previousPage = location?.state?.from;
        if (previousPage === 'ScorePage') {
            setPauseTimer(false);
            // Clearing the navigation state
            navigate({});
        }
        setGameEnded(false);
    }, [location.state]);

    useEffect(() => {
        console.log('game state ', gameEnded);
    }, [gameEnded]);

    return (
        <main className="flex flex-1 flex-col justify-center items-center place-content-center">
            <IncreaseOnHover title="Neon Memory Game" titleStyles="text-7xl" containerStyles="mb-20" />
            {gameEnded && <h1 className={'font-extrabold text-4xl  mb-14 text-green-500 '}>Congradulations !!</h1>}
            <section className="flex justify-center w-full ">
                {images.length > 0 && !loading ? (
                    <GameBoard
                        cards={formatImagesToCardListData(images)}
                        onGameFinished={onGameFinished}
                        getCurrentTime={(time) => setTimeInSeconds(time)}
                        pauseTimer={pauseTimer}
                        isLoading={loading}
                        newGame={gameEnded}
                    />
                ) : (
                    <div style={{ minWidth: 954, minHeight: 708, display: 'flex', justifyContent: 'center' }}>
                        <ClipLoader color={'#000088'} loading={true} size={100} className="flex self-center" />
                    </div>
                )}
                <div className="ml-44" />
                <UtilityGameMenu title={localStorage.getItem('username')!} timeInSeconds={timeInSeconds}>
                    <Button onClick={navigateToScoreboard}>Scoreboard</Button>
                    <Button className="bg-destructive hover:bg-destructive hover:opacity-90" onClick={onLogout}>
                        Logout
                    </Button>
                </UtilityGameMenu>
            </section>
        </main>
    );
};

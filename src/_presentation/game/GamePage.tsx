import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_components/ui/button';
import { logout } from '@/useCases/user';
import IncreaseOnHover from '../_components/ui/increaseOnHover';
import UtilityGameMenu from './components/utilityGameMenu';
import { useEffect, useState } from 'react';
import GameBoard from './components/gameBoard';
import { Card, CardList } from '@/entities/card';
import useFetchLoader from '@/hooks/useFetchLoader';

export default function GamePage() {
    let location = useLocation();
    let navigate = useNavigate();

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [pauseTimer, setPauseTimer] = useState<boolean>(false);

    const { images } = useFetchLoader({
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
        navigate('/game/score', { state: { background: location } });
        setPauseTimer(true);
    }

    function onGameFinished() {}

    function formatImagesToCardListData(data: any): CardList {
        return data.map((item: any, index: number): Card => {
            return { id: index, imgURL: item.src.original, isFlipped: false };
        });
    }

    useEffect(() => {
        const previousPage = location?.state?.state?.from;
        if (previousPage === 'ScorePage') setPauseTimer(false);
    }, []);

    return (
        <main className="flex flex-1 flex-col justify-center items-center place-content-center">
            <IncreaseOnHover title="Neon Memory Game" titleStyles="text-7xl" containerStyles="mb-24" />
            <section className="flex justify-center w-full">
                {images.length > 0 && (
                    <GameBoard
                        cards={formatImagesToCardListData(images)}
                        onGameFinished={onGameFinished}
                        getCurrentTime={(time) => setTimeInSeconds(time)}
                        pauseTimer={pauseTimer}
                    />
                )}
                <UtilityGameMenu title={localStorage.getItem('username')!} timeInSeconds={timeInSeconds}>
                    <Button onClick={navigateToScoreboard}>Scoreboard</Button>
                    <Button className="bg-destructive hover:bg-destructive hover:opacity-90" onClick={onLogout}>
                        Logout
                    </Button>
                </UtilityGameMenu>
            </section>
        </main>
    );
}

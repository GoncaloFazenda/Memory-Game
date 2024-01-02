import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_components/ui/button';
import { logout } from '@/useCases/user';
import IncreaseOnHover from '../_components/ui/increaseOnHover';
import UtilityGameMenu from './components/utilityGameMenu';
import { useEffect, useState } from 'react';
import GameBoard from './components/gameBoard';
import { CardList } from '@/entities/card';
import useFetchLoader from '@/hooks/useFetchLoader';

export default function GamePage() {
    let location = useLocation();
    let navigate = useNavigate();

    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

    const { images } = useFetchLoader({
        request: {
            url: import.meta.env.VITE_IMAGE_API_BASEURL + '/search?query=neon%20lights',
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

    function formatImagesToCardListData(data: any): CardList {
        return data.map((item: any) => {
            const { id, src } = item;
            return { [id]: { imgURL: src.original, isFlipped: false } };
        });
    }

    return (
        <main className="flex flex-1 flex-col justify-center items-center place-content-center">
            <IncreaseOnHover title="Neon Memory Game" titleStyles="text-7xl" containerStyles="mb-24" />
            <section className="flex justify-center w-full">
                <GameBoard cards={formatImagesToCardListData(images)} />
                <UtilityGameMenu title={localStorage.getItem('username')!} timeInSeconds={timeInSeconds}>
                    <Button onClick={() => navigate('/game/score', { state: { background: location } })}>Scoreboard</Button>
                    <Button className="bg-destructive hover:bg-destructive hover:opacity-90" onClick={onLogout}>
                        Logout
                    </Button>
                </UtilityGameMenu>
            </section>
        </main>
    );
}

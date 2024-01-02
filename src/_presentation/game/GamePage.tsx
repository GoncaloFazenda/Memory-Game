import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_components/ui/button';
import { logout } from '@/useCases/user';
import IncreaseOnHover from '../_components/ui/increaseOnHover';
import UtilityGameMenu from './components/utilityGameMenu';
import { useState } from 'react';
import Card from './components/card';

export default function GamePage() {
    let location = useLocation();
    let navigate = useNavigate();
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);

    function onLogout() {
        logout();
        navigate('/');
    }

    return (
        <main className="flex flex-1 flex-col justify-center items-center place-content-center">
            <IncreaseOnHover title="Neon Memory Game" titleStyles="text-6xl" containerStyles="mb-24" />
            <section className="flex justify-center w-full  ">
                <section className="flex flex-wrap   max-w-6xl ">
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
                        <div key={item} className="w-1/5 mr-7 mb-7 ">
                            <Card />
                        </div>
                    ))}
                </section>
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

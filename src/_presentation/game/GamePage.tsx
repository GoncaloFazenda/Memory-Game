import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_components/ui/button';
import { logout } from '@/useCases/user';
import IncreaseOnHover from '../_components/ui/increaseOnHover';
import UtilityGameMenu from './components/utilityGameMenu';

export default function GamePage() {
    let location = useLocation();
    let navigate = useNavigate();

    function onLogout() {
        logout();
        navigate('/');
    }

    return (
        <main className="flex flex-1 flex-col">
            <IncreaseOnHover title="Neon Memory Game" titleStyles="text-5xl" />
            <section className="flex self-center justify-center w-full">
                <section></section>
                <UtilityGameMenu title={localStorage.getItem('username')!} timeInSeconds={3}>
                    <Button onClick={() => navigate('/game/score', { state: { background: location } })}>Scoreboard</Button>
                    <Button onClick={onLogout}>Logout</Button>
                </UtilityGameMenu>
            </section>
        </main>
    );
}

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_components/ui/button';
import { logout } from '@/useCases/user';

export default function GamePage() {
    let location = useLocation();
    let navigate = useNavigate();

    function onLogout() {
        logout();
        navigate('/');
    }

    return (
        <div className="flex flex-1 ">
            <div className="flex self-center justify-center w-full">
                <h1 className="text-3xl font-bold underline bg-red-500">Tailwind is Working!</h1>
                <h1 className="text-3xl font-bold underline bg-blue-500">
                    {localStorage.getItem('username') && localStorage.getItem('username')}
                </h1>
                <Link to={'/game/score'} state={{ background: location }}>
                    ScorePage
                </Link>
                <Button className="" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

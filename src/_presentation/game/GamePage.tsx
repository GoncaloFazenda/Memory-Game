import { Link, useLocation } from 'react-router-dom';

export default function GamePage() {
    let location = useLocation();
    console.log('localStorage', localStorage.getItem('username'));
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
            </div>
        </div>
    );
}

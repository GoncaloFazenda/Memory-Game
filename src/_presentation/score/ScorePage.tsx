import { Link } from 'react-router-dom';

export default function ScorePage() {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-50 flex justify-center items-center ">
            <div className="flex self-center justify-center w-full">
                <h1 className="text-3xl font-bold underline bg-blue-500">MODAL</h1>
                <Link to="/game" state={{ from: 'ScorePage' }}>
                    back
                </Link>
            </div>
        </div>
    );
}

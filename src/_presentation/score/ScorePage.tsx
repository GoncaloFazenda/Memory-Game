import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/_presentation/_components/ui/table';

export const ScorePage = () => {
    let navigate = useNavigate();

    return (
        <div
            onClick={() => navigate('/game', { state: { from: 'ScorePage' } })}
            className="fixed top-0 left-0 w-full h-full bg-slate-800 bg-opacity-50 flex justify-center items-center"
        >
            <div className="flex flex-col max-h-96 self-center justify-center w-full overflow-hidden">
                <Table className="max-w-96 max-h-96 m-auto bg-slate-800 rounded-md p-24">
                    <TableCaption>List of recent Scores</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Username</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {JSON.parse(localStorage.getItem('ScoreBoard') || '[]').map((item: { username: string; time: string }) => (
                            <TableRow key={item.username}>
                                <TableCell className="font-medium">{item.username}</TableCell>
                                <TableCell className="text-right">{item.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

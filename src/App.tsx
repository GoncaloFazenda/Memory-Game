import { Button } from './components/ui/button';

function App() {
    return (
        <div className="flex flex-1 bg-slate-500">
            <div className="flex self-center justify-center w-full">
                <h1 className="text-3xl font-bold underline bg-red-500">Tailwind is Working!</h1>
                <Button>ShadCN is Working!</Button>
            </div>
        </div>
    );
}

export default App;

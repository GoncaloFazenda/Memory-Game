import { Button } from '@/_presentation/_components/ui/button';
import { Input } from '@/_presentation/_components/ui/input';
import { Label } from '@/_presentation/_components/ui/label';
import { useState } from 'react';
import { User, UserCredentials } from '../entities/user';
import { validationErrorWrapper } from '../_utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    let navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');

    function checkUsername(user: User) {
        const [_, errorMessage] = validationErrorWrapper(() => UserCredentials.parse(user));

        if (errorMessage) {
            setUsernameErrorMessage(errorMessage);
            return errorMessage;
        } else {
            setUsernameErrorMessage('');
            return '';
        }
    }

    async function onSubmitUsername() {
        const error = checkUsername({ username });
        if (error.length === 0) navigate('/game');
    }

    function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
        // Checking username on change to give real time feedback to be more user friendly ( This is purely for UX purposes )
        // Comment the line below to check username only on submit
        checkUsername({ username: e.target.value });
    }

    return (
        <section className="bg-white flex self-center m-auto flex-col w-full  max-w-4xl justify-center p-16 py-20 rounded-lg shadow-2xl">
            <div className="mb-16 flex self-center group m-auto items-center justify-center bg-slate-100 p-4 rounded-lg px-20 shadow-sm transition duration-300 transform hover:scale-105 [&>*]:hover:text-indigo-600">
                <text className="font-extrabold font-mono text-4xl group text-gray-800 group transition duration-300">
                    Memory Game
                </text>
            </div>
            <div className="flex w-full justify-between h-full">
                <section className="flex flex-col w-full max-w-72 mt-6">
                    <Label className="text-xl">Choose your username</Label>
                    <Input
                        className={
                            usernameErrorMessage.length > 0
                                ? 'outline-none mt-4 mb-3 ring-2 ring-offset-2 ring-destructive text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2'
                                : 'text-base mt-4 mb-3'
                        }
                        type="text"
                        placeholder="ex: alex83"
                        onChange={(e) => onChangeUsername(e)}
                    />
                    <Label className=" text-destructive mb-6">{usernameErrorMessage && usernameErrorMessage}</Label>
                    <Button className="text-lg" onClick={onSubmitUsername}>
                        Login
                    </Button>
                </section>
                <div className="border-l-2 border-gray-900 pl-4 ml-4" />
                <section className="flex flex-col self-center">
                    <img
                        src={
                            'https://yt3.googleusercontent.com/ytc/AIf8zZSHOMg4U6RTiH4cx4r3LeQpz7HEk8O5baB1G2uujg=s900-c-k-c0x00ffffff-no-rj'
                        }
                        alt="Description of the image"
                        className="w-72 h-72 rounded-lg shadow-2xl my-2"
                    />
                </section>
            </div>
        </section>
    );
}

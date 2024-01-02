import { Button } from '@/_presentation/_components/ui/button';
import { Input } from '@/_presentation/_components/ui/input';
import { Label } from '@/_presentation/_components/ui/label';
import letsPlayImage from '@/assets/letsPlay.jpg';
import { useState } from 'react';
import { User, UserCredentials } from '../../entities/user';
import { validationErrorWrapper } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { login } from '../../useCases/user';
import IncreaseOnHover from '../_components/ui/increaseOnHover';

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

    async function onLoginUsername() {
        const error = checkUsername({ username });
        if (error.length === 0) {
            login(username);
            navigate('/game');
        }
    }

    function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
        // Checking username on change to give real time feedback to be more user friendly ( This is purely for UX purposes )
        // Comment the line below to check username only on submit
        checkUsername({ username: e.target.value });
    }

    return (
        <section className="bg-background border flex self-center m-auto flex-col w-full  max-w-4xl justify-center p-16 py-20 rounded-md shadow-2xl">
            <div className="flex flex-col justify-center place-items-center">
                <IncreaseOnHover title="Memory Game" />
            </div>
            <div className="flex w-full justify-between h-full">
                <section className="flex flex-col w-full max-w-72 mt-6">
                    <Label className="text-lg">Choose your username</Label>
                    <Input
                        className={
                            usernameErrorMessage.length > 0
                                ? 'outline-none mt-4 mb-3 ring-2 ring-offset-2 ring-destructive text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2'
                                : 'text-lg mt-4 mb-3'
                        }
                        type="text"
                        placeholder="ex: alex83"
                        onChange={(e) => onChangeUsername(e)}
                    />
                    <Label className=" text-destructive mb-6">{usernameErrorMessage && usernameErrorMessage}</Label>
                    <Button className="text-lg" onClick={onLoginUsername}>
                        Login
                    </Button>
                </section>
                <div className="border-l-2 border-gray-900 pl-4 ml-4" />
                <section className="flex flex-col self-center">
                    <img
                        src={letsPlayImage}
                        alt="Neon Lighs Let's Play Image"
                        className="rounded-md shadow-2xl my-2"
                        width={275}
                    />
                </section>
            </div>
        </section>
    );
}

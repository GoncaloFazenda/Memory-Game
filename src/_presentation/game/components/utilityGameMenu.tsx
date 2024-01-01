import { useEffect, useState } from 'react';
import moment from 'moment';

type Props = {
    title: string;
    timeInSeconds: number;
    children?: React.ReactNode;
};

export default function UtilityGameMenu(props: Props) {
    const [formattedTime, setFormattedTime] = useState<string>('');

    function formatTime(totalSeconds: number) {
        const duration = moment.duration(totalSeconds, 'seconds');

        // Formating the duration moment object as hh:mm:ss
        setFormattedTime(moment.utc(duration.asMilliseconds()).format('HH:mm:ss'));
    }

    useEffect(() => {
        formatTime(props.timeInSeconds);
    }, []);

    return (
        <section className="flex flex-col py-12 px-11  border rounded-md  w-full max-w-96 text-center ">
            <h2 className="text-4xl font-bold truncate overflow-hidden mt-6">{props.title}</h2>
            <div className="flex flex-col text-center my-44">
                <h3 className="text-lg font-bold">Time</h3>
                <h2 className="text-3xl font-bold underline">{formattedTime}</h2>
            </div>
            <div id={'navigationArea'} className="flex flex-col space-y-10">
                {props.children}
            </div>
        </section>
    );
}
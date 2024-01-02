import { useEffect, useState } from 'react';
import moment from 'moment';

type Props = {
    title: string;
    timeInSeconds: number;
    children?: React.ReactNode;
};

export default function UtilityGameMenu({ title, timeInSeconds, children }: Props) {
    const [formattedTime, setFormattedTime] = useState<string>('');

    function formatTime(totalSeconds: number) {
        const duration = moment.duration(totalSeconds, 'seconds');

        // Formating the duration moment object as hh:mm:ss
        setFormattedTime(moment.utc(duration.asMilliseconds()).format('HH:mm:ss'));
    }

    useEffect(() => {
        formatTime(timeInSeconds);
    }, [timeInSeconds]);

    return (
        <section className="flex flex-col pb-12 pt-10 px-6  border rounded-md  w-full max-w-80 text-center justify-between bg-white dark:bg-background ">
            <h2 className="text-4xl none font-bold truncate overflow-hidden text-primary dark:text-lighterPrimary">{title}</h2>
            <div className="flex flex-col text-center">
                <h3 className="text-lg font-bold">Time</h3>
                <h2 className="text-3xl font-bold underline">{formattedTime}</h2>
            </div>
            <div id={'navigationArea'} className="flex flex-col space-y-10">
                {children}
            </div>
        </section>
    );
}

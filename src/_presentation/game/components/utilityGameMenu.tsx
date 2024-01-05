import { useEffect, useState } from 'react';
import { formatTime } from '@/utils/helpers';
type Props = {
    title: string;
    timeInSeconds: number;
    children?: React.ReactNode;
};

export default function UtilityGameMenu({ title, timeInSeconds, children }: Props) {
    const [formattedTime, setFormattedTime] = useState<string>('');

    function formatSecondsInTime(totalSeconds: number) {
        // Formating the duration moment object as hh:mm:ss
        let formatedTime = formatTime(totalSeconds);
        setFormattedTime(formatedTime);
    }

    useEffect(() => {
        formatSecondsInTime(timeInSeconds);
    }, [timeInSeconds]);

    return (
        <section className="flex flex-col pb-12 pt-10 px-6  border rounded-md  w-full max-w-80 min-h-96 text-center justify-between bg-white dark:bg-background ">
            <h2 className="text-4xl none font-bold truncate overflow-hidden text-primary dark:text-lighterPrimary">{title}</h2>
            <div className="flex flex-col text-center">
                <h3 className="text-lg font-bold">Time</h3>
                <h2 className={`text-3xl font-bold ${timeInSeconds !== 0 && 'underline'}`}>
                    {timeInSeconds !== 0 ? formattedTime : '--:--:--'}
                </h2>
            </div>
            <div id={'navigationArea'} className="flex flex-col space-y-10">
                {children}
            </div>
        </section>
    );
}

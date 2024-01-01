import { twMerge } from 'tailwind-merge';

type Props = {
    title: string;
    titleStyles?: string;
    containerStyles?: string;
    onClick?: () => void;
};

export default function IncreaseOnHover(props: Props) {
    return (
        <div
            onClick={() => props.onClick && props.onClick()}
            className={twMerge(
                'mb-16 flex self-center border m-auto items-center justify-center dark:bg-background light:bg-slate-100 p-4 rounded-md px-20 shadow-sm transition duration-300 transform hover:scale-125 [&>*]:hover:text-purple-600',
                props.containerStyles
            )}
        >
            <h1
                className={twMerge(
                    'font-extrabold text-4xl light:text-gray-800 dark:text-foreground group transition duration-300',
                    props.titleStyles
                )}
            >
                {props.title}
            </h1>
        </div>
    );
}

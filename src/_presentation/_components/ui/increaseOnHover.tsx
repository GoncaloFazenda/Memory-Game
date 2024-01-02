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
                'flex mb-16 border items-center bg-white dark:bg-background p-4 rounded-md px-20 shadow-sm transition duration-300 transform hover:scale-125 dark:[&>*]:hover:text-lighterPrimary [&>*]:hover:text-primary ',
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

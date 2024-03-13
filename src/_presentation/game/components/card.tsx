import letsPlayImage from '@/assets/letsPlay.jpg';
import { twMerge } from 'tailwind-merge';

type props = {
    isFlipped: boolean;
    className?: string;
    imgURL: string;
    onClick: () => void;
};

export default function CardComponent(props: props) {
    return (
        <div className="card-back flex min-h-56 min-w-56 max-h-56 max-w-56">
            <img
                onClick={props.onClick}
                src={props.imgURL || letsPlayImage}
                alt="Card Image"
                className={twMerge(
                    ' object-cover  rounded-md cursor-pointer border  shadow-2xl  hover:border-4 dark:hover:border-slate-500 hover:border-white transition duration-200  ease-in-out transform hover:-translate-y-1 hover:scale-110',
                    props.className
                )}
            />
        </div>
    );
}

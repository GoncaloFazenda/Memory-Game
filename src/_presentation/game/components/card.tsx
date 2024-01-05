import letsPlayImage from '@/assets/letsPlay.jpg';
import { useEffect, useState } from 'react';

type props = {
    cardId: number;
    isFlipped: boolean;
    imgURL: string;
    onClick: (cardId: number) => void;
};

export default function CardComponent(props: props) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    function onClick() {
        setIsClicked(true);
        setTimeout(() => {
            props.onClick(props.cardId);
            setIsClicked((prevState) => !prevState);
        }, 700);
    }
    let cardStyles =
        'rounded-md border w-full h-full shadow-2xl hover:border-2 hover:border-4 dark:hover:border-slate-500 hover:border-white transition duration-200  ease-in-out transform hover:-translate-y-1 hover:scale-110';

    return (
        <img
            onClick={onClick}
            src={props.isFlipped || isClicked ? props.imgURL : letsPlayImage}
            alt="Card Image"
            className={cardStyles}
        />
    );
}

import { Card } from '@/entities';
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { CardComponent } from './card';

type Props = {
    card: Card;
    frontImgURL: string;
    backImgURL: string;
    onClick: (card: Card) => void;
};

export const FlipCardComponent = ({ card, backImgURL, frontImgURL, onClick }: Props) => {
    const [isTemporaryTurnCard, setIsTemporaryTurnCard] = useState<boolean>(false);

    function handleCardClick(card: Card) {
        setIsTemporaryTurnCard(true);
        setTimeout(() => {
            onClick(card);
            setIsTemporaryTurnCard(false);
        }, 700);
    }

    return (
        <ReactCardFlip
            key={card.id}
            isFlipped={isTemporaryTurnCard || card.isFlipped}
            flipDirection="horizontal"
            flipSpeedBackToFront={0.6}
            flipSpeedFrontToBack={0.6}
        >
            <div className="card-front">
                <CardComponent isFlipped={card.isFlipped} imgURL={frontImgURL} onClick={() => handleCardClick(card)} />
            </div>
            <div className="card-back">
                <CardComponent isFlipped={card.isFlipped} imgURL={backImgURL} onClick={() => handleCardClick(card)} />
            </div>
        </ReactCardFlip>
    );
};

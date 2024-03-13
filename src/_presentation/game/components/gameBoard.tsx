import { useEffect, useMemo, useState } from 'react';
import { Card, CardList } from '@/entities';
import Game from '../gameLogic';
import letsPlayImage from '@/assets/letsPlay.jpg';
import { FlipCardComponent } from './flipCardComponent';

type Props = {
    cards: CardList;
    onGameFinished: (endTime: number) => void;
    getCurrentTime: (time: number) => void;
    pauseTimer: boolean;
    isLoading: boolean;
    newGame: boolean;
};

export default function GameBoard(props: Props) {
    const [cards, setCards] = useState<CardList>(props.cards);

    // prevents creating new instances of the game on every re-render
    let game = useMemo(() => new Game(props.cards), [props.newGame]);

    function handleCardClick(card: Card) {
        game.handleCardClick(card);
        let updatedCards = game.getCards();
        // copy to new array to force re-render otherwise react won't detect the change
        setCards([...updatedCards]);
        let endTime = game.isGameFinished();
        if (endTime) props.onGameFinished(endTime);
    }

    useEffect(() => {
        if (props.pauseTimer) return game.pauseTimer();
        else game.resumeTimer();
    }, [props.pauseTimer]);

    useEffect(() => {
        setCards(game.getCards());
        game.addObserver((currentTime: number) => props.getCurrentTime(currentTime));
        game.startTimer();
    }, [props.cards]);

    return (
        <section
            style={{ minWidth: 954, minHeight: 708 }}
            className={props.isLoading ? `flex justify-center max-w-7xl min-w-7xl` : `grid grid-cols-4 grid-rows-3 gap-7 max-w-7xl min-w-7xl`}
        >
            {useMemo(
                () =>
                    cards.length > 0 &&
                    cards?.map((card: Card) => {
                        let cardProps = { ...card };
                        return (
                            <FlipCardComponent
                                key={cardProps.id}
                                card={cardProps}
                                frontImgURL={letsPlayImage}
                                backImgURL={card.imgURL}
                                onClick={handleCardClick}
                            />
                        );
                    }),
                [cards]
            )}
        </section>
    );
}

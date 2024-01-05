import { useEffect, useMemo, useState } from 'react';
import CardComponent from './card';
import { Card, CardList } from '@/entities/card';
import Game from '../gameLogic';

type Props = {
    cards: CardList;
    onGameFinished: (endTime: number) => void;
    getCurrentTime: (time: number) => void;
    pauseTimer: boolean;
};

export default function GameBoard(props: Props) {
    const [cards, setCards] = useState<CardList>(props.cards);
    // prevent creating new instance of game on every re-render
    let game = useMemo(() => new Game(props.cards), []);

    useEffect(() => {
        setCards(game.getCards());
        game.addObserver((currentTime: number) => props.getCurrentTime(currentTime));
        game.startTimer();
        return () => {
            game.stopTimer();
        };
    }, [props.cards]);

    useEffect(() => {
        if (props.pauseTimer) game.pauseTimer();
    }, [props.pauseTimer]);

    function handleCardClick(card: Card) {
        game.handleCardClick(card);
        let updatedCards = game.getCards();
        // copy to new array to force re-render otherwise react won't detect the change
        setCards([...updatedCards]);
        let endTime = game.isGameFinished();
        if (endTime) props.onGameFinished(endTime);
    }

    return (
        <section className="flex flex-wrap max-w-7xl ">
            {cards.length > 0 &&
                cards.map((card, index) => {
                    let cardProps = { ...card };
                    return (
                        <div key={index} className=" flex flex-col w-1/5 mr-7 mb-7 max-h-60 max-w-60  ">
                            <CardComponent
                                cardId={cardProps.id}
                                imgURL={cardProps.imgURL}
                                isFlipped={cardProps.isFlipped}
                                onClick={() => handleCardClick(cardProps)}
                            />
                        </div>
                    );
                })}
        </section>
    );
}

import { useEffect, useMemo, useState } from 'react';
import CardComponent from './card';
import ClipLoader from 'react-spinners/ClipLoader';
import { Card, CardList } from '@/entities/card';
import Game from '../gameLogic';

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
    const [triggerNewGame, setTriggerNewGame] = useState<boolean>(false);
    // prevent creating new instance of game on every re-render
    let game = useMemo(() => new Game(props.cards), [triggerNewGame]);

    useEffect(() => {
        setCards(game.getCards());
        game.addObserver((currentTime: number) => props.getCurrentTime(currentTime));
        game.startTimer();
        // return () => {
        //     game.stopTimer();
        // };
    }, [props.cards]);

    useEffect(() => {
        if (props.pauseTimer) return game.pauseTimer();
        else game.resumeTimer();
    }, [props.pauseTimer]);

    function handleCardClick(card: Card) {
        game.handleCardClick(card);
        let updatedCards = game.getCards();
        // copy to new array to force re-render otherwise react won't detect the change
        setCards([...updatedCards]);
        let endTime = game.isGameFinished();
        if (endTime) props.onGameFinished(endTime);
    }

    useEffect(() => {
        if (props.newGame) {
            setTriggerNewGame(!triggerNewGame);
        }
    }, [props.newGame]);

    return (
        <section
            style={{ minWidth: 954, minHeight: 708 }}
            className={props.isLoading ? `flex justify-center max-w-7xl` : `grid grid-cols-4 grid-rows-3 gap-7 max-w-7xl`}
        >
            {props.isLoading && <ClipLoader color={'#000888'} loading={props.isLoading} size={50} className="flex self-center" />}
            {cards.length > 0 &&
                !props.isLoading &&
                cards.map((card, index) => {
                    let cardProps = { ...card };
                    return (
                        <div key={index} className=" flex flex-col max-h-56 max-w-56  ">
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

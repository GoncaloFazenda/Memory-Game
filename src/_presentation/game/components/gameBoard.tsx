import { useEffect, useMemo, useState } from 'react';
import CardComponent from './card';
import { Card, CardList } from '@/entities/card';
import Game from '../gameLogic';

type Props = {
    cards: CardList;
};

export default function GameBoard(props: Props) {
    const [cards, setCards] = useState<CardList>(props.cards);
    let game = useMemo(() => new Game(props.cards), []);

    useEffect(() => {
        setCards(game.getCards());
    }, [props.cards]);

    function handleCardClick(card: Card) {
        game.handleCardClick(card);
        let updatedCards = game.getCards();
        // copy to new array to force re-render otherwise react won't detect the change
        setCards([...updatedCards]);
        if (game.isGameFinished()) {
            console.log('Game Finished');
        }
    }

    return (
        <section className="flex flex-wrap max-w-6xl ">
            {cards.map((card, index) => {
                let cardProps = { ...card };
                return (
                    <div key={index} className=" flex flex-col w-1/5 mr-7 mb-7 max-h-56  ">
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

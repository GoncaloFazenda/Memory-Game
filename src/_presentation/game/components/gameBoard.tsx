import { useEffect, useState } from 'react';
import Card from './card';
import { CardList } from '@/entities/card';

type Props = {
    cards: CardList;
};

export default function GameBoard(props: Props) {
    console.log(props.cards);
    useEffect(() => {}, []);

    return (
        <section className="flex flex-wrap   max-w-6xl ">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                <div key={index} className="w-1/5 mr-7 mb-7 ">
                    <Card />
                </div>
            ))}
            <button
                onClick={() => {
                    console.log('AKIIII');
                }}
            >
                AKIIII
            </button>
        </section>
    );
}

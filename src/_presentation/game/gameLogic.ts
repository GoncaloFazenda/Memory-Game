import { Card, CardList } from '@/entities/card';

export default class Game {
    private startTime: number;
    private elapsedTime: number;
    private intervalId: any;
    private observers: any;
    private cards: CardList;
    private prevFlippedCard: CardList;
    private solvedCards: Map<number, Card>;

    constructor(initialCards: CardList) {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.cards = [];
        this.intervalId = null;
        this.observers = [];
        this.prevFlippedCard = [];
        this.solvedCards = new Map();
        this.gameStarter(initialCards);
    }

    addObserver(observer: any) {
        this.observers.push(observer);
    }

    addObservers(observers: any) {
        this.observers = this.observers.concat(observers);
    }

    notifyObservers() {
        this.observers.forEach((observer: any) => observer(this.elapsedTime));
    }

    private gameStarter(initialCards: CardList) {
        // If there is a game in progress, we reconnect to it
        if (!this.cards.length && localStorage.getItem('CardDeck')) this.reconnect();
        else this.startGame(initialCards);
    }

    private startGame(cards: CardList) {
        let cardDeck = this.createCardDeck(cards);
        let shuffleCardDeck: CardList = this.shuffleCardDeck(cardDeck);

        console.log('startGame');

        // Setting a unique identifier for each card
        shuffleCardDeck.forEach((card: any, index: number) => {
            shuffleCardDeck[index] = { ...card, id: index };
        });
        this.cards = shuffleCardDeck;
        this.setLocalCardDeck();

        // this.gameInProgress = true;
        // this.startTime = Date.now();
        // this.intervalId = setInterval(() => {
        //     this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        //     this.notifyObservers();
        // }, 1000);
        return this.cards;
    }

    public reconnect() {
        console.log('recconect');

        this.cards = this.getLocalCardDeck();
        return this.cards;
    }

    public pauseGame() {
        clearInterval(this.intervalId);
    }

    public resumeGame() {}

    public endGame() {
        clearInterval(this.intervalId);
    }

    public isGameFinished() {
        if (this.solvedCards.size === this.cards.length) {
            this.clearLocalStorage();
            return true;
        }
    }

    public handleCardClick(card: Card) {
        // If the card is already solved, we don't do anything
        if (this.solvedCards.has(card.id)) return this.cards;

        // Flipping the first card
        if (this.prevFlippedCard.length === 0) {
            this.cards[card.id].isFlipped = true;
            this.prevFlippedCard.push(card);
            return this.cards;
        }

        // Flipping the card back if it's the same card
        if (this.prevFlippedCard.length === 1 && this.prevFlippedCard[0].id === card.id) {
            this.cards[card.id].isFlipped = false;
            this.prevFlippedCard = [];
            return this.cards;
        }

        // Comparing cards when another card is flipped
        if (this.prevFlippedCard[0].imgURL === card.imgURL && this.prevFlippedCard[0].id !== card.id) {
            this.cards[card.id].isFlipped = true;
            this.solvedCards.set(card.id, card);
            this.solvedCards.set(this.prevFlippedCard[0].id, this.prevFlippedCard[0]);
            this.prevFlippedCard = [];
            this.isGameFinished();
            return this.cards;
        }

        // If the cards don't match, we flip them back
        this.cards[this.prevFlippedCard[0].id].isFlipped = false;
        this.cards[card.id].isFlipped = false;
        this.prevFlippedCard = [];
        return this.cards;
    }

    private shuffleCardDeck(cards: CardList): CardList {
        // Fisher-Yates shuffle algorithm
        for (var i = cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));

            var temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        return cards;
    }

    private createCardDeck(cards: CardList): CardList {
        // This game consists in finding pairs of cards so we need to duplicate each card
        let cardDeck: CardList = [];
        cards.forEach((card: Card) => {
            cardDeck.push({ ...card }, { ...card });
        });
        return cardDeck;
    }

    private clearLocalStorage() {
        localStorage.removeItem('CardDeck');
    }

    private setLocalCardDeck() {
        localStorage.setItem('CardDeck', JSON.stringify(this.cards));
    }

    private getLocalCardDeck() {
        return JSON.parse(localStorage.getItem('CardDeck') || 'null');
    }

    public getCards() {
        return this.cards;
    }
}

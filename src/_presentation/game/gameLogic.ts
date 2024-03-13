import { Card, CardList } from '@/entities';

export default class Game {
    private time: number;
    private intervalId: any;
    private paused: boolean;
    private observer: any;
    private cards: CardList;
    private prevFlippedCard: CardList;
    private solvedCards: Map<number, Card>;

    constructor(initialCards: CardList) {
        this.intervalId = null;
        this.paused = false;
        this.observer = null;
        this.time = 0;
        this.cards = [];
        this.prevFlippedCard = [];
        this.solvedCards = new Map();
        this.gameStarter(initialCards);
    }

    public addObserver(observer: any) {
        this.observer = observer;
    }

    private notifyObservers() {
        this.observer(this.time);
    }

    private gameStarter(initialCards: CardList) {
        // If there is a game in progress, we reconnect to it
        if (!this.cards.length && localStorage.getItem('CardDeck')) this.reconnect();
        else this.startGame(initialCards);
    }

    private startGame(cards: CardList) {
        let cardDeck = this.createCardDeck(cards);
        let shuffleCardDeck: CardList = this.shuffleCardDeck(cardDeck);

        // Setting a unique identifier for each card
        shuffleCardDeck.forEach((card: any, index: number) => {
            shuffleCardDeck[index] = { ...card, id: index };
        });
        this.cards = shuffleCardDeck;
        this.setLocalGameData();
    }

    public reconnect() {
        this.cards = JSON.parse(localStorage.getItem('CardDeck') || 'null');
        this.prevFlippedCard = JSON.parse(localStorage.getItem('PrevFlippedCard') || 'null');
        this.solvedCards = new Map(JSON.parse(localStorage.getItem('SolvedCards') || 'null'));
        this.time = JSON.parse(localStorage.getItem('Time') || 'null');
        this.paused = JSON.parse(localStorage.getItem('Paused') || 'null');
    }

    public isGameFinished(): number | undefined {
        if (this.solvedCards.size === this.cards.length) {
            this.stopTimer();
            this.clearLocalStorage();
            return this.time;
        }
    }

    public handleCardClick(card: Card) {
        // If the card is already solved, we don't do anything
        if (this.solvedCards.has(card.id)) return this.cards;

        // Flipping the first card
        if (this.prevFlippedCard.length === 0) {
            this.cards[card.id].isFlipped = true;
            this.prevFlippedCard.push(card);
            this.setLocalGameData();
            return this.cards;
        }

        // Flipping the card back if it's the same card
        if (this.prevFlippedCard.length === 1 && this.prevFlippedCard[0].id === card.id) {
            this.cards[card.id].isFlipped = false;
            this.prevFlippedCard = [];
            this.setLocalGameData();
            return this.cards;
        }

        // Comparing cards when another card is flipped
        if (this.prevFlippedCard[0].imgURL === card.imgURL && this.prevFlippedCard[0].id !== card.id) {
            this.cards[card.id].isFlipped = true;
            this.solvedCards.set(card.id, card);
            this.solvedCards.set(this.prevFlippedCard[0].id, this.prevFlippedCard[0]);
            this.prevFlippedCard = [];
            this.setLocalGameData();
            this.isGameFinished();
            return this.cards;
        }

        // If the cards don't match, we flip them back
        this.cards[this.prevFlippedCard[0].id].isFlipped = false;
        this.cards[card.id].isFlipped = false;
        this.prevFlippedCard = [];
        this.setLocalGameData();
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

    public startTimer() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (!this.paused) {
                    this.time++;
                    this.setLocalTime();
                    this.notifyObservers();
                }
            }, 1000);
        }
    }

    public pauseTimer() {
        this.paused = true;
        this.setLocalPause();
    }

    public resumeTimer() {
        this.paused = false;
        this.setLocalPause();
    }

    public stopTimer() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.paused = false;
    }

    private clearLocalStorage() {
        localStorage.removeItem('CardDeck');
        localStorage.removeItem('PrevFlippedCard');
        localStorage.removeItem('SolvedCards');
        localStorage.removeItem('Time');
    }

    private setLocalGameData() {
        localStorage.setItem('CardDeck', JSON.stringify(this.cards));
        localStorage.setItem('PrevFlippedCard', JSON.stringify(this.prevFlippedCard));
        localStorage.setItem('SolvedCards', JSON.stringify([...this.solvedCards]));
    }

    private setLocalTime() {
        localStorage.setItem('Time', JSON.stringify(this.time));
    }

    private setLocalPause() {
        localStorage.setItem('Paused', JSON.stringify(this.paused));
    }

    public getCards() {
        return this.cards;
    }
}

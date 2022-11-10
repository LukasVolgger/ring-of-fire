export class Game {
    players: string[] = [];
    playerImages: string[] = [];
    stack: string[] = [];
    playedCards: string[] = [];
    currentPlayer: number = 0;
    currentCard: string = '';
    drawCardAnimation: boolean = false;
    maxPlayerLimitReached: boolean = false;
    gameOver: boolean = false;
    backgroundImage: string = 'cherries_bg.svg';
    documentID: string = '';
    timestamp: number = Date.now();

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('spades_' + i);
        }
        this.shuffle(this.stack);
    }

    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /**
     * Formats the game object to a JSON
     * @returns JSON
     */
    toJSON() {
        return {
            players: this.players,
            playerImages: this.playerImages,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            currentCard: this.currentCard,
            drawCardAnimation: this.drawCardAnimation,
            maxPlayerLimitReached: this.maxPlayerLimitReached,
            gameOver: this.gameOver,
            backgroundImage: this.backgroundImage,
            documentID: this.documentID,
            timestamp: this.timestamp
        }
    }
}



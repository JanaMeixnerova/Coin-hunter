import Furry from './furry.js';
import Coin from './coin.js';

export default class Game {
    constructor() {
        this.scoreText = document.querySelector("#score div strong");
        this.board = document.querySelectorAll("#board div");
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;
        this.id = 0;
        this.index = (x, y) => x + (y * 10);
    }

    showFurry() {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }

    showCoin() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }

    startGame() {
        this.id = setInterval(() => this.moveFurry(), 250);
    }

    moveFurry() {

        if (this.furry.direction === "right") {
            this.furry.x++;

        } else if (this.furry.direction === "left") {
            this.furry.x--;

        } else if (this.furry.direction === "up") {
            this.furry.y--;

        } else if (this.furry.direction === "down") {
            this.furry.y++;
        }

        this.hideVisibleFurry();
        this.checkCoinCollision();

        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {

            this.gameOver();

        } else {

            this.showFurry();
        }
    };

    hideVisibleFurry() {

        this.board.forEach((element) => element.classList.remove("furry"));

    };

    turnFurry(event) {

        switch (event.which) {

            case 37:
                this.furry.direction = "left";
                break;

            case 38:
                this.furry.direction = "up";
                break;

            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    checkCoinCollision() {

        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {

            this.board[this.index(this.coin.x, this.coin.y)].classList.remove("coin");
            this.score++;
            this.scoreText.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    gameOver() {
        this.scoreText.innerText = "Good game !" + " your score is: " + this.score;
        this.hideVisibleFurry();
        clearInterval(this.id);
    }
}




let SnakeVelocity = { x: 0, y: 0 }
const gameSound = new Audio('../SNAKE-GAME/assets/music/music.mp3');
const foodSound = new Audio('../SNAKE-GAME/assets/music/food.mp3');
const gameoverSound = new Audio('../SNAKE-GAME/assets/music/gameover.mp3');
const moveSound = new Audio('../SNAKE-GAME/assets/music/move.mp3');
let lastPainTime = 0;
let speed = 7;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 12 };


function isCollide(snakeArr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18) {
        return true;
    }
}

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}

function gameEngine() {
    /***** Udating snakeArr and food******/
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        moveSound.pause();
        SnakeVelocity = { x: 0, y: 0 };
        alert('Game over press any key to continue');
        gameSound.play();
        moveSound.play();
        score = 0;
        scoreBox.innerHTML = "Score :" + score;
        snakeArr = [
            { x: 13, y: 15 }
        ];
        speed = 7;
    }

    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score += 1;
        if (score > 0 && score <= 3) {
            speed += 1;
        } else {
            speed += 0.5;
        }
        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            high_score.innerHTML = "High Score :" + hiScoreVal;
        }
        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({ x: snakeArr[0].x + SnakeVelocity.x, y: snakeArr[0].y + SnakeVelocity.y });
        let a = 2;
        let b = 16;
        food = {
            x: Math.floor(Math.random() * (b - a + 1)) + a,
            y: Math.floor(Math.random() * (b - a + 1)) + a,
        }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += SnakeVelocity.x;
    snakeArr[0].y += SnakeVelocity.y;

    /**** rendering the snakeArr and food******/

    // rendering the snakeArr
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake_body");
        }
        board.appendChild(snakeElement);
    });

    // rendering the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// game logic starts here
let hiScore = localStorage.getItem("hiScore");
if (hiScore == null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
} else {
    hiScoreVal = JSON.parse(hiScore);
    high_score.innerHTML = "High score :" + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    SnakeVelocity = { x: 0, y: 1 };
    moveSound.play();
    gameSound.play();
    switch (e.key) {
        case "ArrowUp":
            SnakeVelocity.x = 0;
            SnakeVelocity.y = -1;
            break;
        case "ArrowDown":
            SnakeVelocity.x = 0;
            SnakeVelocity.y = 1;
            break;
        case "ArrowRight":
            SnakeVelocity.x = 1;
            SnakeVelocity.y = 0;
            break;
        case "ArrowLeft":
            SnakeVelocity.x = -1;
            SnakeVelocity.y = 0;
            break;
        default:
            break;
    }
});
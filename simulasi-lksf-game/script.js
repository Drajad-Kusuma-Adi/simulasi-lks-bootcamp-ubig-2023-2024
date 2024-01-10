let gameStart = false;
document.getElementById('startButton').addEventListener('click', () => {
    gameStart = true;
})
document.addEventListener('keydown', (event) => {
    keyPress(event);
})
document.addEventListener('keydown', (event) => {
    rewindKey(event);
})

let cvs = document.getElementById('board');
let ctx = cvs.getContext('2d');
let timer = document.getElementById('timer');
let scoreBoard = document.getElementById('score');

cvs.width = 960;
cvs.height = 600;

let grid = 20;
let direction = 'right';
let seconds = 0;
let minutes = 0;
let rewind = false;

let snake = [{
    x: cvs.width / 2,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}, {
    x: cvs.width / 2 - grid,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}, {
    x: cvs.width / 2 - grid - grid,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}, {
    x: cvs.width / 2 - grid - grid - grid,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}, {
    x: cvs.width / 2 - grid - grid - grid - grid,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}, {
    x: cvs.width / 2 - grid - grid - grid - grid - grid,
    y: cvs.height / 2,
    previous: [
        {}
    ]
}];

let score = snake.length;

let food = [{
    x: Math.floor(Math.random() * 30) * grid,
    y: Math.floor(Math.random() * 30) * grid,
    duration: 0
}, {
    x: Math.floor(Math.random() * 30) * grid,
    y: Math.floor(Math.random() * 30) * grid,
    duration: 0
}, {
    x: Math.floor(Math.random() * 30) * grid,
    y: Math.floor(Math.random() * 30) * grid,
    duration: 0
}]

function drawGrid() {
    for (let i = 0; i <= cvs.width; i += grid) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(i, 0, grid, cvs.height);
    }
    for (let i = 0; i < cvs.height; i += grid) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.strokeRect(0, i, cvs.width, grid);
    }
}

function drawBg() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}

function keyPress(event) {
    if (event.key === 'a' && direction != 'right') direction = 'left';
    if (event.key === 'w' && direction != 'down') direction = 'up';
    if (event.key === 'd' && direction != 'left') direction = 'right';
    if (event.key === 's' && direction != 'up') direction = 'down';
}

function moveSnake(mode) {
    if (mode === 1) {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                clearInterval(gameLoop);
                alert('Game over!');
                window.location.reload();
            }
        }

        newSnakeX = snake[0].x;
        newSnakeY = snake[0].y;

        if (direction === 'left') {
            newSnakeX = newSnakeX -= grid;
        } else if (direction === 'up') {
            newSnakeY = newSnakeY -= grid;
        } else if (direction === 'right') {
            newSnakeX = newSnakeX += grid;
        } else if (direction === 'down') {
            newSnakeY = newSnakeY += grid;
        }

        if (newSnakeX > cvs.width) {
            newSnakeX = 0;
        } else if (newSnakeY > cvs.height) {
            newSnakeY = 0;
        } else if (newSnakeX < 0) {
            newSnakeX = cvs.width;
        } else if (newSnakeY < 0) {
            newSnakeY = cvs.height;
        }

        newSnake = {
            x: newSnakeX,
            y: newSnakeY,
            previous: [{
                x: snake[0].x,
                y: snake[0].y,
                previous: snake[0].previous
            }
            ]
        }
        console.log(newSnake);

        snake.pop();
        snake.unshift(newSnake);
    } else {
        for (let i = 0; i < snake.length; i++) {
            newSnakeX = snake[i].previous[0].x;
            newSnakeY = snake[i].previous[0].y;

            newSnake = {
                x: newSnakeX,
                y: newSnakeY,
                previous: {
                    x: snake[i].previous[0].x,
                    y: snake[i].previous[0].y,
                    previous: snake[i].previous[0].previous
                }
            }
            console.log(newSnake);

            snake.pop();
            snake.unshift(newSnake);
        }
    }
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, grid, grid);
    }
}

function drawFood() {
    for (let i = 0; i < food.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(food[i].x, food[i].y, grid, grid);
    }
}

let foodInterval = 0;
let foodLoop = setInterval(() => {
    food[0].duration += 1;
    if (food[0].duration >= 5) {
        food.splice(0, 1);
    }
    foodInterval += 1;
    if (foodInterval >= 3 && food.length < 5) {
        food.push({
            x: Math.floor(Math.random() * 30) * grid,
            y: Math.floor(Math.random() * 30) * grid,
            duration: 0
        });
    }
}, 1000);

function checkCollision() {
    for (let i = 0; i < food.length; i++) {
        if (snake[0].x === food[i].x && snake[0].y === food[i].y) {
            food.splice(i, 1);
            snake.push({});
            score += 1;
        }
        foodIndex = i;
        foodX = food[i].x;
        foodY = food[i].y;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === foodX && snake[i].y === foodY) {
                food.splice(foodIndex, 1);
            }
        }
    }
}

let timerLoop = setInterval(() => {
    if (gameStart === true) {
        seconds += 1;
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
    }
}, 1000)

function timerBoardUpdate() {
    if (seconds < 10) {
        if (minutes < 10) {
            timer.innerHTML = '0' + minutes + ':' + '0' + seconds;
        } else {
            timer.innerHTML = minutes + ':' + '0' + seconds;
        }
    } else {
        if (minutes < 10) {
            timer.innerHTML = '0' + minutes + ':' + seconds;
        } else {
            timer.innerHTML = minutes + ':' + seconds;
        }
    }
}

function scoreBoardUpdate() {
    score = snake.length;
    scoreBoard.innerHTML = 'Score: ' + score;
}

function rewindKey(event) {
    if (event.key === ' ' && rewind === false && gameStart === true) {
        rewind = true;
    } else if (event.key === ' ' && rewind === true && gameStart === true) {
        rewind = false;
    }
}

setInterval(() => {
    if (gameStart === true) {
        if (rewind === true) {
            moveSnake(2);
        } else {
            moveSnake(1);
        }
    }
}, 100)

function update() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    drawBg();
    // drawGrid();
    checkCollision();
    drawSnake();
    drawFood();
    timerBoardUpdate();
    scoreBoardUpdate();
}

let gameLoop = setInterval(() => {
    if (gameStart === true) {
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('board').classList.remove('hidden');
        timer.classList.remove('hidden');
        scoreBoard.classList.remove('hidden');
        update();
    } else {
        document.getElementById('board').classList.add('hidden');
        document.getElementById('mainMenu').classList.remove('hidden');
        timer.classList.add('hidden');
        scoreBoard.classList.add('hidden');
    }
}, 100)
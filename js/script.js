const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// botoes
const cima = document.querySelector('.cima')
const direita = document.querySelector('.direita')
const baixo = document.querySelector('.baixo')
const esquerda = document.querySelector('.esquerda')
// botoes

const size = 15;

const snake = [

    {x:200, y:200},
    {x:215, y:200},
    
];

let direction;

// botoes
cima.addEventListener('click', () => {
    direction = 'up'
})

direita.addEventListener('click', () => {
    direction = 'right'
})

baixo.addEventListener('click', () => {
    direction = 'down'
})

esquerda.addEventListener('click', () => {
    direction = 'left'
})

// botoes


const drawSnake = () => {
    ctx.fillStyle = '#ddd';
    snake.forEach((position, index) => {

        if(index === snake.length - 1) {
            ctx.fillStyle = '#fff'
        }

        ctx.fillRect(position.x,position.y, size, size)
    })
}

const moveSnake = () => {

    if(!direction) return

    const head = snake.at(snake.length -1);

    if(direction === 'right') {
        snake.push({x:head.x + size, y:head.y})
    }

    if(direction === 'left') {
        snake.push({x:head.x - size, y:head.y})
    }

    if(direction === 'up') {
        snake.push({x:head.x, y:head.y  - size })
    }

    if(direction === 'down') {
        snake.push({x:head.x, y:head.y  + size })
    }

    snake.shift();
}


setInterval(() => {

    ctx.clearRect(0,0,600,600)

    moveSnake()
    drawSnake();
}, 300)
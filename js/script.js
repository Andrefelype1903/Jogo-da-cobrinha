const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// botoes de direção
const cima = document.querySelector('.cima')
const esquerda = document.querySelector('.esquerda')
const direita = document.querySelector('.direita')
const baixo = document.querySelector('.baixo')
// botoes de direção

const size = 15;

const snake = [
    { x: 195, y: 195 },
    { x: 210, y: 195 },
    
];

let foodX = Math.round(Math.random() * 40)
let foody = Math.round(Math.random() * 40)
console.log(foodX)
console.log(foody)

const food = {x:foodX * size, y:foody * size, color:"yellow"}

let direction, loopId;

const drowFood = () => {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, size, size)
}


const drawSnake = () => {
    ctx.fillStyle = '#ddd';
    snake.forEach((position, index) => {
        if(index === snake.length -1) {
            ctx.fillStyle = '#fff';
        }
        ctx.fillRect(position.x, position.y, size, size);
    })
}

const moveSnake = () => {
    if(!direction) return;
    const head = snake[snake.length -1];

    
    if(direction === "rigth") {
        snake.push({ x: head.x + size, y: head.y})
    }

    if(direction === "left") {
        snake.push({ x: head.x - size, y: head.y})
    }
    
    if(direction === "up") {
        snake.push({ x: head.x, y: head.y - size})
    }
    
    if(direction === "down") {
        snake.push({ x: head.x, y: head.y + size})
    }
    
    snake.shift()
}

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#191919";


  for(let i = 15; i < canvas.width; i += size) {
      ctx.beginPath()
      ctx.lineTo(i,0);
      ctx.lineTo(i,600);
    
      ctx.stroke();

      ctx.beginPath()
      ctx.lineTo(0,i);
      ctx.lineTo(600,i);
    
      ctx.stroke();
  }


}


const gameLoop = () => {

    clearInterval(loopId)

    ctx.clearRect(0,0,600,600);
    drawGrid()

    drowFood()


    moveSnake();
    drawSnake();

    loopId = setTimeout(() => {
      gameLoop()
    },300)
}

gameLoop()

cima.addEventListener('click', () => {
    if(direction != "down") {
        direction = "up"
    }
})

esquerda.addEventListener('click', () => {
    if(direction != "rigth") {
        direction = "left"
    }
})

direita.addEventListener('click', () => {
    if(direction != "left") {
        direction = "rigth"
    }
})

baixo.addEventListener('click', () => {
    if(direction != "up") {
        direction = "down"
    }
})

document.addEventListener('keydown', ({key}) => {
    // event.preventDefault()

  if(key === 'ArrowUp' && direction != "down") {
    direction = "up"
  }
  
  if(key === 'ArrowLeft' && direction != "rigth") {
    direction = "left"
  }

  if(key === 'ArrowRight' && direction != "left") {
    direction = "rigth"
  }

  if(key === 'ArrowDown' && direction != "up") {
    direction = "down"
  }

})

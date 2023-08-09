const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const h1 = document.querySelector('h1');

const score = document.querySelector('.score--value')
const finalScore = document.querySelector('.final-score > span')
const menu = document.querySelector('.menu-screen')
const buttonPlay = document.querySelector('.btn-play')


// const vel1 = document.querySelector('.vel1');
// const vel2 = document.querySelector('.vel2');
// const vel3 = document.querySelector('.vel3');

// const comParede = document.querySelector('.com_parede');
// const semParede = document.querySelector('.sem_parede');



let velocidade = 100;
let parede = true;

// vel1.addEventListener('click', () => {
//     velocidade = 300
// })

// vel2.addEventListener('click', () => {
//     velocidade = 200
// })

// vel3.addEventListener('click', () => {
//     velocidade = 100
// })

// comParede.addEventListener('click', () => {
//     comParede.classList.add('active');
//     semParede.classList.remove('active')
//     parede = true;
// })

// semParede.addEventListener('click', () => {
//     semParede.classList.add('active')
//     comParede.classList.remove('active')
//     parede = false;
// })



// botoes de direção
const cima = document.querySelector('.cima')
const esquerda = document.querySelector('.esquerda')
const direita = document.querySelector('.direita')
const baixo = document.querySelector('.baixo')
// botoes de direção

const size = 15;

const audio = new Audio('./assets/audio.mp3')

const initialPosition = { x: 195, y: 195 }



let snake = [initialPosition];

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}


// funçao reserva que gera  uma cor dentre opçoes definidas ↓

// const GeraCorAleatoria = () => {
//     const cores = ['cyan', 'yellow', 'red', 'orange', 'magenta', 'green', 'darkviolet', 'salmon'];

//     let corAleatoria = cores[Math.round(Math.random() * cores.length)]

//     return corAleatoria

// }

// funçao reserva que gera  uma cor dentre opçoes definidas ↑


const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomPosition = () => {
    const number = randomNumber(1, canvas.width - size);
    return Math.round(number / size) * size;
}

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red},${green},${blue})`
}



const food = {x:randomPosition() , y:randomPosition() , color: randomColor()}

let direction, loopId;

const drowFood = () => {

    const {x, y, color} = food

    ctx.shadowColor = color;
    ctx.shadowBlur = 6;    
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
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

const checkEat = () => {
    const head = snake[snake.length -1];
    // const neck = snake[snake.length - 2];

    if(head.x === food.x && head.y === food.y) {
        incrementScore()
        snake.push(head)

        audio.play()

        let x = randomPosition();
        let y = randomPosition();

        while(snake.find((position) => position.x === x && position.y === y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x;
        food.y = y;
        food.color = randomColor()

    }

}

// const checkCollision = () => {
//     const head = snake[snake.length - 1];
//     const canvasLimit = canvas.width - size;
//     const neckIndex = snake.length - 2;

//     const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

//     const selfCollision = snake.find((position, index) => {
//         return index < neckIndex && position.x === head.x && position.y === head.y
//     })

//     if(wallCollision || selfCollision) {
//         gameOver()
//         h1.innerText = "GAME OVER"
//     }
    
// }

const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x === head.x && position.y === head.y
    })

    if(selfCollision) {
        gameOver()
        h1.innerText = "GAME OVER"
    }


    if(parede) {
        if(wallCollision) {
            gameOver()
        }
    } else {
        for(let i = 0; i < snake.length; i++) {
            if(snake[i].x > canvasLimit) {
                snake[i].x = 0
            }
    
            if(snake[i].y > canvasLimit) {
                snake[i].y = 0
            }
    
            if(snake[i].x < 0) {
                snake[i].x = canvasLimit
            }
    
            if(snake[i].y < 0) {
                snake[i].y = canvasLimit
            }
    
        }
    }
    


}

const gameOver = () => {
    direction = undefined

    menu.style.display = 'flex';
    finalScore.innerText = score.innerText;
    canvas.style.filter = 'blur(2px)'

}

const gameLoop = () => {

    clearInterval(loopId)

    ctx.clearRect(0,0,600,600);
    drawGrid()

    drowFood()


    moveSnake();
    drawSnake();
    checkEat()

    checkCollision()

    loopId = setTimeout(() => {
      gameLoop()
    },velocidade)
}

gameLoop()

cima.addEventListener('click', () => {
    if(direction != "down") {
        direction = "up"
    }
})

esquerda.addEventListener('click', () => {
    
    if(direction === undefined) return

    if(direction != "rigth") {
        direction = "left"
    }
})

direita.addEventListener('click', () => {
    if(direction != "left" ) {
        direction = "rigth"
    }
})

baixo.addEventListener('click', () => {
    if(direction != "up") {
        direction = "down"
    }
})

document.addEventListener('keydown', ({key}) => {
    event.preventDefault()

  if(key === 'ArrowUp' && direction != "down") {
    direction = "up"
  }
  
  if(key === 'ArrowLeft' && direction != "rigth" && direction != undefined) {
    direction = "left"
  }

  if(key === 'ArrowRight' && direction != "left") {
    direction = "rigth"
  }

  if(key === 'ArrowDown' && direction != "up") {
    direction = "down"
  }

})

canvas.addEventListener('click', (event) => {


    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const telaHorizontal = (event.clientX - rect.left) / width;
    const telaVertical = (event.clientY - rect.top) / height;

    const horizontal = telaHorizontal * 9 + 1
    const vertical = telaVertical * 9 + 1

    
    console.log("horizontal = " + horizontal)
    console.log("vertical = " + vertical)

    if(horizontal > 5.5 && direction != 'rigth' && direction != 'left') {
        direction = 'rigth'
        return
    }
    if(horizontal < 5.5 && direction != 'left' && direction != 'rigth' && direction != undefined) {
        direction = 'left'
        return
    }
    if(vertical > 5.5 && direction != 'down' && direction != 'up') {
        direction = 'down'
        return
    }
    if(vertical < 5.5 && direction != 'up' && direction != 'down') {
        direction = 'up'
        return
    }
})

buttonPlay.addEventListener('click', () => {
    score.innerText = '00';
    menu.style.display = 'none';
    canvas.style.filter = 'none';
    snake = [initialPosition]

})



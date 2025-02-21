const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const h1 = document.querySelector('h1');

const score = document.querySelector('.score--value')
const finalScore = document.querySelector('.final-score > span')
const menu = document.querySelector('.menu-screen')
const buttonPlay = document.querySelector('.btn-play')

const spanPlayer = document.querySelector('.span_player > span');

const corpo = document.querySelector('body');
const cabecalho = document.querySelector('.cabecalho');

const menuScreen = document.querySelector('.menu-screen')

const rodape = document.querySelector('.rodape')


const speaker = document.querySelector('.checkbox');

const TemaEscuroClaro = document.querySelector('.tema-escuro-claro');

// botoes de direção
const cima = document.querySelector('.cima')
const esquerda = document.querySelector('.esquerda')
const direita = document.querySelector('.direita')
const baixo = document.querySelector('.baixo')

const direcao = document.querySelector('.botoes')
// botoes de direção


// seletores do ranking ↓
const primeiro = document.querySelector('.primeiro');
const segundo = document.querySelector('.segundo');
const terceiro = document.querySelector('.terceiro');
const quarto = document.querySelector('.quarto');
const quinto = document.querySelector('.quinto');

// seletores do ranking ↑


let somOn = true;

if(speaker.checked) {
    somOn = false
}


let temaClaro;
let corGrid = '#191919';
let corSnakeHead = '#fff';
let corSnakeBody = '#ddd'

TemaEscuroClaro.addEventListener('click', () => {

    if(!TemaEscuroClaro.checked) {
        temaClaro = true;
        corGrid = '#fff';
        corSnakeHead = '#000';
        corSnakeBody = '#444'
    } else {
        temaClaro = false;
        corGrid = '#191919'
        corSnakeHead = '#fff'
        corSnakeBody = '#ddd'
    }
    console.log(temaClaro);

    if(temaClaro === true) {
        corpo.style.backgroundColor = '#fafafa';
        cabecalho.style.color = '#000';
        canvas.style.backgroundColor = '#fafafa';
        canvas.style.border = '1px solid #000';
        direcao.style.color = '#000';
        rodape.style.color = '#000'


    } else if(temaClaro === false) {
        corpo.style.backgroundColor = '#191919';
        cabecalho.style.color = '#fff';
        canvas.style.backgroundColor = '#111';
        canvas.style.border = '1px solid #fff';
        direcao.style.color = '#fff';
        rodape.style.color = '#fff'

    }

})

const player = sessionStorage.getItem('player');


const arrayStringRecuperado  =  localStorage.getItem('rankingSnake')
const todosPlayers = JSON.parse(arrayStringRecuperado);

const playerGerais = []


if(arrayStringRecuperado) {
    playerGerais.push(todosPlayers);
    todosPlayers.sort((a, b) => b.score - a.score);
}

console.log(todosPlayers)

const escreveRanking = () => {
  
    if(arrayStringRecuperado) {

        if(todosPlayers.length > 0) {
            primeiro.style.background = 'rgb(250, 250, 250, 0.5)'
            primeiro.textContent = `1°: ${todosPlayers[0].nome} //  ${todosPlayers[0].score} pontos`
        }
        if(todosPlayers.length > 1) {
            segundo.style.background = 'rgb(250, 250, 250, 0.5)'
            segundo.textContent = `2°: ${todosPlayers[1].nome} // ${todosPlayers[1].score} pontos`
        }
        if(todosPlayers.length > 2) {
            terceiro.style.background = 'rgb(250, 250, 250, 0.5)'
            terceiro.textContent = `3°: ${todosPlayers[2].nome} // ${todosPlayers[2].score} pontos`
        }
        if(todosPlayers.length > 3) {
            quarto.style.background = 'rgb(250, 250, 250, 0.5)'
            quarto.textContent = `4°: ${todosPlayers[3].nome} // ${todosPlayers[3].score} pontos`
        }
        if(todosPlayers.length > 4) {
            quinto.style.background = 'rgb(250, 250, 250, 0.5)'
            quinto.textContent = `5°: ${todosPlayers[4].nome} // ${todosPlayers[4].score} pontos`
        }
    }

}



spanPlayer.innerText = player


let velocidade = 300;
let parede = true;

const velocidadeRadio = sessionStorage.getItem('velocidade')
const paredesSimNao = sessionStorage.getItem('paredesSimNao')

if(paredesSimNao === 'nao') {
    parede = false
}


if(velocidadeRadio === 'lento') {
    velocidade = 300
} 

if(velocidadeRadio === 'medio') {
    velocidade = 200
} 

if(velocidadeRadio === 'rapido') {
    velocidade = 100;
}





const size = 15;

const audio = new Audio('../assets/audio.mp3')

const initialPosition = { x: 195, y: 195 }



let snake = [initialPosition];



const incrementFast = () => {
    if(snake.length === 10) {
        velocidade = 200;
    } else if(snake.length === 20) {
        velocidade = 100
    } else if(snake.length === 30) {
        velocidade = 70
    }
}



const incrementScore = () => {
    score.innerText = +score.innerText + 10
}


// funçao reserva que gera  uma cor dentre opçoes definidas ↓

/* const randomColor = () => {
    const cores = ['cyan', 'yellow', 'red', 'orange', 'magenta', 'green', 'darkviolet', 'salmon'];

    let corAleatoria = cores[Math.round(Math.random() * cores.length)]

    return corAleatoria

} */


// funçao reserva que gera  uma cor dentre opçoes definidas ↑

// mudar as funcoes randomPosition e checkEat tambem ↑

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

let controleDirecao = true
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
    // ctx.fillStyle = '#ddd';
    ctx.fillStyle = corSnakeBody;
    snake.forEach((position, index) => {
        if(index === snake.length -1) {
            // ctx.fillStyle = '#fff';
            ctx.fillStyle = corSnakeHead;
        }
        ctx.fillRect(position.x, position.y, size, size);
    })
}

const moveSnake = () => {

    if(velocidadeRadio === 'lento' || velocidadeRadio === 'medio'){
        incrementFast()
    } 

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
  ctx.strokeStyle = corGrid;


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

        if(speaker.checked) {
            somOn = false
        } else {
            somOn = true
        }

        if(somOn) {
            audio.play()
        }
        

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
            return
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

let executou = false


const gameOver = () => {
    direction = undefined
    controleDirecao = false;

    menu.style.display = 'flex';
    finalScore.innerText = score.innerText;
    canvas.style.filter = 'blur(2px)'


    const jogadorAtual = {nome:player, score:finalScore.innerHTML};
   

    if(!executou) {

        if(todosPlayers === null) {

            primeiro.style.background = 'rgb(250, 250, 250, 0.5)'
            primeiro.textContent = `1°: ${jogadorAtual.nome} //  ${jogadorAtual.score} pontos`

            playerGerais.push(jogadorAtual);

            const jogadorAtualString = JSON.stringify(playerGerais)
            localStorage.setItem('rankingSnake', jogadorAtualString)

    
        } else {

            todosPlayers.push(jogadorAtual)

            todosPlayers.sort((a, b) => b.score - a.score);
    
            let arrayString = JSON.stringify(todosPlayers);
    
            localStorage.setItem('rankingSnake', arrayString)
            escreveRanking()


        }


        executou = true

    }
}

// localStorage.clear()

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
    if(controleDirecao === true) {
        if(direction != "down") {
            direction = "up"
        }
    }
})

esquerda.addEventListener('click', () => {
    if(controleDirecao === true) {
        if(direction === undefined) return
    
        if(direction != "rigth") {
            direction = "left"
        }
    }
})

direita.addEventListener('click', () => {
    if(controleDirecao === true) {
        if(direction != "left" ) {
            direction = "rigth"
        }
    }
})

baixo.addEventListener('click', () => {
    if(controleDirecao === true) {
        if(direction != "up") {
            direction = "down"
        }
    }
})

document.addEventListener('keydown', ({key}) => {
    // event.preventDefault()
    if(controleDirecao === true) {
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
    }
})

canvas.addEventListener('click', (event) => {

    if(controleDirecao === true) {
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
    }
})

buttonPlay.addEventListener('click', () => {
   
    location.reload()

    score.innerText = '00';
    menu.style.display = 'none';
    canvas.style.filter = 'none';
    snake = [initialPosition]

    controleDirecao = true;

})


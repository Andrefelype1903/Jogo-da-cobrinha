const nome = document.querySelector('.seu_nome');
const formulario = document.querySelector('.login_form');
const botao = document.querySelector('.button_submit')




nome.addEventListener('input', ( {target} ) => {
    if(target.value.length >= 3) {
        botao.removeAttribute('disabled')
        return
    }
})

formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    sessionStorage.setItem('player', nome.value)

    const velocidade = document.querySelector('input[name="dificuldade"]:checked').value

    const paredeSimNao = document.querySelector('input[name="paredes"]:checked').value

    sessionStorage.setItem('velocidade', velocidade)
    sessionStorage.setItem('paredesSimNao', paredeSimNao)

    setTimeout(() => {
        window.location = 'pages/game.html'
    },1000)
})


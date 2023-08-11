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
    localStorage.setItem('player', nome.value)

    const velocidade = document.querySelector('input[name="dificuldade"]:checked').value

    const paredeSimNao = document.querySelector('input[name="paredes"]:checked').value

    const somOnOff = document.querySelector('input[name="som"]:checked').value

    localStorage.setItem('velocidade', velocidade)
    localStorage.setItem('paredesSimNao', paredeSimNao)
    localStorage.setItem('somOnOff', somOnOff)

    window.location = 'pages/game.html'


    

})

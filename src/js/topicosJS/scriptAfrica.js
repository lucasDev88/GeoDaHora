var logo = document.getElementById('logo')
var butCego = document.getElementById('cego')
var pCego = document.querySelectorAll('.ceguera')
var habilitatet = false


logo.addEventListener('click', function() {
    document.location.replace('../index.html')
})

butCego.addEventListener('click', function() {
    if (habilitatet == false) {
        habilitatet = true
        butCego.textContent = 'Modo leitura 👓 (Ativado)'
        pCego.forEach(function(el) {
            el.style.fontSize = '30px'
        })
    } else {
        habilitatet = false
        butCego.textContent = 'Modo leitura 👓 (Desativado)'
        pCego.forEach(function(el) {
            el.style.fontSize = '20px'

        })
        setTimeout( () => {
            butCego.textContent = 'Modo leitura 👓'
        }, 3000 )
    }
})
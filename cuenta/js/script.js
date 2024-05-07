let usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

console.log(usuarioActivo)
let spanSaldo = document.getElementById('saldoValue')

function inicio(){
    const navBotones = document.querySelector('.tabs')
    const botones = document.querySelectorAll('.tabs button')
    
    let botonActive

    const spanTab = document.getElementById('tab')
    const spanUser = document.getElementById('holaNombre')
    
    spanUser.textContent = usuarioActivo.nombre
    spanSaldo.textContent = usuarioActivo.saldo
    tabArticle(0);
    
    botones.forEach(function(boton, indice){
        boton.addEventListener('click',() =>{
            navBotones.querySelector('.active').classList.remove('active');
            boton.classList.add('active');

            tabArticle(indice)

            botonActive = boton
            spanTab.textContent = botonActive.textContent
        })
        if(boton.classList.contains('active')){
            botonActive = boton
            return;
        }
    });

    spanTab.textContent = botonActive.textContent  
}
function tabArticle(indice){
    const articulos = document.querySelectorAll('.tab-content')

    articulos.forEach(function(articulo) {
        articulo.classList.add('hide')
    })
    
    articulos[indice].classList.remove('hide')
}
function operacion(tipo){
    const operaciones = document.querySelectorAll('.operacion_container')
    const inputsOperaciones = document.querySelectorAll('.monto input')

    operaciones.forEach(function(operacion){
        operacion.classList.add('hide')
    })
    inputsOperaciones.forEach(function(input){
    input.value = input.defaultValue;
    })

    if(tipo == 'consultar'){
        operaciones[0].classList.remove('hide')
        spanSaldo.textContent = usuarioActivo.saldo
    }else if(tipo == 'retirar'){
        operaciones[1].classList.remove('hide')
        
    }else if(tipo == 'depositar'){
        operaciones[2].classList.remove('hide')
    }
}
function retirar(){
    const inputRetirar = Number(document.getElementById('retirar').value)
    
    function reglaNegocio(){
        let value = 0
        value = usuarioActivo.saldo - inputRetirar
        if(value < 10){
            return true
        }else{
            return false
        }
    }

    if(inputRetirar == ""){
        alert('No has introducido ningún monto. Verifica de nuevo')
    }else{
        if(usuarioActivo.saldo >= inputRetirar && !reglaNegocio()){
            usuarioActivo.saldo = usuarioActivo.saldo - inputRetirar
            alert('Transacción exitosa. Por favor corrobora tu saldo.')
        }else if(reglaNegocio()){
            alert('No puedes tener menos de $10 en la cuenta. Verifica de nuevo')
        }
    }

    const inputsOperaciones = document.querySelectorAll('.monto input')
    inputsOperaciones.forEach(function(input){
        input.value = input.defaultValue;
    })
}
function depositar(){
    const inputDepositar = Number(document.getElementById('depositar').value)
        
    function reglaNegocio(){
        let value = 0
        value = usuarioActivo.saldo + inputDepositar
        console.log(value)
        if(value > 990){
            return true
        }else{
            return false
        }
    }

    if(inputDepositar == ""){
        alert('No has introducido ningún monto. Verifica de nuevo')
    }else{
        if(!reglaNegocio()){
            usuarioActivo.saldo = usuarioActivo.saldo + inputDepositar
            alert('Transacción exitosa. Por favor corrobora tu saldo.')
        }else if(reglaNegocio()){
            alert('No puedes tener más de $990 en la cuenta. Verifica de nuevo')
        }
    }

    const inputsOperaciones = document.querySelectorAll('.monto input')
    inputsOperaciones.forEach(function(input){
        input.value = input.defaultValue;
    })
}
window.addEventListener('load', inicio)
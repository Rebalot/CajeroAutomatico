let cuentas = [
    { nombre: "ALBERTO", saldo: 200, noCliente:111, username: "rebalot", password: 'rebalot'}, 
    { nombre: "LIZBETH", saldo: 290, noCliente:222, username: 'lizmon', password: 'lizmon' },
    { nombre: "NELSON", saldo: 67, noCliente:333, username: 'nelfer', password: 'nelfer'}
]
function inicio(){
    const inputs = document.querySelectorAll('input')

    inputs.forEach(function(input){
        input.addEventListener("input", function() {
            this.value = this.value.replace(/\s/g, '');
        });
    })
}

function login(){
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    
    let usuarioEncontrado = false;

    cuentas.forEach(function(cuenta) {
        if (cuenta.username === username && cuenta.password === password) {
            usuarioEncontrado = true;
            alert(`Bienvenido/a ${cuenta.nombre}`)
            localStorage.setItem('usuarioActivo', JSON.stringify(cuenta));
            window.location.href = 'cuenta/cuenta.html';
            return;
        }     
    })
    if (!usuarioEncontrado) {
        msjError('login_incorrecto', 'Usuario y/o contraseña incorrecto. Revisa nuevamente.')

    }
}
function registrarMostrar(){
    const registroForm = document.getElementById('registro_container')
    const vinculos = document.querySelectorAll('#login a')
    
    vinculos[1].style.color = 'rgb(105, 0, 204)'
    registroForm.style.display = 'flex'
    
}
function cerrarRegistrar(){
    const registroForm = document.getElementById('registro_container')
    registroForm.style.display = 'none'

    const registroIncorrecto = document.getElementById('registro_incorrecto')
    registroIncorrecto.classList.remove('mostrar');

    const inputsContenedor = document.querySelectorAll('.requerimientos input')
    inputsContenedor.forEach(function(input) {
        input.value = input.defaultValue;
    })

}
function registro(){
    const noCliente = document.getElementById('noCliente').value
    const nombre = document.getElementById('nombre').value
    const usernameRegistro = document.getElementById('usernameRegistro').value
    const passwordRegistro = document.getElementById('passwordRegistro').value

    let clienteExistente = false;
    cuentas.forEach(function(cliente) {
        if (cliente.noCliente === parseInt(noCliente)) {
            clienteExistente = true;
        }
    });

    if(noCliente == '' || nombre == '' || usernameRegistro == '' || passwordRegistro == ''){
        msjError('registro_incorrecto', "Datos faltantes. Revisa nuevamente cada casilla.")
        
    }else{
        if(noCliente.length != 3 || clienteExistente || /\d/.test(nombre)){
            msjError('registro_incorrecto', "Datos inválidos. Revisa nuevamente cada casilla.")
            
        }else{
            alert('Cuenta creada con éxito. Tu saldo de apertura es de $100')
            alert('A continuación, inicia sesión.')
            let nuevoCliente = {
                nombre: nombre,
                saldo: 100,
                noCliente: Number(noCliente),
                username: usernameRegistro,
                password: passwordRegistro
            };
            cuentas.push(nuevoCliente)
            console.log(cuentas)
            cerrarRegistrar()
        }
    }
}
function msjError(id, msj){
    let msjIncorrecto = document.getElementById(id)

    msjIncorrecto.textContent = msj
    msjIncorrecto.classList.remove('mostrar');
    void msjIncorrecto.offsetWidth;
    msjIncorrecto.classList.add('mostrar');
}
window.addEventListener('load', inicio)
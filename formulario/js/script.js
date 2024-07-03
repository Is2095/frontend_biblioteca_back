
const $d = document;

const $provincia = $d.getElementById("provincia");
const imagenLibro = $d.getElementById("contenedorEnviarDatos")
const textoEnviarDatos = $d.getElementById("textoEnviarDatos")
const formulario = $d.getElementById('formulario')
const botonEnviar = $d.getElementById('botonEnviar')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const nombre = $d.getElementById('nombre').value;
    const apellido = $d.getElementById('apellido').value;
    const edad = $d.getElementById('edad').value;
    const email = $d.getElementById('email').value;
    const password = $d.getElementById('password').value;
    const fechaActual = $d.getElementById('fechaActual').value; 
    const provincia = $d.getElementById('provincia').value;

    console.log(nombre, apellido, edad, email, password, fechaActual, provincia, 'datos');

    fetch('https://backend-biblioteca-back.vercel.app/api/formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre: nombre, apellido: apellido, edad: edad, email: email, password: password, fechaActual: fechaActual, provincia: provincia})
    })
    .then(resultado => resultado.json())
    .then(res => {
        alert(res.message)
        window.location.href = '../../login/index.html'
    }) 
    .catch(err => console.log(err))
})

function provincias() {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(res => {
            let $opciones = `<option value="Elige una Provincia">Elige una Provincia</option>`;
            res?.provincias?.forEach(element => $opciones += `<option value="${element.nombre}">${element.nombre}</option>`);
            $provincia.innerHTML = $opciones;
        })
        .catch(error => console.log(error))
}
$d.addEventListener("DOMContentLoaded", provincias)




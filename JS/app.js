const botonGuardar = document.getElementById('btn-guardar');
const entradaTexto = document.getElementById('entrada-texto');
const historial = document.getElementById('historial');
botonGuardar.addEventListener('click', () => {
    const texto = entradaTexto.value;
    console.log(texto);
    const listaEntradas = JSON.parse(localStorage.getItem('entradas')) || [];
    listaEntradas.push(texto);
    localStorage.setItem('entradas', JSON.stringify(listaEntradas));
    const parrafo = document.createElement('p'); //Crea un parrafo vacio 
    parrafo.textContent = texto; // agrega el texto del usuario 
    historial.appendChild(parrafo);
});

function cargarEntradas() {
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.forEach(function(entrada) {
        const parrafo = document.createElement('p');
        parrafo.textContent = entrada;
        historial.appendChild(parrafo);
    });
}
cargarEntradas();
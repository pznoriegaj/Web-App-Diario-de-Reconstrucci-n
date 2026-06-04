const botonGuardar = document.getElementById('btn-guardar');
const entradaTexto = document.getElementById('entrada-texto');
const historial = document.getElementById('historial');
botonGuardar.addEventListener('click', () => {
    const texto = entradaTexto.value;
    const fecha = new Date();
    console.log(texto);
    const listaEntradas = JSON.parse(localStorage.getItem('entradas')) || [];
    listaEntradas.push({ texto: texto, fecha: fecha });/* se agrega un objeto con el texto y la fecha a la lista de entradas */
    localStorage.setItem('entradas', JSON.stringify(listaEntradas));
    const parrafo = document.createElement('p'); //Crea un parrafo vacio 
    parrafo.textContent = texto; // agrega el texto del usuario 
    historial.appendChild(parrafo);
    const fechaElemento = document.createElement('small'); // agrega la fecha de entradad del usuario
    fechaElemento.textContent = fecha.toLocaleString("es-MX", {weekday: "long", year: "numeric", month: "long", day: "numeric"}); // formatea la fecha en formato legible
    historial.appendChild(fechaElemento);
     entradaTexto.value = ''; /* se agrega este string vacio para limpiar la entrada despues de guarar la entrada */
});

function cargarEntradas() {
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.forEach(function(entrada) {
        const parrafo = document.createElement('p');
        parrafo.textContent = entrada.texto;
        const fechaElemento = document.createElement('small');
        const fecha = new Date(entrada.fecha);
        fechaElemento.textContent = fecha.toLocaleString("es-MX", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        historial.appendChild(parrafo);
        historial.appendChild(fechaElemento);
    });
}
cargarEntradas();


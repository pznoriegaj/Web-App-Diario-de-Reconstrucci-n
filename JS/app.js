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
     entradaTexto.value = ''; /* se agrega este string vacio para limpiar la entrada despues de guarar la entrada */
});
  entradaTexto.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey) { // se agrega un evento para que al presionar enter se guarde la entrada
        evento.preventDefault(); // se previene el comportamiento por defecto de la tecla enter
        botonGuardar.click(); // se simula un click en el boton guardar para guardar la entrada
        historial.innerHTML = ''; // se limpia el historial para volver a cargar las entradas actualizadas
        cargarEntradas(); // se vuelve a cargar las entradas para reflejar los cambios
    }
});

function cargarEntradas() {
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    entradas.forEach(function(entrada, indice) {
        const parrafo = document.createElement('p');
        parrafo.textContent = entrada.texto;
        const fechaElemento = document.createElement('small');
        const fecha = new Date(entrada.fecha);
        fechaElemento.textContent = fecha.toLocaleString("es-MX", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        const botonEliminar = document.createElement('button'); // se crea un boton para eliminar las entradas del historial
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click',() => { // se agrega un evento click al boton eliminar
            entradas.splice(indice, 1); // se elimina la entrada del arreglo de entradas
            localStorage.setItem('entradas', JSON.stringify(entradas)); // se actualiza el local storage con la nueva lista de entradas
            historial.innerHTML = ''; // se limpia el historial para volver a cargar las entradas actualizadas
            cargarEntradas(); // se vuelve a cargar las entradas para reflejar los cambios
        });
        historial.appendChild(parrafo);
        historial.appendChild(fechaElemento);
        historial.appendChild(botonEliminar);// se agrega boton al historial para eliminar la entrada
    });
}
cargarEntradas();


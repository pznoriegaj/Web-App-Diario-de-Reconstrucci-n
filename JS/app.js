const botonGuardar = document.getElementById('btn-guardar');
const entradaTexto = document.getElementById('entrada-texto');
const historial = document.getElementById('historial');
const seccionDiario = document.getElementById('seccion-diario');
const seccionDashboard = document.getElementById('seccion-dashboard');
const seccionRetos = document.getElementById('seccion-retos');
const btnDiario = document.getElementById('btn-diario');
const btnDashboard = document.getElementById('btn-dashboard');
const btnRetos = document.getElementById('btn-retos');
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

    function mostrarSeccion(seccion) {
        seccionDiario.style.display = 'none';
        seccionDashboard.style.display = 'none';
        seccionRetos.style.display = 'none';
        seccion.style.display = 'block';
    }

btnDiario.addEventListener('click', () => {
    mostrarSeccion(seccionDiario);
});

btnDashboard.addEventListener('click', () => {
    mostrarSeccion(seccionDashboard);
});

btnRetos.addEventListener('click', () => {
    mostrarSeccion(seccionRetos);
});

function cargarEntradas() {
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
     const grupos = {}
    entradas.forEach(function(entrada, indice) {
        const fecha = new Date();
     const clave = fecha.toLocaleDateString("es-MX",  {month: "long", year: "numeric"}); // se obtiene la fecha en formato de cadena para agrupar las entradas por fecha
        if (!grupos[clave]) { // se verifica si el grupo ya existe
            grupos[clave] = []; // si no existe se crea un arreglo vacio para el grupo
        }
        grupos[clave].push(entrada); // se agrega la entrada al grupo correspondiente
        
    });
    Object.keys(grupos).forEach(function(mes) {
        const titulo = document.createElement("h2");
        titulo.textContent = mes;
        historial.appendChild(titulo);

        grupos[mes].forEach(function(entrada) {
         const parrafo = document.createElement('p');
        parrafo.textContent = entrada.texto;
        const fechaElemento = document.createElement('small');
        const fecha = new Date(entrada.fecha);
        const clave = fecha.toLocaleDateString("es-MX",  {month: "long", year: "numeric"}); // se obtiene la fecha en formato de cadena para agrupar las entradas por fecha
         fechaElemento.textContent = fecha.toLocaleString("es-MX", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        const botonEliminar = document.createElement('button'); // se crea un boton para eliminar las entradas del historial
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn-eliminar'); // se agrega una clase al boton para darle estilo
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
    });
    const publicacionesEjemplo =  [
        {
            usuario: 'jesus_noriega',
            fecha: '16/07/2026',
            tipo: 'texto',
            contenido: 'Hola esta es una prueba generica'
        },
        {
            usuario: 'jesus_noriega',
            fecha: '16/07/2026',
            tipo: 'foto',
            contenido: 'https://images.unsplash.com/photo-1682685796530-1e3f5c7b8d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        },
        {
            usuario: 'jesus_noriega',
            fecha: '16/07/2026',
            tipo: 'video',
            contenido: 'https://www.youtube.com/watch?v=5qap5aO4i9A'
        }
    ];

    function cargarPublicaciones() {
        publicacionesEjemplo.forEach(function(publicacion) {
            const li = document.createElement('li');
            const usuario = document.createElement('strong');
            usuario.textContent = publicacion.usuario;
            // Lógica para cargar cada publicación
        });
    }
}
cargarEntradas();


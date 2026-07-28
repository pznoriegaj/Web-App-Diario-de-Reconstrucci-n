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
    listaEntradas.push({
        id: Date.now() + Math.random(),
        texto: texto,
        fecha: new Date().toISOString()
    });

    localStorage.setItem('entradas', JSON.stringify(listaEntradas));
    entradaTexto.value = '';
    historial.innerHTML = '';
    cargarEntradas();
});

if (botonGuardar) {
    botonGuardar.addEventListener('click', guardarEntrada);
}

if (entradaTexto) {
    entradaTexto.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' && !evento.shiftKey) {
            evento.preventDefault();
            guardarEntrada();
        }
    });
}

    function mostrarSeccion(seccion) {
        seccionDiario.style.display = 'none';
        seccionDashboard.style.display = 'none';
        seccionRetos.style.display = 'none';
        seccion.style.display = 'block';
    }

if (btnDiario) {
    btnDiario.addEventListener('click', () => {
        mostrarSeccion(seccionDiario);
    });
}

if (btnDashboard) {
    btnDashboard.addEventListener('click', () => {
        mostrarSeccion(seccionDashboard);
    });
}

if (btnRetos) {
    btnRetos.addEventListener('click', () => {
        mostrarSeccion(seccionRetos);
    });
}

function cargarEntradas() {
    if (!historial) return;

    historial.innerHTML = ''; /*se agrega historial.innerHTML = '' para poder tener una lista actualizada y mas limpia, se debe de usar este método para limpiar el contenido antes de agregar los nuevos elementos */
    const entradas = JSON.parse(localStorage.getItem('entradas')) || [];
    const grupos = {};

    entradas.forEach(function(entrada) {
        const fecha = new Date(entrada.fecha);
        const clave = fecha.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });

        if (!grupos[clave]) {
            grupos[clave] = [];
        }

        grupos[clave].push(entrada);
    });

    Object.keys(grupos).forEach(function(mes) {
        const titulo = document.createElement('h2');
        titulo.textContent = mes;
        historial.appendChild(titulo);

    grupos[mes].forEach(function(entrada) {
            const parrafo = document.createElement('p');
            parrafo.textContent = entrada.texto;

            const fechaElemento = document.createElement('small');
            const fecha = new Date(entrada.fecha);
            fechaElemento.textContent = fecha.toLocaleString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.addEventListener('click', () => {
                const entradasActualizadas = JSON.parse(localStorage.getItem('entradas')) || [];
                const nuevasEntradas = entradasActualizadas.filter((item) => item.id !== entrada.id);
                localStorage.setItem('entradas', JSON.stringify(nuevasEntradas));
                historial.innerHTML = '';
                cargarEntradas();
            });

            historial.appendChild(parrafo);
            historial.appendChild(fechaElemento);
            historial.appendChild(botonEliminar);
        });
    });
}
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
            li.appendChild(usuario);
            // Lógica para cargar cada publicación
            const fecha = document.createElement('time'); /* se crea un elemento time para mostrar la fecha de la publicacion */
            fecha.textContent = publicacion.fecha;
            li.appendChild(fecha);
        if (publicacion.tipo === 'texto') {
            const contenido = document.createElement('p'); /* se crea un elemento p para mostrar el contenido de la publicacion */  
            contenido.textContent = publicacion.contenido;
            li.appendChild(contenido);
        } else if (publicacion.tipo === 'foto') { 
            const imagen = document.createElement('img'); /* se crea un elemento img para mostrar la imagen de la publicacion */
            imagen.src = publicacion.contenido;
            li.appendChild(imagen);
        } else if (publicacion.tipo === 'video') {
            const video = document.createElement('iframe'); /* se crea un elemento iframe para mostrar el video de la publicacion */
            video.src = publicacion.contenido;
            li.appendChild(video);
        }

        document.getElementById('retos-didacticos').appendChild(li);
     });
}
cargarEntradas();

const botonGuardar = document.getElementById('btn-guardar');
const entradaTexto = document.getElementById('entrada-texto');
botonGuardar.addEventListener('click', () => {
    const texto = entradaTexto.value;
    console.log(texto);
    localStorage.setItem('entradas', texto);
});
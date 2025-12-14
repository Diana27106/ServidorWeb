// 1. Obtener referencias a los elementos del DOM
const formulario = document.getElementById('formularioPelicula');
const inputPelicula = document.getElementById('nombrePelicula');
const listaPeliculas = document.getElementById('listaPeliculas');

// 2. Función que se ejecuta cuando se envía el formulario
formulario.addEventListener('submit', function (e) {
    // Evitar que la página se recargue (comportamiento por defecto del formulario)
    e.preventDefault();

    // Obtener el valor del input y limpiarlo de espacios extra
    const nombre = inputPelicula.value.trim();

    // Verificar que el campo no esté vacío
    if (nombre !== "") {
        agregarPelicula(nombre);

        // Limpiar el input después de agregar la película
        inputPelicula.value = '';
    }
});

// 3. Función para crear el elemento de la lista y añadirlo al DOM
function agregarPelicula(nombre) {
    // Crear el nuevo elemento de lista <li>
    const nuevoElementoLista = document.createElement('li');

    // Asignar el contenido: el nombre de la película
    nuevoElementoLista.innerHTML = `
        <span>${nombre}</span>
        <button class="btn-eliminar">❌</button>
    `;

    // Añadir el listener al botón de eliminar
    const botonEliminar = nuevoElementoLista.querySelector('.btn-eliminar');
    botonEliminar.addEventListener('click', function () {
        // Eliminar el elemento padre (el <li> completo)
        nuevoElementoLista.remove();
    });

    // Añadir el nuevo elemento a la lista desordenada (<ul>) en el DOM
    listaPeliculas.appendChild(nuevoElementoLista);
}

// Opcional: Agregar algunas películas de ejemplo al cargar la página
agregarPelicula("Pulp Fiction");
agregarPelicula("Matrix");
agregarPelicula("Parásitos");
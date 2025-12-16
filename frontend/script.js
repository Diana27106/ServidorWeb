const formulario = document.getElementById('formularioPelicula');
const inputPelicula = document.getElementById('nombrePelicula');
const listaPeliculas = document.getElementById('listaPeliculas');
const trendingGrid = document.getElementById('trendingMovies');

// 1. Datos de películas del año (Simulado)
const topMovies = [
    { titulo: "Dune: Part Two", año: 2024 },
    { titulo: "Furiosa", año: 2024 },
    { titulo: "Deadpool & Wolverine", año: 2024 },
    { titulo: "Joker: Folie à Deux", año: 2024 }
];

// 2. Renderizar sugerencias
function cargarTendencias() {
    topMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div>${movie.titulo}</div>
            <small style="color: #00f2ff">${movie.año}</small>
        `;
        card.onclick = () => agregarPelicula(movie.titulo);
        trendingGrid.appendChild(card);
    });
}

// 3. Manejar Formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputPelicula.value.trim();
    if (nombre) {
        agregarPelicula(nombre);
        inputPelicula.value = '';
    }
});

// 4. Agregar a la lista con animación
function agregarPelicula(nombre) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${nombre}</span>
        <button class="btn-eliminar" onclick="eliminar(this)">DELETE</button>
    `;
    listaPeliculas.prepend(li); // Añade al principio
}

function eliminar(btn) {
    const item = btn.parentElement;
    item.style.animation = "slideIn 0.3s ease-in reverse forwards";
    setTimeout(() => item.remove(), 300);
}

// Inicializar
cargarTendencias();
// JAVASCRIPT
// Seleccionar los botones y los elementos de la lista del slider
let items = document.querySelectorAll('.slider1 .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

// Media query para detectar pantallas menores a 768px
const mediaQuery = window.matchMedia("(max-width: 768px)");

// Función para habilitar o deshabilitar las animaciones
function toggleAnimations(e) {
    if (e.matches) {
        // Pantalla <= 768px: Desactiva animaciones y estilos
        resetStyles();
        next.style.display = 'none';
        prev.style.display = 'none';
    } else {
        // Pantalla > 768px: Activa animaciones y estilos
        next.style.display = 'block';
        prev.style.display = 'block';
        loadShow(); // Carga las animaciones iniciales
    }
}

// Función para reiniciar los estilos de los elementos
function resetStyles() {
    items.forEach(item => {
        item.style.transform = '';
        item.style.zIndex = '';
        item.style.filter = '';
        item.style.opacity = '';
    });
}

// Lógica del slider
let active = 1;

function loadShow() {
    if (mediaQuery.matches) return; // Salir si la pantalla es <= 768px

    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    for (let i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${180 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}

// Navegación del slider
next.onclick = function () {
    if (mediaQuery.matches) return; // Salir si la pantalla es <= 768px
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
};

prev.onclick = function () {
    if (mediaQuery.matches) return; // Salir si la pantalla es <= 768px
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
};

// Escuchar los cambios en la media query
mediaQuery.addEventListener('change', toggleAnimations);

// Ejecutar la función al cargar la página
toggleAnimations(mediaQuery);
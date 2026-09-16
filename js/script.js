function loadComponent(id, path) {
  fetch(path)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

function abrirModalServicio(claveServicio) {
    const servicio = datosServicios[claveServicio];
    if (!servicio) return;

    const modalTitulo = document.getElementById('modalServicioTitulo');
    const modalDescripcion = document.getElementById('modalServicioDescripcion');
    const modalElemento = document.getElementById('modalServicio');

    if (modalTitulo && modalDescripcion && modalElemento) {
        const icono = (typeof iconosServicios !== 'undefined' && iconosServicios[claveServicio]) ? iconosServicios[claveServicio] : '🛎️';
        modalTitulo.textContent = `${icono} ${servicio.t}`;
        modalDescripcion.textContent = servicio.d;
        const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);
        modal.show();
    }
}

function obtenerResumen(texto, maxPalabras = 14) {
    if (!texto) return '';
    const palabras = texto.trim().split(/\s+/);
    if (palabras.length <= maxPalabras) return texto;
    return palabras.slice(0, maxPalabras).join(' ') + '...';
}

function cargarCatalogo() {
    const titulo = document.getElementById('categoria-titulo');
    const descripcion = document.getElementById('categoria-descripcion');
    const lista = document.getElementById('servicios-lista');

    // La presencia de estos elementos indica que se está visualizando catalogo.html.
    if (!titulo || !descripcion || !lista) return;

    if (typeof categoriasServicios === 'undefined') return;

    const claveCategoria = new URLSearchParams(window.location.search).get('categoria');
    const categoria = categoriasServicios[claveCategoria];

    if (!categoria) {
        titulo.textContent = 'Categoría no encontrada';
        descripcion.textContent = 'Selecciona una categoría desde el catálogo principal.';
        return;
    }

    document.title = `${categoria.titulo} | Catálogo TI`;
    titulo.textContent = categoria.titulo;
    descripcion.textContent = categoria.descripcion;

    if (typeof datosServicios === 'undefined') return;

    categoria.servicios.forEach(claveServicio => {
        const servicio = datosServicios[claveServicio];
        if (!servicio) return;

        // 4 cards por fila en desktop (col-lg-3), 2 en tablet (col-md-6), 1 en móvil (col-12)
        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-3 d-flex';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card card-border-primary text-mach-primary card-servicio-catalogo w-100 shadow-sm';
        tarjeta.style.cursor = 'pointer';
        tarjeta.setAttribute('role', 'button');
        tarjeta.setAttribute('tabindex', '0');

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body d-flex flex-column';

        const encabezado = document.createElement('div');
        encabezado.className = 'd-flex align-items-center gap-2 mb-2';

        const icono = document.createElement('span');
        icono.className = 'fs-3';
        icono.textContent = (typeof iconosServicios !== 'undefined' && iconosServicios[claveServicio]) ? iconosServicios[claveServicio] : '🛎️';

        const nombre = document.createElement('h5');
        nombre.className = 'card-title fw-bold m-0';
        nombre.textContent = servicio.t;

        encabezado.append(icono, nombre);

        const detalle = document.createElement('p');
        detalle.className = 'card-text text-secondary mt-2 flex-grow-1';
        detalle.textContent = obtenerResumen(servicio.d);

        const pieCard = document.createElement('div');
        pieCard.className = 'mt-3 text-end';
        const verMas = document.createElement('span');
        verMas.className = 'btn btn-sm btn-outline-primary';
        verMas.textContent = 'Ver detalle';
        pieCard.appendChild(verMas);

        cuerpo.append(encabezado, detalle, pieCard);
        tarjeta.appendChild(cuerpo);

        // Abrir modal al clickear o presionar Enter
        tarjeta.addEventListener('click', () => abrirModalServicio(claveServicio));
        tarjeta.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirModalServicio(claveServicio);
            }
        });

        columna.appendChild(tarjeta);
        lista.appendChild(columna);
    });
}

function cambiarInfo(clave) {
    // 1. Actualizar el contenido de texto
    const titulo = document.getElementById('info-titulo');
    const texto = document.getElementById('info-texto');
    
    if (titulo && texto && datosServicios[clave]) {
        titulo.innerText = datosServicios[clave].t;
        texto.innerText = datosServicios[clave].d;
    }

    // 2. Gestionar el estado "activo" de los botones
    
    // a. Buscar todos los botones de servicio
    const botones = document.querySelectorAll('.btn-servicio');
    
    // b. Quitar la clase 'activo' de TODOS los botones
    botones.forEach(boton => {
        boton.classList.remove('activo');
    });
    
    // c. Añadir la clase 'activo' solo al botón que se pulsó
    // Usamos event.currentTarget para referirnos al botón que disparó el evento
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('activo');
    }
}

loadComponent('header-placeholder', 'header.html');
loadComponent('footer-placeholder', 'footer.html');

cargarCatalogo();

configurarFavicon();

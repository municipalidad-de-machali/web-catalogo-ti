function loadComponent(id, path) {
    const el = document.getElementById(id);
    if (!el) return;
    fetch(path)
        .then(response => response.text())
        .then(data => {
            el.innerHTML = data;
        })
        .catch(err => console.error(`Error al cargar componente ${path}:`, err));
}

function normalizarTexto(texto) {
    if (!texto) return '';
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

function obtenerResumen(texto, maxPalabras = 14) {
    if (!texto) return '';
    const palabras = texto.trim().split(/\s+/);
    if (palabras.length <= maxPalabras) return texto;
    return palabras.slice(0, maxPalabras).join(' ') + '...';
}

function obtenerCategoriaDeServicio(claveServicio) {
    if (typeof categoriasServicios === 'undefined') return null;
    for (const [claveCat, cat] of Object.entries(categoriasServicios)) {
        if (cat.servicios && cat.servicios.includes(claveServicio)) {
            return { clave: claveCat, ...cat };
        }
    }
    return null;
}

function abrirModalServicio(claveServicio) {
    if (typeof datosServicios === 'undefined') return;
    const servicio = datosServicios[claveServicio];
    if (!servicio) return;

    const modalTitulo = document.getElementById('modalServicioTitulo');
    const modalIcono = document.getElementById('modalServicioIcono');
    const modalDescripcion = document.getElementById('modalServicioDescripcion');
    const modalCategoria = document.getElementById('modalServicioCategoria');
    const modalHeader = document.getElementById('modalServicioHeader');
    const modalElemento = document.getElementById('modalServicio');

    if (!modalElemento) return;

    const icono = (typeof iconosServicios !== 'undefined' && iconosServicios[claveServicio])
        ? iconosServicios[claveServicio]
        : '🛎️';

    if (modalTitulo) modalTitulo.textContent = servicio.t;
    if (modalIcono) modalIcono.textContent = icono;
    if (modalDescripcion) modalDescripcion.textContent = servicio.d;

    const categoria = obtenerCategoriaDeServicio(claveServicio);
    if (modalCategoria && categoria) {
        modalCategoria.textContent = `${categoria.icono || '🏷️'} ${categoria.titulo}`;
        modalCategoria.style.backgroundColor = categoria.colorClaro || '#e0f2fe';
        modalCategoria.style.color = categoria.color || '#008aad';
        modalCategoria.style.border = `1px solid ${categoria.color || '#008aad'}40`;
    }

    if (modalHeader && categoria) {
        modalHeader.style.backgroundColor = categoria.color || '#008aad';
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);
    modal.show();
}

// Catálogo por categoría (para catalogo.html)
function cargarCatalogo() {
    const titulo = document.getElementById('categoria-titulo');
    const descripcion = document.getElementById('categoria-descripcion');
    const lista = document.getElementById('servicios-lista');

    if (!titulo || !descripcion || !lista) return;
    if (typeof categoriasServicios === 'undefined' || typeof datosServicios === 'undefined') return;

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

    categoria.servicios.forEach(claveServicio => {
        const servicio = datosServicios[claveServicio];
        if (!servicio) return;

        const columna = document.createElement('div');
        columna.className = 'col-12 col-md-6 col-lg-3 d-flex';

        const icono = (typeof iconosServicios !== 'undefined' && iconosServicios[claveServicio])
            ? iconosServicios[claveServicio]
            : (categoria.icono || '🛎️');

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card card-servicio-catalogo shadow-sm';
        tarjeta.style.borderTop = `4px solid ${categoria.color || '#008aad'}`;
        tarjeta.style.cursor = 'pointer';
        tarjeta.setAttribute('role', 'button');
        tarjeta.setAttribute('tabindex', '0');

        tarjeta.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="fs-3">${icono}</span>
                    <span class="badge rounded-pill" style="background-color: ${categoria.colorClaro || '#e0f2fe'}; color: ${categoria.color || '#008aad'}; border: 1px solid ${categoria.color || '#008aad'}40;">
                        ${categoria.icono || ''} ${categoria.titulo}
                    </span>
                </div>
                <h5 class="service-card-title">${servicio.t}</h5>
                <p class="service-card-desc">${obtenerResumen(servicio.d)}</p>
                <div class="service-card-footer">
                    <button type="button" class="btn btn-sm w-100 btn-ver-detalle" style="--cat-color: ${categoria.color || '#008aad'};">
                        Ver detalle
                    </button>
                </div>
            </div>
        `;

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

// Catálogo completo unificado con buscador y categorías (para index.html)
function cargarCatalogoCompleto() {
    const contenedor = document.getElementById('catalogo-completo');
    if (!contenedor) return;
    if (typeof categoriasServicios === 'undefined' || typeof datosServicios === 'undefined') return;

    contenedor.innerHTML = '';

    const inputBuscador = document.getElementById('buscador-servicios');
    const btnLimpiar = document.getElementById('btn-limpiar-busqueda');
    const contadorResultados = document.getElementById('contador-resultados');
    const sinResultados = document.getElementById('sin-resultados');
    const contenedorPills = document.getElementById('filtros-categoria');

    let categoriaFiltroActiva = 'todas';
    let totalServiciosGeneral = 0;

    // Obtener categorías ordenadas alfabéticamente por título
    const categoriasOrdenadas = Object.entries(categoriasServicios).sort(([, a], [, b]) => 
        a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' })
    );

    // Generar pills de filtro por categoría
    if (contenedorPills) {
        contenedorPills.innerHTML = '';
        const pillTodas = document.createElement('button');
        pillTodas.type = 'button';
        pillTodas.className = 'btn-cat-pill active';
        pillTodas.dataset.categoria = 'todas';
        pillTodas.textContent = '🌟 Todos los servicios';
        contenedorPills.appendChild(pillTodas);

        categoriasOrdenadas.forEach(([claveCat, cat]) => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'btn-cat-pill';
            pill.dataset.categoria = claveCat;
            pill.innerHTML = `<span>${cat.icono || '📁'}</span> ${cat.titulo}`;
            contenedorPills.appendChild(pill);
        });
    }

    // Renderizar cada sección de categoría y sus tarjetas de servicio
    categoriasOrdenadas.forEach(([claveCat, cat]) => {
        const seccion = document.createElement('section');
        seccion.className = 'categoria-seccion';
        seccion.id = `cat-${claveCat}`;
        seccion.dataset.categoriaClave = claveCat;

        // Encabezado de la categoría
        const header = document.createElement('div');
        header.className = 'categoria-header';
        header.innerHTML = `
            <div class="categoria-icono-circulo" style="background-color: ${cat.color || '#008aad'}; color: #ffffff;">
                ${cat.icono || '📁'}
            </div>
            <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <h3 class="fw-bold m-0" style="color: ${cat.color || '#008aad'}; font-size: 1.5rem;">${cat.titulo}</h3>
                    <span class="badge rounded-pill" style="background-color: ${cat.colorClaro || '#e0f2fe'}; color: ${cat.color || '#008aad'}; border: 1px solid ${cat.color || '#008aad'}40; font-size: 0.8rem;">
                        ${cat.servicios.length} servicios
                    </span>
                </div>
                <p class="text-secondary small m-0 mt-1">${cat.descripcion}</p>
            </div>
        `;
        seccion.appendChild(header);

        // Fila de tarjetas de servicio
        const row = document.createElement('div');
        row.className = 'row g-4';

        cat.servicios.forEach(claveServicio => {
            const servicio = datosServicios[claveServicio];
            if (!servicio) return;

            totalServiciosGeneral++;

            const columna = document.createElement('div');
            columna.className = 'col-12 col-md-6 col-lg-3 d-flex servicio-columna';
            columna.dataset.categoria = claveCat;
            columna.dataset.clave = claveServicio;
            columna.dataset.search = normalizarTexto(`${servicio.t} ${servicio.d} ${cat.titulo} ${cat.descripcion}`);

            const icono = (typeof iconosServicios !== 'undefined' && iconosServicios[claveServicio])
                ? iconosServicios[claveServicio]
                : (cat.icono || '🛎️');

            const tarjeta = document.createElement('article');
            tarjeta.className = 'card card-servicio-catalogo shadow-sm';
            tarjeta.style.borderTop = `4px solid ${cat.color || '#008aad'}`;
            tarjeta.style.cursor = 'pointer';
            tarjeta.setAttribute('role', 'button');
            tarjeta.setAttribute('tabindex', '0');

            tarjeta.innerHTML = `
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="fs-3" aria-hidden="true">${icono}</span>
                        <span class="badge rounded-pill" style="background-color: ${cat.colorClaro || '#e0f2fe'}; color: ${cat.color || '#008aad'}; border: 1px solid ${cat.color || '#008aad'}30; font-size: 0.72rem;">
                            ${cat.icono || ''} ${cat.titulo}
                        </span>
                    </div>
                    <h5 class="service-card-title">${servicio.t}</h5>
                    <p class="service-card-desc">${obtenerResumen(servicio.d)}</p>
                    <div class="service-card-footer">
                        <button type="button" class="btn btn-sm w-100 btn-ver-detalle" style="--cat-color: ${cat.color || '#008aad'};">
                            Ver detalle
                        </button>
                    </div>
                </div>
            `;

            tarjeta.addEventListener('click', () => abrirModalServicio(claveServicio));
            tarjeta.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    abrirModalServicio(claveServicio);
                }
            });

            columna.appendChild(tarjeta);
            row.appendChild(columna);
        });

        seccion.appendChild(row);
        contenedor.appendChild(seccion);
    });

    // Lógica del filtro y buscador
    function filtrarCatalogo() {
        const query = inputBuscador ? normalizarTexto(inputBuscador.value) : '';
        let serviciosVisibles = 0;

        if (btnLimpiar) {
            if (query.length > 0) {
                btnLimpiar.classList.remove('d-none');
            } else {
                btnLimpiar.classList.add('d-none');
            }
        }

        const secciones = contenedor.querySelectorAll('.categoria-seccion');

        secciones.forEach(seccion => {
            const claveCat = seccion.dataset.categoriaClave;
            const coincideCategoriaPill = (categoriaFiltroActiva === 'todas' || categoriaFiltroActiva === claveCat);

            const columnas = seccion.querySelectorAll('.servicio-columna');
            let visiblesEnSeccion = 0;

            columnas.forEach(col => {
                const searchText = col.dataset.search || '';
                const coincideTexto = (query === '' || searchText.includes(query));

                if (coincideCategoriaPill && coincideTexto) {
                    col.classList.remove('d-none');
                    visiblesEnSeccion++;
                    serviciosVisibles++;
                } else {
                    col.classList.add('d-none');
                }
            });

            if (visiblesEnSeccion > 0) {
                seccion.classList.remove('d-none');
            } else {
                seccion.classList.add('d-none');
            }
        });

        // Actualizar contador y mensaje sin resultados
        if (contadorResultados) {
            if (query !== '' || categoriaFiltroActiva !== 'todas') {
                contadorResultados.classList.remove('d-none');
                contadorResultados.textContent = `Mostrando ${serviciosVisibles} de ${totalServiciosGeneral} servicios disponibles`;
            } else {
                contadorResultados.classList.add('d-none');
            }
        }

        if (sinResultados) {
            if (serviciosVisibles === 0) {
                sinResultados.classList.remove('d-none');
            } else {
                sinResultados.classList.add('d-none');
            }
        }
    }

    // Eventos del buscador
    if (inputBuscador) {
        inputBuscador.addEventListener('input', filtrarCatalogo);
    }

    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', () => {
            if (inputBuscador) {
                inputBuscador.value = '';
                inputBuscador.focus();
            }
            filtrarCatalogo();
        });
    }

    const btnRestablecer = document.getElementById('btn-restablecer-busqueda');
    if (btnRestablecer) {
        btnRestablecer.addEventListener('click', () => {
            if (inputBuscador) inputBuscador.value = '';
            categoriaFiltroActiva = 'todas';
            if (contenedorPills) {
                contenedorPills.querySelectorAll('.btn-cat-pill').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.categoria === 'todas');
                });
            }
            filtrarCatalogo();
        });
    }

    // Eventos de pills de categoría
    if (contenedorPills) {
        contenedorPills.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-cat-pill');
            if (!btn) return;

            contenedorPills.querySelectorAll('.btn-cat-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            categoriaFiltroActiva = btn.dataset.categoria || 'todas';
            filtrarCatalogo();

            // Si es un filtro específico y no hay texto buscado, hacer scroll a la categoría
            if (categoriaFiltroActiva !== 'todas' && (!inputBuscador || inputBuscador.value.trim() === '')) {
                const targetSec = document.getElementById(`cat-${categoriaFiltroActiva}`);
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }
}

// Configuración de favicon
const configurarFavicon = () => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = 'img/color_transparente.png';
};

// Inicialización de componentes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    cargarCatalogo();
    cargarCatalogoCompleto();
    configurarFavicon();
});

// Respaldo de ejecución inmediata si DOMContentLoaded ya ocurrió
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    cargarCatalogo();
    cargarCatalogoCompleto();
    configurarFavicon();
}

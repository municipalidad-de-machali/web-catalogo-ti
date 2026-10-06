
/**
 * Loads an external HTML component asynchronously into a specified container.
 * @param {string} containerId - The ID of the container element.
 * @param {string} componentUrl - The relative URL of the component HTML file.
 */
function loadComponent(containerId, componentUrl) {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(componentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${componentUrl}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error(`Error loading component from ${componentUrl}:`, error);
        });
}

function setFavicon() {
    let faviconLink = document.querySelector("link[rel~='icon']");
    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/png';
        document.head.appendChild(faviconLink);
    }
    faviconLink.href = 'img/color_transparente.png';
}

/* @param {string} text - The input string.
 * @returns {string} - The normalized string.*/
function normalizeText(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

/* @param {HTMLElement} cardElement - The clicked service card element. */
function openServiceModal(cardElement) {
    const title = cardElement.dataset.serviceTitle || '';
    const icon = cardElement.dataset.serviceIcon || '🛎️';
    const category = cardElement.dataset.serviceCategory || '';
    const categoryColor = cardElement.dataset.serviceCategoryColor || '#008aad';
    const categoryBg = cardElement.dataset.serviceCategoryBg || '#e0f2fe';
    const description = cardElement.dataset.serviceDescription || '';

    const modalTitle = document.getElementById('serviceModalTitle');
    const modalIcon = document.getElementById('serviceModalIcon');
    const modalCategory = document.getElementById('serviceModalCategory');
    const modalDescription = document.getElementById('serviceModalDescription');
    const modalHeader = document.getElementById('serviceModalHeader');
    const modalElement = document.getElementById('serviceModal');

    if (!modalElement) return;

    if (modalTitle) modalTitle.textContent = title;
    if (modalIcon) modalIcon.textContent = icon;
    if (modalDescription) modalDescription.textContent = description;

    if (modalCategory) {
        modalCategory.textContent = category;
        modalCategory.style.backgroundColor = categoryBg;
        modalCategory.style.color = categoryColor;
        modalCategory.style.border = `1px solid ${categoryColor}40`;
    }

    if (modalHeader) {
        modalHeader.style.backgroundColor = categoryColor;
    }

    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
    modalInstance.show();
}

function initCatalog() {
    const searchInput = document.getElementById('service-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const resetSearchBtn = document.getElementById('reset-search-btn');
    const categoryFilters = document.getElementById('category-filters');
    const resultsCount = document.getElementById('results-count');
    const noResultsMessage = document.getElementById('no-results');
    const catalogContainer = document.getElementById('catalogo-completo');

    if (!catalogContainer) return;

    let activeCategory = 'all';
    const serviceColumns = Array.from(document.querySelectorAll('.service-column'));
    const categorySections = Array.from(document.querySelectorAll('.categoria-seccion'));
    const totalServices = serviceColumns.length;
    
    /**
     * Filters service cards and category sections based on search query and active category pill.
     */
    function filterCatalog() {
        const query = searchInput ? normalizeText(searchInput.value) : '';

        if (clearSearchBtn) {
            clearSearchBtn.classList.toggle('d-none', query.length === 0);
        }

        let visibleCount = 0;

        categorySections.forEach(section => {
            const sectionCategory = section.dataset.category;
            const columnsInSection = section.querySelectorAll('.service-column');
            let visibleInSection = 0;

            columnsInSection.forEach(column => {
                const matchesCategory = (activeCategory === 'all' || activeCategory === sectionCategory);
                const searchText = column.dataset.search || '';
                const matchesQuery = (query === '' || searchText.includes(query));

                if (matchesCategory && matchesQuery) {
                    column.classList.remove('d-none');
                    visibleInSection++;
                    visibleCount++;
                } else {
                    column.classList.add('d-none');
                }
            });

            section.classList.toggle('d-none', visibleInSection === 0);
        });

        if (resultsCount) {
            if (query !== '' || activeCategory !== 'all') {
                resultsCount.classList.remove('d-none');
                resultsCount.textContent = `Mostrando ${visibleCount} de ${totalServices} servicios disponibles`;
            } else {
                resultsCount.classList.add('d-none');
            }
        }

        if (noResultsMessage) {
            noResultsMessage.classList.toggle('d-none', visibleCount > 0);
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterCatalog);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
            }
            filterCatalog();
        });
    }

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            activeCategory = 'all';
            if (categoryFilters) {
                categoryFilters.querySelectorAll('.btn-cat-pill').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === 'all');
                });
            }
            filterCatalog();
        });
    }

    if (categoryFilters) {
        categoryFilters.addEventListener('click', (event) => {
            const pillButton = event.target.closest('.btn-cat-pill');
            if (!pillButton) return;

            categoryFilters.querySelectorAll('.btn-cat-pill').forEach(btn => btn.classList.remove('active'));
            pillButton.classList.add('active');

            activeCategory = pillButton.dataset.category || 'all';
            filterCatalog();

            // Smooth scroll to selected category section if not in global search mode
            if (activeCategory !== 'all' && (!searchInput || searchInput.value.trim() === '')) {
                const targetSection = document.getElementById(`cat-${activeCategory}`);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.card-servicio-catalogo');
        if (card) {
            openServiceModal(card);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const card = event.target.closest('.card-servicio-catalogo');
            if (card && document.activeElement === card) {
                event.preventDefault();
                openServiceModal(card);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    setFavicon();
    initCatalog();
});

// Immediate fallback if script loads after DOM is already interactive or complete
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
    setFavicon();
    initCatalog();
}

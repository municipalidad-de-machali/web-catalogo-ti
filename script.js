function loadComponent(id, path) {
  fetch(path)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    });
}

// Llamamos a la función para cargar el header
loadComponent('header-placeholder', 'header.html');

loadComponent('footer-placeholder', 'footer.html');


// Objeto con la información de los servicios
const datosServicios = {
    
    /* INTERNET Y REDES*/
    'red': { t: 'Instalacion y configuracion de equipos de red', d: 'Servicio que consiste en la instalación y posterior configuracion de equipos de red tales como routers y switches en los puestos de trabajo de los funcionarios. El servicio se asegura de mantener a los trabajadores conectados a la red municipal cubriendo todas sus dependencias.' },
    
    'conred': { t: 'Continuidad de conexión', d: 'Servicio enfocado en proveer y mantener la conexión a internet en los puestos de trabajo. Este incluye la configuración de las redes en los equipos, su habilitación mediante puertos físicos, la instalación de routers y la provisión de adaptadores WiFi (USB). Además de abarcar el mantenimiento y soporte del cableado estructurado, como por ejemplo, realizando la instalación o reparación de cables Ethernet dañados para restablecer el servicio.' },
    
    'manred': { t: 'Mantención de equipos y cableado de red', d: 'Servicio encargado de la instalacion y mantencion del cableado en la red municipal, consiste en mantener los puestos de trabajo bajo la red institucional mediante el uso de cables Ethernet, incluye la reparación de los mismos o su elaboracion en casos requeridos. también asegurar conexiones Ethernet y redes Wifi luego de realizarse algun cambio de ubicación por parte de alguna oficina.' },


    /* SERVICIO DE IMPRESION */
    'insimp': { t: 'Instalacion de Impresoras, escaneres y plotters', d: 'Servicio focalizado en garantizar la operatividad de los equipos de impresión, plotters y escáneres a lo largo de la municipalidad. El servicio abarca la instalación de equipos, sus controladores y de entregar orientación a los funcionarios sobre el uso de los mismos.' },
    
    'consimp' : { t: 'Gestión de Consumibles para equipos de Impresión', d: 'Servicio encargado de mantener los equipos de impresion con sus respectivos consumibles operativos y reemplazarlos al momento de terminar su vida util, ademas, se dispone de proveer para los funcionarios con tóneres en los casos donde se dificulte realizar el reemplazo de estos como lo es en DIMAO y la oficina ubicada en Coya.' },
    
    'confimp' : { t: 'Configuración de equipos de Impresión', d: 'Gestion, configuracion y mantenimiento de los equipos de impresion.' },
    
    'mantimp' : { t: 'Mantencion de Impresoras, escaneres y plotters', d: 'Servicio que contempla la resolución de incidentes en el software (equipos no disponibles o sin respuesta) y de hardware, soluciones a los atascos de papel, problemas en la calidad de impresión (defectos en su imagen y falta de color), incluyendo también la mantención básica de plotters.' },
    
    /* TELEFONIA */
    'conftel' : { t: 'Instalacion y configuracion de telefonos IP', d: 'Servicio que se encarga de proveer con telefonos IP a los funcionarios a lo largo del municipio. Abarca la instalación de los dispositivos en los puestos de trabajo y su posterior configuración.'},
    'anxtel' : { t: 'Gestion de anexos telefonicos', d : 'Servicio encargado de disponer con anexos teléfonicos a los funcionarios de la municipalidad siempre que se realize la instalación de un dispositivo nuevo, solicitar un listado de los mismos o pedir un anexo en especifico.'},
    'mantel' : { t: 'Mantencion o continuidad operativa de telefonos IP', d : 'Servicio que comprende el soporte de los dispositivos telefonicos, incluye la revisión y diagnóstico de los dispositivos, así además de la resolución de problemas comunes como lo es el reemplazo de cables, configuración básica o avanzada de los valores en los dispositivos y también la resolución de fallas con la comunicación como problemas de audio.'},
    'codetel' : {t: 'Asignacion de codigos de salida', d: 'Servicio que consiste en asignarle a los funcionarios un codigo de salida para llamadas fuera de la red telefónica municipal siempre que sea solicitado.'},
    
    /* GESTIONAMIENTO DE IDENTIDAD */
    'ad' : { t: 'Creacion de cuentas para usuarios nuevos', d : 'Servicio que se encarga de proveerle a los funcionarios sus respectivas cuentas para los sistemas municipales, tales como la plataforma ERP, generar cuenta dentro de Active Directory Municipal, etc.'},
    'firmail' : { t : 'Administracion de Firmas de Correo Electronico', d : 'Servicio enfocado en proveer de un pie de firma para cada correo institucional dentro de la municipalidad el cual deberá llevar los datos de cada funcionario, incluyendo su nombre y apellido, cargo al que pertenece, dirección a la que pertenezca, edificio en el cual trabaja y su respectivo anexo telefónico en caso de disponer de uno. Ademas de poder realizar correcciones o cambios en caso de que alguna firma presente un error en su información o cuando sea necesario atribuirle dicha firma a un nuevo funcionario.'},
    'firmelec' : { t : 'Gestion de Firma Electronica avanzada', d : 'Servicio encargado de disponer a los funcionarios de una firma electronica la cual sirve para autenticar documentos digitales y firmar acuerdos online con la misma validez legal que una firma manuscrita, pero de forma más rápida, segura y sin papel. Consiste en realizar la instalación de dicha firma en el equipo del funcionario designado. También se encarga de disponer soluciones en caso de que la firma presente alguna falla..'},
    'gestacnta' : { t : 'Gestion de cuentas ante baja de funcionario', d : 'Servicio focalizado en llevar un correcto procedimiento administrativo al momento de solicitar la baja de un usuario, respaldando su correo institucional y suspenderlo posteriormente, eliminar su cuenta de active Directory, suspender su acceso total a la plataforma ERP, entre otras credenciales asociadas.'},
    'gespass' : { t : 'Gestion de contraseñas', d : 'Servicio encargado de suministrar y restablecer las contraseñas perteneciente a los funcionarios municipales, consiste en realizar una solicitud principalmente de parte del director a cargo para restablecer la contraseña de una plataforma o servicio especifico ya sea mediante una llamada telefonica o por ticket.'},
    
    /* CONTINUIDAD OPERACIONAL */
    'manpc' : { t : 'Mantenimiento o reparación de equipos computacionales', d: 'Servicio que se encarga de asegurar el correcto funcionamiento de los equipos informáticos asignados a los funcionarios. Consiste en un diagnóstico de rendimiento en los computadores a la hora de identificar fallas y notificarlas mediante un ticket, así como la reparación de problemas en el hardware si es necesario despues de realizar su diagnostico. También contempla el reemplazo, actualización o instalación de componentes físicos defectuosos u obsoletos, como discos duros, memorias RAM, fuentes de poder y cableado asociado.'},
    'recup' : { t : 'Respaldo y restauracion de Archivos municipales', d: 'Servicio que consiste en el respaldo y restauración de información alojada en los puestos de trabajo. Las labores incluyen la ejecución de respaldos de datos preventivos en las computadoras y la recuperación de archivos específicos del funcionario.'},
    'propc' : { t : 'Proveer e instalar equipos computacionales', d: 'Servicio enfocado en la gestión integral para la entrega de equipamiento informático a los funcionarios. El proceso abarca la preparación y configuración inicial del hardware (computadores de escritorio y laptops), asegurando su correcto funcionamiento en la red corporativa. Asimismo, contempla la carga de aplicaciones básicas institucionales y la instalación de software específico requerido según el perfil y funciones del usuario, culminando con la entrega física y puesta en marcha del equipo en el puesto de trabajo.'},
    'geshar' : { t : 'Gestion general del hardware de Informatica', d: 'Servicio correspondiente a todo el hardware adicional que no sean equipos computacionales, consiste en proveer, prestar o retirar dicho hardware como lo son perifericos, proyectores, adaptadores, etc.'},
    'diagpc' : { t : 'Diagnostico de equipos', d : 'Servicio especializado en la pronta respuesta ante incidentes inoportunos ocurridos en computadores y hardware asociado. Se solicita por medio de un ticket o una llamada telefonica y el proceso consiste en el diagnostico de un equipo computacional, posterior a eso, se realiza la acción de dar solución a la problematica.'},
    'consoft' : { t : 'Continuidad operacional de aplicaciones', d: 'Servicio que se asegura de tener instaladas las aplicaciones esenciales para el funcionario como los son las aplicaciones de Microsoft 365, el navegador predeterminado, la aplicación para el ingreso al ERP, en algunos casos la aplicación de escritorio para Google Drive, etc.'    },

    /* ASESORIA TECNICA */
    'evapc' : { t : 'Evaluacion para baja de activo', d : 'Servicio enfocado a la revisión del equipamiento informático para determinar su vida útil y estado operativo. El procedimiento consiste en diagnosticar exhaustivamente el equipo y, posteriormente, emitir un informe o certificado que acredite formalmente si el hardware se encuentra tecnológicamente obsoleto o presenta daños irreparables. Este documento respalda el proceso administrativo necesario para dar de baja el activo del inventario institucional.'},
    'ases' : { t : 'Asesoria tecnica General',d : 'Servicio que consiste en asesorar u orientar a funcionarios sobre temas relacionados al area de la informática cada vez que se solicite mediante un ticket o por llamada telefonica.'},
    'capa' : { t : 'Capacitaciones para funcionarios municipales', d : 'Servicio encargado de la capacitación para funcionarios sobre temas relacionados al area de la Informática y de acuerdo a lo que se solicite instruir, apoyandose por medio de charlas presenciales y remotas organizadas con Google Meet'},
    'cothdw' : { t : 'Cotizaciones de hardware municipal', d : 'Servicio enfocado a orientar, respaldar y facilitar los procesos de adquisición tecnológica de los distintos departamentos. Consiste en la búsqueda, evaluación y levantamiento de especificaciones técnicas de equipamiento o software, basándose en los requerimientos del área. La búsqueda se ajusta estratégicamente al presupuesto disponible del departamento, considerando márgenes operativos para absorber posibles variaciones de precios en el mercado. El servicio culmina con la entrega de un documento formal que consolida las características técnicas recomendadas e incluye los enlaces de referencia de los proveedores consultados para gestionar la compra.'},
    
    
    /* WORKSPACE */
    'gmail' : { t : 'Administracion de correos institucionales', d : 'Servicio que se entiende por abarcar todos los procesos administrativos relacionados con las cuentas de Google incluyendo todos sus servicios, tales como gestionar las cuentas de Gmail y restablecer contraseñas, entre todas las herramientas que ofrece Google Workspace.'},
    'ggl' : { t : 'Asistencia con servicios de Google Workspace', d : 'Servicio que contempla la asistencia para los funcionarios en los servicios de Google Workspace, tales como las herramientas de ofimatica que y el uso eficiente de herramientas como Forms, Calendar, Meet, Etc.'},
    'drive' : { t : 'Gestion de datos en Google Drive', d: 'servicio especificamente enfocado en asistir con el uso de Google Drive, la organización de directorios usando la aplicación de escritorio y su sincronización.'},
    
    /* SISTEMAS MUNICIPALES */
    '?' : { t : 'Falta', d : 'Falta este item'}

};

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
// --- CONFIGURACIÓN AUTOMÁTICA DEL FAVICON ---
const configurarFavicon = () => {
    // Buscamos si ya existe un favicon para no duplicarlo
    let link = document.querySelector("link[rel~='icon']");
    
    // Si no existe, lo creamos
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    
    // Definimos la ruta del icono
    link.href = 'images/color_transparente.png'; 
    // Opcional: define el tipo si es PNG
    // link.type = 'image/png'; 
};

// Llamamos a la función
configurarFavicon();
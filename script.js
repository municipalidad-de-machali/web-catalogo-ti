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
    
    /* INTERNET */
    'red': { t: 'Instalacion y configuracion de equipos de red', d: 'Servicio que consiste en la instalación y posterior configuracion de equipos de red tales como routers y switches en los puestos de trabajo de los funcionarios. El servicio se asegura de mantener a los trabajadores conectados a la red municipal cubriendo todas sus dependencias.' },
    
    'conred': { t: 'Continuidad de conexión', d: 'Servicio enfocado en proveer y mantener la conexión a internet en los puestos de trabajo. Este incluye la configuración de las redes en los equipos, su habilitación mediante puertos físicos, la instalación de routers y la provisión de adaptadores WiFi (USB). Además de abarcar el mantenimiento y soporte del cableado estructurado, como por ejemplo, realizando la instalación o reparación de cables Ethernet dañados para restablecer el servicio.' },
    
    'manred': { t: 'Mantención de equipos y cableado de red', d: 'Servicio encargado de la instalacion y mantencion del cableado en la red municipal, consiste en mantener los puestos de trabajo bajo la red institucional mediante el uso de cables Ethernet, incluye la reparación de los mismos o su elaboracion en casos requeridos. también asegurar conexiones Ethernet y redes Wifi luego de realizarse algun cambio de ubicación por parte de alguna oficina.' },


    /* SERVICIO DE IMPRESION Y ESCANERES */
    'insimp': { t: 'Instalacion de Impresoras, escaneres y plotters', d: 'Servicio focalizado en garantizar la operatividad de los equipos de impresión, plotters y escáneres a lo largo de la municipalidad. El servicio abarca la instalación de equipos, sus controladores y de entregar orientación a los funcionarios sobre el uso de los mismos.' },
    
    'consimp' : { t: 'Gestión de Consumibles para equipos de Impresión', d: 'Servicio encargado de mantener los equipos de impresion con sus respectivos consumibles operativos y reemplazarlos al momento de terminar su vida util, ademas, se dispone de proveer para los funcionarios con tóneres en los casos donde se dificulte realizar el reemplazo de estos como lo es en DIMAO y la oficina ubicada en Coya.' },
    
    'confimp' : { t: 'Configuración de equipos de Impresión', d: 'Gestion, configuracion y mantenimiento de los equipos de impresion.' },
    
    'mantimp' : { t: 'Mantencion de Impresoras, escaneres y plotters', d: 'Servicio que contempla la resolución de incidentes en el software (equipos no disponibles o sin respuesta) y de hardware, soluciones a los atascos de papel, problemas en la calidad de impresión (defectos en su imagen y falta de color), incluyendo también la mantención básica de plotters.' },
    
    /* TELEFONIA */
    'conftel' : { t: 'Instalacion y configuracion de telefonos', d: 'Servicio que se encarga de proveer con telefonos IP a los funcionarios a lo largo del municipio. Abarca la instalación de los dispositivos en los puestos de trabajo y su posterior configuración.'},
    'anxtel' : { t: 'Gestion de anexos telefonicos', d : 'Servicio encargado de disponer con anexos teléfonicos a los funcionarios de la municipalidad siempre que se realize la instalación de un dispositivo nuevo, solicitar un listado de los mismos o pedir un anexo en especifico.'},
    'mantel' : { t: 'Mantencion o continuidad operativa de telefonos', d : 'Servicio que comprende el soporte de los dispositivos telefonicos, incluye la revisión y diagnóstico de los dispositivos, así además de la resolución de problemas comunes como lo es el reemplazo de cables, configuración básica o avanzada de los valores en los dispositivos y también la resolución de fallas con la comunicación como problemas de audio.'},
    'codetel' : {t: 'Asignacion de codigos de salida', d: 'Servicio que consiste en asignarle a los funcionarios un codigo de salida para llamadas fuera de la red telefónica municipal siempre que sea solicitado.'},
    
    /* GESTIONAMIENTO DE IDENTIDAD */
    'ad' : { t: 'Creacion de cuentas para usuarios nuevos', d : 'Servicio que se encarga de proveerle a los funcionarios sus respectivas cuentas para los sistemas municipales, tales como la plataforma ERP, generar cuenta dentro de Active Directory Municipal, etc.'},
    'firmail' : { t : 'Administracion de Firmas de Correo Electronico', d : 'Servicio enfocado en proveer de un pie de firma para cada correo institucional dentro de la municipalidad el cual deberá llevar los datos de cada funcionario, incluyendo su nombre y apellido, cargo al que pertenece, dirección a la que pertenezca, edificio en el cual trabaja y su respectivo anexo telefónico en caso de disponer de uno. Ademas de poder realizar correcciones o cambios en caso de que alguna firma presente un error en su información o cuando sea necesario atribuirle dicha firma a un nuevo funcionario.'},
    'firmelec' : { t : 'Gestion de Firma Electronica avanzada', d : 'Servicio encargado de disponer a los funcionarios de una firma electronica la cual sirve para autenticar documentos digitales y firmar acuerdos online con la misma validez legal que una firma manuscrita, pero de forma más rápida, segura y sin papel. Consiste en realizar la instalación de dicha firma en el equipo del funcionario designado. También se encarga de disponer soluciones en caso de que la firma presente alguna falla..'},
    'gestacnta' : { t : 'Gestion de cuentas ante baja de funcionario', d : 'Servicio focalizado en llevar un correcto procedimiento administrativo al momento de solicitar la baja de un usuario, respaldando su correo institucional y suspenderlo posteriormente, eliminar su cuenta de active Directory, suspender su acceso total a la plataforma ERP, entre otras credenciales asociadas.'},
    
    /* CONTINUIDAD OPERATIVA */
    'manpc' : { t : 'Mantenimiento o reparación de equipos computacionales', d: 'Servicio que se encarga de asegurar el correcto funcionamiento de los equipos informáticos asignados a los funcionarios. Consiste en un diagnóstico de rendimiento en los computadores a la hora de identificar fallas y notificarlas mediante un ticket, así como la reparación de problemas en el hardware si es necesario despues de realizar su diagnostico. También contempla el reemplazo, actualización o instalación de componentes físicos defectuosos u obsoletos, como discos duros, memorias RAM, fuentes de poder y cableado asociado.'},
    'recup' : { t : 'Respaldo y restauracion de Archivos municipales', d: 'Servicio que consiste en el respaldo y restauración de información alojada en los puestos de trabajo. Las labores incluyen la ejecución de respaldos de datos preventivos en las computadoras y la recuperación de archivos específicos del funcionario.'},
    'inspc' : { t : 'Instalacion de equipo computacionales', d: 'Servicio enfocado en la gestión integral para la entrega de equipamiento informático a los funcionarios. El proceso abarca la preparación y configuración inicial del hardware (computadores de escritorio y laptops), asegurando su correcto funcionamiento en la red corporativa. Asimismo, contempla la carga de aplicaciones básicas institucionales y la instalación de software específico requerido según el perfil y funciones del usuario, culminando con la entrega física y puesta en marcha del equipo en el puesto de trabajo.'},
    
    'gesener' : { t : 'Gestion de Energia', d: 'Gestionamiento de UPS, cambio de cables de alimentacion y de revision de transformadores de los diferentes equipos alojados en las instalaciones municipales.'},
    'intcomp' : { t : 'Instalacion de componentes', d : 'Instalacion y/o cambio de componentes internos de los equipos computacionales.'},
    
    /* ASESORIA TECNICA */
    'eva' : { t : 'Evaluacion para baja de activo', d : 'Evaluacion tecnicas para la baja de activos computacionales.'},
    'cotiz' : { t : 'Asesoria tecnica y Cotizacion',d : 'Asesoria tecnica sobre equipos computacionales y realizacion de cotizaciones o datos tecnicos para la compra de equipos'},
    'capa' : { t : 'Capacitaciones', d : 'Capacitaciones para asesorar el funcionamiento de los diferentes activos computacionales'},
    'modmail' : { t : 'Modificacion de Correo', d : 'Modificacion de datos del correo institucional, cambio de contraseña, nombre de personas, agregar alias, modificacion de grupos.'},
    
    
    /* WORKSPACE */
    'form' : { t : 'Soporte Form Google', d : 'Creacion de formularios y/o soporte en la creacion de formularios.'},
    'drive' : { t : 'Soporte google drive', d : 'Soporte de Google Drive, instalacion de aplicacion de escritorio y configuracion de la misma'},
    'gmail' : { t : 'Correo Institucional', d: 'Creacion de correos institucionales, creacion de grupos institucionales, creacio de alias para correos institucionales, soporte en la creacion de respuestas automaticas.'},
    'date' : { t : 'Calendario de Google Mail', d : 'Soporte en la configuracion del correo de gmail, asociado al correo institucional.'},
    'meet' : { t : 'Google MEET', d : 'Soporte en la creacion de reuniones asincronicas, mediante la plataforma de MEET de google.'},
    
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
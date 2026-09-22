const datosServicios = {
    /* INTERNET Y REDES */
    'red': { 
        t: 'Instalación y configuración de equipos de red', 
        d: 'Servicio que consiste en la instalación y posterior configuración de equipos de red, tales como routers y switches, en los puestos de trabajo de los funcionarios. El servicio se asegura de mantener a los trabajadores conectados a la red municipal, cubriendo todas sus dependencias.' 
    },
    'conred': { 
        t: 'Continuidad de conexión', 
        d: 'Servicio enfocado en proveer y mantener la conexión a internet en los puestos de trabajo. Este incluye la configuración de las redes en los equipos, su habilitación mediante puertos físicos, la instalación de routers y la provisión de adaptadores WiFi (USB). Además de abarcar el mantenimiento y soporte del cableado estructurado, como por ejemplo, realizando la instalación o reparación de cables Ethernet dañados para restablecer el servicio.' 
    },
    'manred': { 
        t: 'Mantención de equipos y cableado de red', 
        d: 'Servicio encargado de la instalación y mantención del cableado en la red municipal. Consiste en mantener los puestos de trabajo bajo la red institucional mediante el uso de cables Ethernet e incluye la reparación de los mismos o su elaboración en casos requeridos. También asegura conexiones Ethernet y redes WiFi luego de realizarse algún cambio de ubicación por parte de alguna oficina.' 
    },
    /* SERVICIO DE IMPRESIÓN */
    'insimp': { 
        t: 'Instalación de impresoras, escáneres y plotters', 
        d: 'Servicio focalizado en garantizar la operatividad de los equipos de impresión, plotters y escáneres a lo largo de la municipalidad. El servicio abarca la instalación de equipos, sus controladores y de entregar orientación a los funcionarios sobre el uso de los mismos.' 
    },
    'consimp': { 
        t: 'Gestión de consumibles para equipos de impresión', 
        d: 'Servicio encargado de mantener los equipos de impresión con sus respectivos consumibles operativos y reemplazarlos al momento de terminar su vida útil. Además, se dispone de proveer tóneres a los funcionarios en los casos donde se dificulte realizar el reemplazo de estos, como ocurre en DIMAO y en la oficina ubicada en Coya.' 
    },
    'confimp': { 
        t: 'Configuración de equipos de impresión', 
        d: 'Gestión, configuración y mantenimiento de los equipos de impresión.' 
    },
    'mantimp': { 
        t: 'Mantención de impresoras, escáneres y plotters', 
        d: 'Servicio que contempla la resolución de incidentes en el software (equipos no disponibles o sin respuesta) y de hardware, soluciones a los atascos de papel, problemas en la calidad de impresión (defectos en su imagen y falta de color), incluyendo también la mantención básica de plotters.' 
    },
    /* TELEFONÍA */
    'conftel': { 
        t: 'Instalación y configuración de teléfonos IP', 
        d: 'Servicio que se encarga de proveer teléfonos IP a los funcionarios a lo largo del municipio. Abarca la instalación de los dispositivos en los puestos de trabajo y su posterior configuración.'
    },
    'anxtel': { 
        t: 'Gestión de anexos telefónicos', 
        d: 'Servicio encargado de disponer de anexos telefónicos para los funcionarios de la municipalidad, ya sea al realizar la instalación de un dispositivo nuevo, solicitar un listado de los mismos o pedir un anexo específico.'
    },
    'mantel': { 
        t: 'Mantención o continuidad operativa de teléfonos IP', 
        d: 'Servicio que comprende el soporte de los dispositivos telefónicos e incluye la revisión y diagnóstico de los dispositivos, además de la resolución de problemas comunes, como el reemplazo de cables, la configuración básica o avanzada de los valores en los dispositivos y la resolución de fallas de comunicación, como problemas de audio.' 
    },
    'codetel': { 
        t: 'Asignación de códigos de salida', 
        d: 'Servicio que consiste en asignarles a los funcionarios un código de salida para llamadas fuera de la red telefónica municipal, siempre que sea solicitado.' 
    },
    /* GESTIÓN DE IDENTIDAD */
    'ad': { 
        t: 'Creación de cuentas para usuarios nuevos', 
        d: 'Servicio que se encarga de proveerle a los funcionarios sus respectivas cuentas para los sistemas municipales, tales como la plataforma ERP, generar cuenta dentro de Active Directory Municipal, etc.'
    },
    'firmail': { 
        t: 'Administración de firmas de correo electrónico', 
        d: 'Servicio enfocado en proveer un pie de firma para cada correo institucional dentro de la municipalidad, el cual deberá llevar los datos de cada funcionario, incluyendo su nombre y apellido, cargo al que pertenece, dirección a la que pertenece, edificio en el cual trabaja y su respectivo anexo telefónico, en caso de disponer de uno. Además, permite realizar correcciones o cambios en caso de que alguna firma presente un error en su información o cuando sea necesario atribuirle dicha firma a un nuevo funcionario.'
    },
    'firmelec': { 
        t: 'Gestión de firma electrónica avanzada', 
        d: 'Servicio encargado de proporcionar a los funcionarios una firma electrónica, la cual sirve para autenticar documentos digitales y firmar acuerdos en línea con la misma validez legal que una firma manuscrita, pero de forma más rápida, segura y sin papel. Consiste en realizar la instalación de dicha firma en el equipo del funcionario designado. También se encarga de proporcionar soluciones en caso de que la firma presente alguna falla.'
    },
    'gestacnta': { 
        t: 'Gestión de cuentas ante baja de funcionario', 
        d: 'Servicio focalizado en llevar un correcto procedimiento administrativo al momento de solicitar la baja de un usuario: respaldar su correo institucional y suspenderlo posteriormente, eliminar su cuenta de Active Directory, suspender su acceso total a la plataforma ERP, entre otras credenciales asociadas.'
    },
    'gespass': { 
        t: 'Gestión de contraseñas', 
        d: 'Servicio encargado de suministrar y restablecer las contraseñas pertenecientes a los funcionarios municipales. Consiste en realizar una solicitud, principalmente de parte del director a cargo, para restablecer la contraseña de una plataforma o servicio específico, ya sea mediante una llamada telefónica o por ticket.' 
    },
    /* CONTINUIDAD OPERACIONAL */
    'manpc': { 
        t: 'Mantenimiento o reparación de equipos computacionales', 
        d: 'Servicio que se encarga de asegurar el correcto funcionamiento de los equipos informáticos asignados a los funcionarios. Consiste en un diagnóstico de rendimiento en los computadores para identificar fallas y notificarlas mediante un ticket, así como la reparación de problemas en el hardware, si es necesario, después de realizar su diagnóstico. También contempla el reemplazo, actualización o instalación de componentes físicos defectuosos u obsoletos, como discos duros, memorias RAM, fuentes de poder y cableado asociado.'
    },
    'recup': { 
        t: 'Respaldo y restauración de archivos municipales', 
        d: 'Servicio que consiste en el respaldo y restauración de información alojada en los puestos de trabajo. Las labores incluyen la ejecución de respaldos de datos preventivos en las computadoras y la recuperación de archivos específicos del funcionario.'
    },
    'propc': { 
        t: 'Proveer e instalar equipos computacionales', 
        d: 'Servicio enfocado en la gestión integral para la entrega de equipamiento informático a los funcionarios. El proceso abarca la preparación y configuración inicial del hardware (computadores de escritorio y laptops), asegurando su correcto funcionamiento en la red corporativa. Asimismo, contempla la carga de aplicaciones básicas institucionales y la instalación de software específico requerido según el perfil y funciones del usuario, culminando con la entrega física y puesta en marcha del equipo en el puesto de trabajo.'
    },
    'geshar': { 
        t: 'Gestión general del hardware de informática', 
        d: 'Servicio correspondiente a todo el hardware adicional que no sean equipos computacionales. Consiste en proveer, prestar o retirar dicho hardware, como periféricos, proyectores, adaptadores, etc.'
    },
    'diagpc': { 
        t: 'Diagnostico de equipos', 
        d: 'Servicio especializado en la pronta respuesta ante incidentes inoportunos ocurridos en computadores y hardware asociado. Se solicita por medio de un ticket o una llamada telefónica y el proceso consiste en el diagnóstico de un equipo computacional. Posteriormente, se realiza la acción de dar solución a la problemática.'
    },
    'consoft': { 
        t: 'Continuidad operacional de aplicaciones', 
        d: 'Servicio que se asegura de tener instaladas las aplicaciones esenciales para el funcionario como los son las aplicaciones de Microsoft 365, el navegador predeterminado, la aplicación para el ingreso al ERP, en algunos casos la aplicación de escritorio para Google Drive, etc.'    
    },
    /* ASESORÍA TÉCNICA */
    'evapc': { 
        t: 'Evaluación para baja de activo', 
        d: 'Servicio enfocado a la revisión del equipamiento informático para determinar su vida útil y estado operativo. El procedimiento consiste en diagnosticar exhaustivamente el equipo y, posteriormente, emitir un informe o certificado que acredite formalmente si el hardware se encuentra tecnológicamente obsoleto o presenta daños irreparables. Este documento respalda el proceso administrativo necesario para dar de baja el activo del inventario institucional.'
    },
    'ases': { 
        t: 'Asesoría técnica general', 
        d: 'Servicio que consiste en asesorar u orientar a funcionarios sobre temas relacionados con el área de la informática cada vez que se solicite mediante un ticket o por llamada telefónica.'
    },
    'capa': { 
        t: 'Capacitaciones para funcionarios municipales', 
        d: 'Servicio encargado de la capacitación para funcionarios sobre temas relacionados con el área de la informática y de acuerdo con lo que se solicite instruir, apoyándose por medio de charlas presenciales y remotas organizadas con Google Meet.'
    },
    'cothdw': { 
        t: 'Cotizaciones de hardware municipal', 
        d: 'Servicio enfocado a orientar, respaldar y facilitar los procesos de adquisición tecnológica de los distintos departamentos. Consiste en la búsqueda, evaluación y levantamiento de especificaciones técnicas de equipamiento o software, basándose en los requerimientos del área. La búsqueda se ajusta estratégicamente al presupuesto disponible del departamento, considerando márgenes operativos para absorber posibles variaciones de precios en el mercado. El servicio culmina con la entrega de un documento formal que consolida las características técnicas recomendadas e incluye los enlaces de referencia de los proveedores consultados para gestionar la compra.'
    },
    /* WORKSPACE */
    'gmail': { 
        t: 'Administración de correos institucionales', 
        d: 'Servicio que se entiende por abarcar todos los procesos administrativos relacionados con las cuentas de Google incluyendo todos sus servicios, tales como gestionar las cuentas de Gmail y restablecer contraseñas, entre todas las herramientas que ofrece Google Workspace.'
    },
    'ggl': { 
        t: 'Asistencia con servicios de Google Workspace', 
        d: 'Servicio que contempla la asistencia para los funcionarios en los servicios de Google Workspace, tales como las herramientas de ofimática y el uso eficiente de herramientas como Forms, Calendar y Meet, etc.'
    },
    'drive': { 
        t: 'Gestión de datos en Google Drive', 
        d: 'Servicio específicamente enfocado en asistir con el uso de Google Drive, la organización de directorios usando la aplicación de escritorio y su sincronización.'
    },
    /* SISTEMAS MUNICIPALES */
    'sgd-especificos': { 
        t: 'Soporte especifico de plataformas SISREC, MonitoWeb, Reloj control, Etc.', 
        d: 'Servicio que da soporte específico para las plataformas SISREC, Monitoweb, Reloj Control, entre otros. Consiste en la resolucion de problemas relacionados a dichos sistemas cada vez que se solicite su asistencia.'
    },
    'sgd-soporte-erp': {
        t: 'Soporte de servicios municipales en plataforma ERP',
        d: 'Servicio de soporte para solicitudes e incidentes relacionados a la plataforma ERP y sus sistemas: Giradores, Finanzas, etc.'
    },
};


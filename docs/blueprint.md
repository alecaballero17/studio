# **App Name**: Gestion Academica FICCT

## Core Features:

- Autenticación de usuario: Inicio de sesión y gestión de sesiones seguros mediante nombre de usuario/contraseña, con control de acceso basado en roles. Generación automática de cuentas de usuario a partir de datos proporcionados en archivos Excel/CSV para cada período académico.
- Gestión de roles y permisos: Definir roles (por ejemplo, administrador, profesor, estudiante) y asignar permisos para controlar el acceso a las funciones. Diferentes privilegios para cada perfil de usuario.
- Gestión de facultades y carreras: Crear, actualizar y gestionar facultades y programas académicos, vinculándolos entre sí.
- Gestión de cursos y grupos: Crear y gestionar cursos (materias), asignarlos a carreras específicas y organizarlos en grupos con horarios y profesores específicos.
- Gestión de períodos académicos: Definir períodos académicos (gestiones académicas) con fechas de inicio y fin para organizar cursos e inscripciones.
- Asignación de profesores: Asignar profesores a grupos y cursos específicos, gestionando su carga de trabajo (horas_semana).
- Gestión de aulas y horarios: Gestionar las aulas y generar horarios, evitando superposiciones. Automatizar la generación y validación de horarios sin conflictos.
- Seguimiento de asistencia: Registro de asistencia digital para profesores a través de formulario digital o código QR.
- Informes y análisis: Panel de control de administración con informes de horarios semanales, asistencia por profesor y grupo, y aulas disponibles. Generar informes en PDF o Excel.
- Gestionar roles (CRUD): Crear, actualizar, eliminar y listar roles. Asignar permisos a los roles.
- Gestionar usuarios (CRUD + Asignación de roles): Crear, actualizar, desactivar y listar usuarios. Asignar roles a los usuarios.
- Gestionar profesores/docentes (CRUD): Crear, actualizar y listar profesores (código, nombre, correo electrónico, categoría, dedicación).
- Cerrar sesión: Permitir que cualquier usuario autenticado finalice su sesión.
- Gestionar carreras (CRUD): Crear, actualizar y listar programas académicos, vinculados a una facultad.
- Gestionar facultades (CRUD): Crear, actualizar y listar facultades.
- Gestionar carreras (Listado y relación con la facultad): Gestión masiva y relaciones de carreras, filtrables por facultad.
- Gestionar aulas (CRUD): Crear, actualizar y listar aulas (código, capacidad, tipo, estado).
- Gestionar asignaturas (CRUD): Crear, actualizar y listar asignaturas (nombre, código, créditos, nivel, carrera).
- Gestionar grupos (CRUD + enlace Asignatura/Período): Crear, actualizar y listar grupos (número, turno, estado, asignatura, período). Asignar profesores.
- Gestionar horarios (crear/editar y evitar conflictos): Crear/actualizar horarios, evitando superposiciones.
- Registrar asistencia (manual y QR/código): Registrar la asistencia manualmente o mediante escaneo de QR/código.
- Generar informe de asistencia (PDF/Excel): Generar informes de asistencia en formato PDF/Excel.
- Gestionar el horario académico: Consolidar y supervisar la programación académica.
- Gestionar períodos académicos (CRUD): Crear, actualizar y gestionar los períodos académicos (nombre, fecha de inicio/fin, estado).
- Asignar profesores a grupos (asignaciones CRUD): Crear, actualizar y gestionar las asignaciones de profesores a grupos (profesor, grupo, horas semanales).
- Auditoría/Trazabilidad: Escribir createdAt/By, updatedAt/By en cada colección.
- Importar/Exportar: Carga masiva de CSV y descarga de catálogos.

## Style Guidelines:

- Color primario: Azul profundo (#3F51B5) para una sensación profesional y confiable, inspirado en instituciones académicas.
- Color de fondo: Gris claro (#EEEEEE), creando un telón de fondo limpio y neutro para garantizar la legibilidad y el enfoque en el contenido.
- Color de acento: Púrpura suave (#9575CD), que proporciona interés visual y destaca los elementos interactivos clave sin sobrecargar el diseño general.
- Fuente del encabezado: 'Space Grotesk', una sans-serif moderna, proporciona un aspecto limpio y profesional adecuado para los encabezados.
- Fuente del cuerpo: 'Inter', una sans-serif grotesca, se utiliza para el texto del cuerpo para garantizar una excelente legibilidad y una apariencia neutral, especialmente para textos más largos.
- Utilice un conjunto de iconos coherentes y profesionales para la navegación y las acciones clave.
- Mantenga un diseño limpio y organizado, priorizando la claridad y la facilidad de navegación. Diseño responsivo para dispositivos móviles (PWA).
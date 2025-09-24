Este documento resume las tareas realizadas durante el Sprint Backlog - Semana 1 del proyecto de sistema de pedidos para el buffet universitario, enfocadas exclusivamente en el backend.

🧾Configuración del entorno de desarrollo

🎯 Objetivo de la tarea

Configurar entorno de desarrollo
Instalar y configurar frameworks/librerías necesarias para el backend
Definir estructura de carpetas para organizar el proyecto.
✅ Tareas realizadas

🔧 Instalación y configuración de librerías

Inicialización del proyecto connpm init
Instalación de dependencias clave:
express→ Servidor web
cors→ Manejo de políticas CORS
dotenv→ Gestión de variables de entorno
pg→ Conexión con base de datos PostgreSQL
📁 Estructura de carpetas definidas

config/→ Configuración de conexión a la base de datos
models/→ Definición de estructuras de datos
controllers/→ Lógica de negocio
routes/→ Definición de rutas de la API
⚙️Configuración del entorno

Creación del archivo .envcon variables sensibles (puerto, credenciales de DB, etc.)
Configuración de conexión a PostgreSQL mediante pg.Poolenconfig/db.js
Implementación del servidor Express enapp.js
Prueba exitosa de la ruta principal ( GET /) en entorno local
📌 Estado de Configuración del entorno de desarrollo Completado (Backend) ✅
El entorno backend está listo para avanzar al diseño de base de datos.

🧾 Diseño del modelo de base de datos

🎯 Objetivo

Diseñar modelo de base de datos inicial
Crear las tablas necesarias para el sistema de pedidos.
Validar la conexión entre el backend y la base de datos
✅ Tareas realizadas

🧱 Diseño de base de datos

Definición de entidades principales: usuarios, productos, pedidos,detalle_pedido
Creación del script SQL para generar las tablas en PostgreSQL
🧪 Prueba de conexión

Implementación de ruta de prueba GET /usuariosenroutes/test.js
Consulta exitosa a la tabla usuariosdesde el backend
Validación de respuesta en entorno local con datos reales
📁 Archivos modificados

app.js→ Conexión de rutas y configuración del servidor
routes/test.js→ Definición de ruta de prueba
.env.example→ Variables necesarias para conexión segura
.gitignore→ Exclusión del archivo .envreal
📌 Estado Diseño del modelo de base de datos
Completado (Backend) ✅
El backend está conectado correctamente a la base de datos y listo para avanzar con la lógica de autenticación y gestión de pedidos.

🧾 Implementación de Registro y Login de Usuario

🎯 Objetivo

Desarrollar el sistema de autenticación para la plataforma del buffet universitario.  
Permitir que los usuarios se registren de forma segura y accedan mediante credenciales válidas.  
Garantizar la protección de datos sensibles y la generación de sesiones autenticadas.

✅ Tareas realizadas

🔐 Registro de usuario

- Creación del endpoint POST /api/usuarios/registro
- Validación de email único en la base de datos
- Encriptación de contraseña con bcryptjs antes de guardar
- Inserción segura del usuario en la tabla usuarios
- Pruebas exitosas con curl simulando registros reales

🔑 Login de usuario

- Creación del endpoint POST /api/usuarios/login
- Validación de credenciales (email y password)
- Comparación segura de contraseñas con bcrypt.compare()
- Generación de token JWT con jsonwebtoken para sesiones autenticadas
- Respuesta estructurada con datos del usuario y token de acceso
- Pruebas exitosas con curl verificando autenticación y recepción del token

📁 Archivos modificados

- controllers/usuariosController.js → Lógica de registro y login
- routes/usuarios.js → Definición de rutas /registro y /login
- .env → Inclusión de variable JWT_SECRET para firma de tokens
- app.js → Conexión de rutas de usuarios al servidor principal

📌 Estado Registro y Login de Usuario  
Completado (Backend) ✅  
El sistema de autenticación está operativo y listo para integrarse con el frontend. Se recibieron tokens válidos y se verificó el acceso mediante credenciales reales


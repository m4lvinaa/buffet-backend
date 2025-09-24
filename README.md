🧾 Backend: Configuración del entorno de desarrollo  
Este documento resume las tareas realizadas durante el Sprint Backlog - Semana 1 del proyecto de sistema de pedidos para el buffet universitario, enfocadas exclusivamente en el backend.

🎯 Objetivo del Sprint  
- Configurar entorno de desarrollo  
- Instalar y configurar frameworks/librerías necesarias para el backend  
- Definir estructura de carpetas para organizar el proyecto  

✅ Tareas realizadas  

🔧 Instalación y configuración de librerías  
- Inicialización del proyecto con `npm init`  
- Instalación de dependencias clave:  
  - `express` → Servidor web  
  - `cors` → Manejo de políticas CORS  
  - `dotenv` → Gestión de variables de entorno  
  - `pg` → Conexión con base de datos PostgreSQL  

📁 Estructura de carpetas definidas  
- `config/` → Configuración de conexión a la base de datos  
- `models/` → Definición de estructuras de datos  
- `controllers/` → Lógica de negocio  
- `routes/` → Definición de rutas de la API  

⚙️ Configuración del entorno  
- Creación del archivo `.env` con variables sensibles (puerto, credenciales de DB, etc.)  
- Configuración de conexión a PostgreSQL mediante `pg.Pool` en `config/db.js`  
- Implementación del servidor Express en `app.js`  
- Prueba exitosa de la ruta principal (`GET /`) en entorno local  

📌 Estado del Sprint 2  
Sprint 2 completado (Backend) ✅  
El entorno backend está listo para avanzar al diseño de base de datos en el próximo Sprint.

---

🧾 Backend: Diseño del modelo de base de datos  
Este documento resume las tareas realizadas durante el Sprint Backlog - Semana 2 - Tarea 3 del proyecto de sistema de pedidos para el buffet universitario, enfocadas en el diseño inicial de la base de datos.

🎯 Objetivo del Sprint  
- Diseñar modelo de base de datos inicial  
- Crear las tablas necesarias para el sistema de pedidos  
- Validar la conexión entre el backend y la base de datos

✅ Tareas realizadas  

🧱 Diseño de base de datos  
- Definición de entidades principales: `usuarios`, `productos`, `pedidos`, `detalle_pedido`  
- Creación del script SQL para generar las tablas en PostgreSQL  

🧪 Prueba de conexión  
- Implementación de ruta de prueba `GET /usuarios` en `routes/test.js`  
- Consulta exitosa a la tabla `usuarios` desde el backend  
- Validación de respuesta en entorno local con datos reales  

📁 Archivos modificados  
- `app.js` → Conexión de rutas y configuración del servidor  
- `routes/test.js` → Definición de ruta de prueba  
- `.env.example` → Variables necesarias para conexión segura  
- `.gitignore` → Exclusión del archivo `.env` real

📌 Estado del Sprint 3  
Sprint 3 completado (Backend) ✅  
El backend está conectado correctamente a la base de datos y listo para avanzar con la lógica de autenticación y gestión de pedidos..

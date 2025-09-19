# 🧾 Backend: Configuración del entorno de desarrollo

Este documento resume las tareas realizadas durante el Sprint Backlog - Semana 1 - Tarea 2 del proyecto de sistema de pedidos para el buffet universitario, enfocadas exclusivamente en el backend.

---

## 🎯 Objetivo del Sprint

**Configurar entorno de desarrollo**  
Instalar y configurar frameworks/librerías necesarias para el backend.  
Definir estructura de carpetas para organizar el proyecto.

---

## ✅ Tareas realizadas

### 🔧 Instalación y configuración de librerías

- Inicialización del proyecto con `npm init`
- Instalación de dependencias clave:
  - `express` → servidor web
  - `cors` → manejo de políticas CORS
  - `dotenv` → gestión de variables de entorno
  - `pg` → conexión con base de datos PostgreSQL

---

### 📁 Estructura de carpetas definida

- `config/` → configuración de conexión a la base de datos
- `models/` → definición de estructuras de datos
- `controllers/` → lógica de negocio
- `routes/` → definición de rutas de la API

---

### ⚙️ Configuración del entorno

- Creación del archivo `.env` con variables sensibles (puerto, credenciales de DB, etc.)
- Configuración de conexión a PostgreSQL mediante `pg.Pool` en `config/db.js`
- Implementación del servidor Express en `app.js`
- Prueba exitosa de la ruta principal (`GET /`) en entorno local

---

## 📌 Estado del Sprint 2

**Sprint 2 completado (Backend) ✅**  
El entorno backend está listo para avanzar al diseño de base de datos en el próximo Sprint.

# 🍽️ Buffet-Ecommerce - Universidad (Repositorio Back End)

## 📌 Descripción
Este repositorio corresponde al **backend** del sistema de pedidos del buffet universitario.  
El proyecto fue desarrollado por estudiantes de programación y ciencia de datos, con el objetivo de crear una **API RESTful** que gestione pedidos, usuarios y productos, y se comunique con el frontend del sistema de ecommerce.

## 🚀 Tecnologías utilizadas
- **Runtime**: Node.js  
- **Framework principal**: Express.js  
- **Base de datos**: PostgreSQL  
- **ORM / Conexión**: pg  
- **Control de versiones**: Git + GitHub  
- **Autenticación**: JWT + bcryptjs  
- **Variables de entorno**: dotenv  

## 👥 Integrantes
- Brisa Nahir Valero  
- Rocio Soledad Maldonado  
- Julieta Delfina Sayago  
- Malvina Florencia Avendaño  

---

## 🛠️ Instalación y ejecución del backend

### Prerrequisitos
- Node.js v18+  
- PostgreSQL instalado y en ejecución  
- Git configurado  

### Paso a paso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/organizacion/buffet-ecommerce-backend.git
   cd buffet-ecommerce-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo .env en la raíz del backend con los siguientes valores:
   ```bash
   PORT=3000
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_NAME=buffet_db
   JWT_SECRET=tu_clave_secreta
   ```
   Ajustar los valores según tu entorno local o remoto.

4. **Levantar el servidor**
   ```bash
   npm run dev
   ```
   El servidor se iniciará en http://localhost:3000.

## 📁 Estructura del proyecto
```plaintext
BUFFET-BACKEND/
├── config/           # Configuración de la base de datos y variables globales
├── controllers/      # Lógica de negocio (controladores de rutas)
├── db/               # Scripts o configuraciones adicionales de base de datos
├── middlewares/      # Middlewares personalizados (autenticación, validaciones, etc.)
├── models/           # Modelos o estructuras de datos
├── routes/           # Definición de rutas de la API
├── app.js            # Configuración principal de Express
├── package-lock.json # Registro exacto de versiones de dependencias
├── package.json      # Información del proyecto y dependencias
└── README.md         # Documentación del proyecto
```

### 🧩 Dependencias principales

| Dependencia     | Descripción breve                                       |
|-----------------|----------------------------------------------------------|
| **bcryptjs**    | Encripta contraseñas para almacenamiento seguro          |
| **cloudinary**  | Permite subir, almacenar y gestionar imágenes en la nube |
| **cors**        | Habilita el intercambio de recursos entre dominios (CORS)|
| **dotenv**      | Carga variables de entorno desde el archivo `.env`       |
| **express**     | Framework principal para crear el servidor y definir rutas|
| **jsonwebtoken**| Genera y valida tokens JWT para autenticación            |
| **multer**      | Maneja la carga de archivos en peticiones HTTP           |
| **mysql2**      | Cliente para conectarse y realizar consultas a MySQL     |
| **pg**          | Cliente para conectarse y realizar consultas a PostgreSQL|
| **qrcode**      | Genera códigos QR de manera dinámica                     |


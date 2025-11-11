-- Script de base de datos buffet_db

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL,
  stock INTEGER NOT NULL,
  categoria VARCHAR(100),
  activo BOOLEAN DEFAULT true, 
  imagen_url TEXT  
);

-- Tabla de pedidos
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(50) NOT NULL
);

-- Detalle de cada pedido
CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  cantidad INTEGER NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL
);
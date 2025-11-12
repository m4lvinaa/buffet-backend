-- ==========================================
-- Tabla de categorías
-- ==========================================
CREATE TABLE IF NOT EXISTS categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías por defecto
INSERT INTO categorias (nombre, descripcion) VALUES
  ('Bebidas', 'Bebidas variadas'),
  ('Golosinas', 'Golosinas y dulces'),
  ('Sandwiches', 'Sandwiches y emparedados'),
  ('Snacks', 'Snacks y frituras'),
  ('Postres', 'Postres y repostería')
ON CONFLICT (nombre) DO NOTHING;

-- ==========================================
-- Ajustar tabla de productos
-- ==========================================

-- 1. Agregar columna categoria_id con FK
ALTER TABLE productos ADD COLUMN IF NOT EXISTS categoria_id INTEGER REFERENCES categorias(id);

-- 2. Migrar datos desde la columna vieja "categoria" (texto) a categoria_id
UPDATE productos p
SET categoria_id = c.id
FROM categorias c
WHERE p.categoria = c.nombre;

-- 3. Eliminar la columna vieja "categoria"
ALTER TABLE productos DROP COLUMN IF EXISTS categoria;

-- ==========================================
-- Verificación
-- ==========================================
-- Ver los productos con su categoría asignada
SELECT p.id, p.nombre, p.categoria_id, c.nombre AS categoria_nombre
FROM productos p
JOIN categorias c ON p.categoria_id = c.id;

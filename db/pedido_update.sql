-- Script: Actualización de tabla 'pedidos'

-- Agregar campo 'numero_pedido' para rastreo único
ALTER TABLE pedidos
ADD COLUMN numero_pedido VARCHAR(30) UNIQUE;

-- Establecer valor por defecto 'Pendiente' para el campo 'estado'
ALTER TABLE pedidos
ALTER COLUMN estado SET DEFAULT 'Pendiente';
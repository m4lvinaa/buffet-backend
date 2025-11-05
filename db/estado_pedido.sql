CREATE TABLE estado_pedido (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pedido_id UUID NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  estado_anterior TEXT,
  estado_actual TEXT NOT NULL,
  administrador UUID,      
  motivo_de_cambio TEXT, 
  fecha_hora TIMESTAMP WITH TIME ZONE DEFAULT now()
);

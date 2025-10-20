CREATE TABLE carrito (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    cantidad  INTEGER NOT NULL CHECK (cantidad > 0),
    subtotal NUMERIC(10,2) NOT NULL,

    CONSTRAINT fk_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE 

    CONSTRAINT fk_producto
        FOREIGN KEY (id_producto)
        REFERENCES productos(id)
        ON DELETE CASCADE,
    
    CONSTRAINT carrito_unico
        UNIQUE (id_usuario, id_producto)
);
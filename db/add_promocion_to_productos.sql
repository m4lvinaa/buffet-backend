ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS promocion BOOLEAN DEFAULT false;

UPDATE productos SET promocion = false WHERE promocion IS NULL;

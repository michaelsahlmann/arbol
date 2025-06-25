-- Configuración de la base de datos para el proyecto "arbol"
-- Ejecutar este SQL en el SQL Editor de Supabase

-- Crear tabla para el progreso de usuarios
CREATE TABLE IF NOT EXISTS user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  node_id TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, node_id)
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_node_id ON user_progress(node_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(completed);

-- Habilitar RLS (Row Level Security)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones (ajusta según tus necesidades)
DROP POLICY IF EXISTS "Allow all operations" ON user_progress;
CREATE POLICY "Allow all operations" ON user_progress
  FOR ALL USING (true);

-- Función para actualizar el timestamp automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos datos de prueba (opcional)
INSERT INTO user_progress (user_id, node_id, completed, completed_at) 
VALUES 
  ('usuario1', 'portland-cement', true, NOW()),
  ('usuario1', 'ready-mix', false, NULL),
  ('usuario2', 'transistors', true, NOW())
ON CONFLICT (user_id, node_id) DO NOTHING;

-- Verificar que todo esté configurado correctamente
SELECT 
  'Tabla user_progress creada correctamente' as status,
  COUNT(*) as total_records
FROM user_progress; 
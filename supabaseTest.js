const { createClient } = require('@supabase/supabase-js');

// Reemplaza con tus datos reales de Supabase
const supabaseUrl = 'https://TU_SUPABASE_URL.supabase.co';
const supabaseKey = 'TU_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarConexion() {
  // Cambia 'test_table' por una tabla existente en tu base de datos
  const { data, error } = await supabase.from('test_table').select('*').limit(1);

  if (error) {
    console.error('❌ Error de conexión:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Conexión exitosa. Datos:', data);
    process.exit(0);
  }
}

verificarConexion();

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Función para leer el archivo .env
function readEnvFile() {
  try {
    const envPath = './.env';
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Extraer variables de entorno
    const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1]?.trim();
    const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim();
    
    return { supabaseUrl, supabaseKey };
  } catch (error) {
    console.error('Error leyendo archivo .env:', error.message);
    return { supabaseUrl: null, supabaseKey: null };
  }
}

// Función principal para probar la conexión
async function testSupabaseConnection() {
  console.log('🔍 Iniciando diagnóstico de conexión a Supabase...\n');
  
  // Leer credenciales del archivo .env
  const { supabaseUrl, supabaseKey } = readEnvFile();
  
  console.log('📋 Información de configuración:');
  console.log(`URL: ${supabaseUrl || 'No encontrada'}`);
  console.log(`Key: ${supabaseKey ? '****' + supabaseKey.slice(-4) : 'No encontrada'}`);
  
  // Verificar si las credenciales son válidas
  if (!supabaseUrl || !supabaseKey) {
    console.error('\n❌ ERROR: Credenciales de Supabase no encontradas o incompletas');
    console.log('   Asegúrate de tener un archivo .env en la carpeta arbol_edu con las variables:');
    console.log('   VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY correctamente configuradas');
    return;
  }
  
  // Verificar si las credenciales son placeholders
  if (supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
    console.error('\n❌ ERROR: Las credenciales de Supabase son valores de ejemplo');
    console.log('   Debes reemplazar los valores de ejemplo con tus credenciales reales de Supabase');
    console.log('   Obtén tus credenciales en: https://supabase.com/dashboard > Proyecto > Settings > API');
    return;
  }
  
  // Verificar formato de URL
  if (!supabaseUrl.startsWith('https://')) {
    console.error('\n❌ ERROR: La URL de Supabase no tiene el formato correcto');
    console.log('   La URL debe comenzar con https://');
    return;
  }
  
  console.log('\n🔌 Intentando conectar a Supabase...');
  
  try {
    // Crear cliente de Supabase
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Probar conexión con una consulta simple
    console.log('   Consultando tabla user_progress...');
    const { data, error } = await supabase.from('user_progress').select('*').limit(1);
    
    if (error) {
      console.error(`\n❌ ERROR DE CONEXIÓN: ${error.message}`);
      
      if (error.code === 'PGRST301') {
        console.log('\n🔍 Diagnóstico: La tabla "user_progress" no existe');
        console.log('   Solución: Ejecuta el script SQL en supabase-setup.sql para crear la tabla');
      } else if (error.code === '42501') {
        console.log('\n🔍 Diagnóstico: Problema de permisos en la base de datos');
        console.log('   Solución: Verifica las políticas RLS en tu proyecto de Supabase');
      } else if (error.code === 'PGRST401') {
        console.log('\n🔍 Diagnóstico: Problema de autenticación');
        console.log('   Solución: Verifica que la anon key sea correcta');
      } else if (error.message.includes('Failed to fetch')) {
        console.log('\n🔍 Diagnóstico: No se pudo conectar al servidor');
        console.log('   Posibles causas:');
        console.log('   1. URL incorrecta');
        console.log('   2. Problemas de red');
        console.log('   3. Servidor de Supabase no disponible');
      }
      
      console.log('\n📋 Recomendaciones generales:');
      console.log('1. Verifica que las credenciales en .env sean correctas');
      console.log('2. Asegúrate de que tu proyecto en Supabase esté activo');
      console.log('3. Verifica tu conexión a internet');
      console.log('4. Revisa la configuración de la base de datos en Supabase');
    } else {
      console.log('\n✅ CONEXIÓN EXITOSA!');
      console.log(`   Datos recibidos: ${JSON.stringify(data)}`);
      
      // Verificar si hay datos
      if (data && data.length > 0) {
        console.log('   La tabla user_progress contiene registros');
      } else {
        console.log('   La tabla user_progress está vacía');
        console.log('   Esto es normal si aún no has guardado progreso de usuarios');
      }
    }
  } catch (error) {
    console.error('\n❌ ERROR INESPERADO:', error.message);
    console.log('\n📋 Recomendaciones:');
    console.log('1. Verifica que @supabase/supabase-js esté instalado correctamente');
    console.log('2. Asegúrate de que las credenciales tengan el formato correcto');
    console.log('3. Verifica tu conexión a internet');
  }
}

// Ejecutar el test
testSupabaseConnection();

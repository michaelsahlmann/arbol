#!/usr/bin/env node

/**
 * Script de configuración para Supabase
 * Ejecutar: node setup-supabase.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🌳 Configuración de Supabase para Árbol Educativo\n');

// Verificar si existe el archivo .env
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creando archivo .env...');
  
  const envContent = `# Supabase Configuration para proyecto "arbol"
# Reemplaza estos valores con las credenciales reales de tu proyecto

VITE_SUPABASE_URL=https://ldqhbxoorrnerfzhluph.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcWhieG9vcnJuZXJmemhsdXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NjA5NjMsImV4cCI6MjA2NjAzNjk2M30.eC0OetrsgrL16Db0QD7UMf0bDLu8dsE92JEZ-LEt8aA

# Para obtener las credenciales:
# 1. Ve a https://supabase.com/dashboard
# 2. Selecciona tu proyecto "arbol"
# 3. Ve a Settings > API
# 4. Copia la Project URL y anon public key
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Archivo .env creado');
  console.log('⚠️  IMPORTANTE: Edita el archivo .env con tus credenciales reales\n');
} else {
  console.log('✅ Archivo .env ya existe');
}

// Verificar si existe el archivo SQL
const sqlPath = path.join(__dirname, 'supabase-setup.sql');
const sqlExists = fs.existsSync(sqlPath);

if (sqlExists) {
  console.log('✅ Archivo SQL de configuración listo');
  console.log('📋 Pasos para completar la configuración:\n');
  
  console.log('1. 🔑 Obtener credenciales de Supabase:');
  console.log('   - Ve a https://supabase.com/dashboard');
  console.log('   - Selecciona tu proyecto "arbol"');
  console.log('   - Ve a Settings > API');
  console.log('   - Copia la Project URL y anon public key\n');
  
  console.log('2. 📝 Editar archivo .env:');
  console.log('   - Abre el archivo .env en la carpeta arbol_edu');
  console.log('   - Reemplaza "tu-anon-key-aqui" con tu anon key real\n');
  
  console.log('3. 🗄️  Configurar base de datos:');
  console.log('   - Ve a SQL Editor en tu dashboard de Supabase');
  console.log('   - Copia y pega el contenido de supabase-setup.sql');
  console.log('   - Ejecuta el SQL\n');
  
  console.log('4. 🚀 Ejecutar la aplicación:');
  console.log('   - npm run dev (para desarrollo)');
  console.log('   - npm run preview (para probar producción)\n');
  
  console.log('📖 Para más información, consulta el README.md');
} else {
  console.log('❌ Archivo SQL no encontrado');
}

console.log('\n🎉 ¡Configuración lista!'); 
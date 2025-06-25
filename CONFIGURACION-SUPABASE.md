# 🔧 Configuración Completa de Supabase

## 📋 Pasos para configurar tu proyecto "arbol"

### **PASO 1: Obtener credenciales de Supabase**

1. **Ve al dashboard de Supabase:**
   - Abre [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Inicia sesión con tu cuenta

2. **Selecciona tu proyecto:**
   - Busca y selecciona el proyecto llamado **"arbol"**

3. **Obtén las credenciales:**
   - Ve a **Settings** (⚙️) en el menú lateral
   - Haz clic en **API**
   - Copia estos valores:
     - **Project URL** (ejemplo: `https://arbol.supabase.co`)
     - **anon public** key (una clave larga que empieza con `eyJ...`)

### **PASO 2: Configurar variables de entorno**

1. **Abre el archivo `.env`:**
   - Ve a la carpeta `arbol_edu`
   - Abre el archivo `.env` que se creó automáticamente

2. **Reemplaza los valores:**
   ```env
   VITE_SUPABASE_URL=https://arbol.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key-real-aqui
   ```

### **PASO 3: Configurar la base de datos**

1. **Ve al SQL Editor:**
   - En tu dashboard de Supabase, ve a **SQL Editor**
   - Haz clic en **New query**

2. **Ejecuta el SQL:**
   - Copia todo el contenido del archivo `supabase-setup.sql`
   - Pégalo en el editor SQL
   - Haz clic en **Run** para ejecutar

3. **Verifica la configuración:**
   - Deberías ver un mensaje de confirmación
   - Ve a **Table Editor** para ver la tabla `user_progress`

### **PASO 4: Probar la aplicación**

1. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

2. **O ejecutar en producción:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Probar la funcionalidad:**
   - Abre la aplicación en el navegador
   - Ingresa un ID de usuario (ejemplo: "usuario1")
   - Navega por el árbol y marca algunos checkboxes
   - Verifica que el progreso se guarde

## 🔍 Verificación de la configuración

### **Verificar que todo funcione:**

1. **En Supabase Dashboard:**
   - Ve a **Table Editor**
   - Deberías ver la tabla `user_progress`
   - Puede tener algunos datos de prueba

2. **En la aplicación:**
   - Los checkboxes aparecen en las ramas finales
   - El progreso se guarda al marcar/desmarcar
   - El panel de progreso muestra estadísticas
   - Los mensajes de autoguardado aparecen

### **Solución de problemas comunes:**

**❌ Error: "Invalid API key"**
- Verifica que la anon key en `.env` sea correcta
- Asegúrate de copiar la clave completa

**❌ Error: "Table not found"**
- Ejecuta el SQL de configuración en Supabase
- Verifica que la tabla `user_progress` existe

**❌ Checkboxes no aparecen**
- Asegúrate de haber ingresado un ID de usuario
- Verifica que las credenciales estén correctas

**❌ No se guarda el progreso**
- Revisa la consola del navegador para errores
- Verifica la conexión a internet
- Comprueba las políticas de RLS en Supabase

## 📊 Estructura de la base de datos

La tabla `user_progress` tiene esta estructura:

```sql
CREATE TABLE user_progress (
  id BIGSERIAL PRIMARY KEY,           -- ID único
  user_id TEXT NOT NULL,              -- ID del usuario
  node_id TEXT NOT NULL,              -- ID del nodo del árbol
  completed BOOLEAN NOT NULL DEFAULT false,  -- Estado completado
  completed_at TIMESTAMP WITH TIME ZONE,     -- Fecha de completado
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- Fecha de creación
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- Fecha de actualización
  UNIQUE(user_id, node_id)            -- Un usuario por nodo
);
```

## 🎯 Datos de prueba incluidos

El script SQL incluye algunos datos de prueba:
- `usuario1` ha completado `portland-cement`
- `usuario1` no ha completado `ready-mix`
- `usuario2` ha completado `transistors`

## 🚀 ¡Listo para usar!

Una vez completados estos pasos, tu aplicación estará completamente funcional con:

- ✅ Checkboxes en ramas finales
- ✅ Almacenamiento en Supabase
- ✅ Autoguardado cada 5 minutos
- ✅ Panel de progreso en tiempo real
- ✅ Identificación de usuarios

¡Disfruta usando tu árbol educativo! 🌳✨ 
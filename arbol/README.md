# 🌳 Árbol Educativo con Checkboxes y Supabase

Sistema de árbol educativo con funcionalidades de progreso, checkboxes y autoguardado en Supabase.

## ✨ Características

- ✅ **Checkboxes en ramas finales**: Cada nodo sin hijos tiene un checkbox
- 🗄️ **Almacenamiento en Supabase**: Progreso guardado en base de datos
- 👤 **Identificación de usuario**: Campo para ingresar ID de usuario
- ⏰ **Autoguardado**: Guarda automáticamente cada 5 minutos
- 📊 **Visualización de progreso**: Estadísticas y barra de progreso
- 🎨 **UI moderna**: Diseño con Tailwind CSS y efectos glassmorphism

## 🚀 Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Supabase

#### Crear proyecto en Supabase:
1. Ve a [https://supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a **Settings > API**
4. Copia la **URL del proyecto** y la **anon key**

#### Crear tabla en Supabase:
Ejecuta este SQL en el SQL Editor de Supabase:

```sql
-- Crear tabla para el progreso de usuarios
CREATE TABLE user_progress (
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
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_node_id ON user_progress(node_id);
CREATE INDEX idx_user_progress_completed ON user_progress(completed);

-- Habilitar RLS (Row Level Security)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Política para permitir todas las operaciones (ajusta según tus necesidades)
CREATE POLICY "Allow all operations" ON user_progress
  FOR ALL USING (true);
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### 4. Ejecutar el proyecto

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📖 Uso

### Para usuarios:
1. **Ingresa tu ID de usuario** en el campo correspondiente
2. **Navega por el árbol** expandiendo las ramas
3. **Marca los checkboxes** en las ramas finales para registrar progreso
4. **Tu progreso se guarda automáticamente** cada 5 minutos
5. **Visualiza tu progreso** en el panel de estadísticas

### Para desarrolladores:
- **Modificar datos**: Edita `src/data/sampleTreeData.ts`
- **Personalizar UI**: Modifica los componentes en `src/components/`
- **Ajustar autoguardado**: Cambia el intervalo en `src/hooks/useAutoSave.ts`

## 🏗️ Estructura del proyecto

```
src/
├── components/
│   ├── MaterialTree.tsx      # Componente principal del árbol
│   ├── TreeNode.tsx          # Nodo individual con checkbox
│   ├── UserIdInput.tsx       # Input para ID de usuario
│   └── ProgressDisplay.tsx   # Visualización de progreso
├── services/
│   └── progressService.ts    # Servicios de Supabase
├── hooks/
│   └── useAutoSave.ts        # Hook de autoguardado
├── utils/
│   └── treeUtils.ts          # Utilidades para el árbol
├── types/
│   └── TreeTypes.ts          # Tipos TypeScript
├── lib/
│   └── supabase.ts           # Configuración de Supabase
└── data/
    └── sampleTreeData.ts     # Datos del árbol
```

## 🔧 Personalización

### Cambiar intervalo de autoguardado:
```typescript
// En App.tsx, línea ~40
const { saveProgress, saveNodeImmediately } = useAutoSave({
  userId: appState.userId,
  userProgress: appState.userProgress,
  autoSaveInterval: 10 * 60 * 1000, // 10 minutos
  // ...
});
```

### Agregar nuevos campos al progreso:
1. Modifica la tabla en Supabase
2. Actualiza los tipos en `src/types/TreeTypes.ts`
3. Modifica el servicio en `src/services/progressService.ts`

## 🐛 Solución de problemas

### Error de conexión a Supabase:
- Verifica las variables de entorno
- Asegúrate de que la tabla `user_progress` existe
- Revisa las políticas de RLS

### Checkboxes no aparecen:
- Verifica que el nodo no tenga hijos
- Asegúrate de que hay un ID de usuario ingresado

### Autoguardado no funciona:
- Revisa la consola del navegador para errores
- Verifica la conexión a internet
- Comprueba las credenciales de Supabase

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request 
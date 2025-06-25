import React, { useState, useEffect, useCallback } from 'react';
import MaterialTree from './components/MaterialTree';
import UserIdInput from './components/UserIdInput';
import ProgressDisplay from './components/ProgressDisplay';
import { sampleMaterialsData } from './data/sampleTreeData';
import { markLeafNodes, countLeafNodes } from './utils/treeUtils';
import { ProgressService } from './services/progressService';
import { useAutoSave } from './hooks/useAutoSave';
import { AppState } from './types/TreeTypes';
import { CircuitBoard, AlertCircle } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>({
    userId: '',
    userProgress: {},
    isLoading: false,
    lastSaved: null
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Procesar datos del árbol para marcar nodos finales
  const processedTreeData = markLeafNodes(sampleMaterialsData);
  const totalLeafNodes = countLeafNodes(processedTreeData);

  // Configurar autoguardado
  const { saveProgress, saveNodeImmediately } = useAutoSave({
    userId: appState.userId,
    userProgress: appState.userProgress,
    onSaveSuccess: () => {
      setAppState(prev => ({ ...prev, lastSaved: new Date().toISOString() }));
      setSuccessMessage('Progreso guardado automáticamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    onSaveError: (errorMsg) => {
      setError(`Error en autoguardado: ${errorMsg}`);
      setTimeout(() => setError(null), 5000);
    }
  });

  // Cargar progreso del usuario
  const loadUserProgress = useCallback(async () => {
    if (!appState.userId) return;

    setAppState(prev => ({ ...prev, isLoading: true }));
    setError(null);

    try {
      const progress = await ProgressService.getUserProgress(appState.userId);
      setAppState(prev => ({ 
        ...prev, 
        userProgress: progress,
        isLoading: false 
      }));
      setSuccessMessage('Progreso cargado exitosamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Error al cargar el progreso');
      setAppState(prev => ({ ...prev, isLoading: false }));
      setTimeout(() => setError(null), 5000);
    }
  }, [appState.userId]);

  // Manejar cambio de ID de usuario
  const handleUserIdChange = (userId: string) => {
    setAppState(prev => ({ 
      ...prev, 
      userId,
      userProgress: {},
      lastSaved: null 
    }));
    setError(null);
    setSuccessMessage(null);
  };

  // Manejar toggle de nodo
  const handleNodeToggle = useCallback(async (nodeId: string, completed: boolean) => {
    if (!appState.userId) return;

    // Actualizar estado local inmediatamente
    setAppState(prev => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        [nodeId]: completed
      }
    }));

    // Guardar inmediatamente en Supabase
    try {
      await saveNodeImmediately(nodeId, completed);
    } catch (err) {
      setError('Error al guardar el progreso');
      setTimeout(() => setError(null), 5000);
    }
  }, [appState.userId, saveNodeImmediately]);

  // Cargar progreso cuando cambia el usuario
  useEffect(() => {
    if (appState.userId) {
      loadUserProgress();
    }
  }, [appState.userId, loadUserProgress]);

  return (
    <div className="min-h-screen bg-[#0a0f1c] circuit-pattern">
      <header className="glass-effect sticky top-0 z-10 border-b border-emerald-500/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <CircuitBoard className="text-emerald-400" size={24} />
            <h1 className="text-xl font-medium text-emerald-50 tracking-tight">
              Comunidad de Inteligencia Artificial Paraguay.
            </h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mensajes de estado */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="text-red-400" size={16} />
              <span className="text-red-200">{error}</span>
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center space-x-2">
              <CircuitBoard className="text-emerald-400" size={16} />
              <span className="text-emerald-200">{successMessage}</span>
            </div>
          )}

          {/* Input de ID de usuario */}
          <UserIdInput
            userId={appState.userId}
            onUserIdChange={handleUserIdChange}
            onLoadProgress={loadUserProgress}
            isLoading={appState.isLoading}
            lastSaved={appState.lastSaved}
          />

          {/* Display de progreso */}
          {appState.userId && (
            <ProgressDisplay
              userProgress={appState.userProgress}
              totalLeafNodes={totalLeafNodes}
              userId={appState.userId}
            />
          )}

          <div className="glass-effect rounded-2xl shadow-2xl shadow-emerald-500/5 overflow-hidden">
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-emerald-50 tracking-tight mb-3">
                  Arbol de Contenido
                </h2>
                <p className="text-emerald-200/70 leading-relaxed">
                  La primera y mas grande comunidad de Inteligencia Artificial del Paraguay, aqui estan todas los contenidos.
                  {appState.userId && (
                    <span className="block mt-2 text-sm text-emerald-300/80">
                      💡 Marca los checkboxes en las ramas finales para registrar tu progreso.
                    </span>
                  )}
                </p>
              </div>
              
              <div className="glass-effect rounded-xl p-6">
                <MaterialTree 
                  data={processedTreeData}
                  userProgress={appState.userProgress}
                  onNodeToggle={handleNodeToggle}
                  userId={appState.userId}
                />
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-sm text-emerald-300/80">
                  Haz clic en un nodo para ver detalles. Usa los controles para expandir y navegar el árbol de contenido.
                  {appState.userId && (
                    <span className="block mt-1">
                      Tu progreso se guarda automáticamente cada 5 minutos.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="glass-effect border-t border-emerald-500/10 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-emerald-200/70">
          &copy; 2025 Comunidad de Inteligencia Artificial Paraguay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
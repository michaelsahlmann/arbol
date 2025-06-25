import { useEffect, useRef, useCallback } from 'react';
import { ProgressService } from '../services/progressService';

interface UseAutoSaveProps {
  userId: string;
  userProgress: Record<string, boolean>;
  onSaveSuccess?: () => void;
  onSaveError?: (error: string) => void;
  autoSaveInterval?: number; // en milisegundos, por defecto 5 minutos
}

export const useAutoSave = ({
  userId,
  userProgress,
  onSaveSuccess,
  onSaveError,
  autoSaveInterval = 5 * 60 * 1000 // 5 minutos
}: UseAutoSaveProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastProgressRef = useRef<Record<string, boolean>>({});
  const isInitializedRef = useRef(false);

  // Función para guardar progreso
  const saveProgress = useCallback(async () => {
    if (!userId || Object.keys(userProgress).length === 0) {
      return;
    }

    try {
      const success = await ProgressService.saveBulkProgress(userId, userProgress);
      
      if (success) {
        lastProgressRef.current = { ...userProgress };
        onSaveSuccess?.();
        console.log('Progreso guardado automáticamente:', new Date().toLocaleTimeString());
      } else {
        onSaveError?.('Error al guardar progreso');
      }
    } catch (error) {
      console.error('Error en autoguardado:', error);
      onSaveError?.('Error en autoguardado');
    }
  }, [userId, userProgress, onSaveSuccess, onSaveError]);

  // Función para guardar un nodo específico inmediatamente
  const saveNodeImmediately = useCallback(async (nodeId: string, completed: boolean) => {
    if (!userId) return false;

    try {
      const success = await ProgressService.saveNodeProgress(userId, nodeId, completed);
      if (success) {
        console.log(`Nodo ${nodeId} guardado inmediatamente`);
      }
      return success;
    } catch (error) {
      console.error('Error guardando nodo inmediatamente:', error);
      return false;
    }
  }, [userId]);

  // Inicializar autoguardado
  useEffect(() => {
    if (!userId || isInitializedRef.current) return;

    isInitializedRef.current = true;
    
    // Configurar intervalo de autoguardado
    intervalRef.current = setInterval(() => {
      // Solo guardar si hay cambios
      const hasChanges = JSON.stringify(lastProgressRef.current) !== JSON.stringify(userProgress);
      if (hasChanges) {
        saveProgress();
      }
    }, autoSaveInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [userId, autoSaveInterval, saveProgress]);

  // Limpiar intervalo cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Guardar inmediatamente cuando hay cambios significativos
  useEffect(() => {
    if (isInitializedRef.current && userId) {
      const hasChanges = JSON.stringify(lastProgressRef.current) !== JSON.stringify(userProgress);
      if (hasChanges) {
        // Guardar después de un pequeño delay para evitar demasiadas llamadas
        const timeoutId = setTimeout(() => {
          saveProgress();
        }, 1000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [userProgress, userId, saveProgress]);

  return {
    saveProgress,
    saveNodeImmediately
  };
}; 
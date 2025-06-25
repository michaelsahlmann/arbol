import { supabase, UserProgress } from '../lib/supabase';

export class ProgressService {
  // Obtener progreso de un usuario
  static async getUserProgress(userId: string): Promise<Record<string, boolean>> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('node_id, completed')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user progress:', error);
        return {};
      }

      const progress: Record<string, boolean> = {};
      data?.forEach((item) => {
        progress[item.node_id] = item.completed;
      });

      return progress;
    } catch (error) {
      console.error('Error in getUserProgress:', error);
      return {};
    }
  }

  // Guardar progreso de un nodo específico
  static async saveNodeProgress(userId: string, nodeId: string, completed: boolean): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          node_id: nodeId,
          completed,
          completed_at: completed ? new Date().toISOString() : null,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,node_id'
        });

      if (error) {
        console.error('Error saving node progress:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveNodeProgress:', error);
      return false;
    }
  }

  // Guardar múltiples progresos de una vez
  static async saveBulkProgress(userId: string, progress: Record<string, boolean>): Promise<boolean> {
    try {
      const progressData = Object.entries(progress).map(([nodeId, completed]) => ({
        user_id: userId,
        node_id: nodeId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('user_progress')
        .upsert(progressData, {
          onConflict: 'user_id,node_id'
        });

      if (error) {
        console.error('Error saving bulk progress:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveBulkProgress:', error);
      return false;
    }
  }
} 
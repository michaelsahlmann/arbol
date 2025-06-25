// Define the structure for a tree node
export interface TreeNode {
  id: string;
  name: string;
  link?: string;
  children?: TreeNode[];
  isCompleted?: boolean; // Para mostrar estado del checkbox
  isLeaf?: boolean; // Para identificar nodos finales (sin hijos)
}

// Tipo para el progreso del usuario
export interface UserProgress {
  user_id: string;
  node_id: string;
  completed: boolean;
  completed_at?: string;
}

// Tipo para el estado global de la aplicación
export interface AppState {
  userId: string;
  userProgress: Record<string, boolean>; // node_id -> completed
  isLoading: boolean;
  lastSaved: string | null;
}
import { TreeNode } from '../types/TreeTypes';

// Contar nodos finales (sin hijos)
export const countLeafNodes = (node: TreeNode): number => {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  
  return node.children.reduce((count, child) => count + countLeafNodes(child), 0);
};

// Obtener todos los IDs de nodos finales
export const getLeafNodeIds = (node: TreeNode): string[] => {
  if (!node.children || node.children.length === 0) {
    return [node.id];
  }
  
  return node.children.flatMap(child => getLeafNodeIds(child));
};

// Marcar nodos como finales (isLeaf)
export const markLeafNodes = (node: TreeNode): TreeNode => {
  const isLeaf = !node.children || node.children.length === 0;
  
  return {
    ...node,
    isLeaf,
    children: node.children ? node.children.map(markLeafNodes) : undefined
  };
};

// Calcular progreso del usuario
export const calculateProgress = (userProgress: Record<string, boolean>, totalLeafNodes: number): number => {
  if (totalLeafNodes === 0) return 0;
  
  const completedNodes = Object.values(userProgress).filter(Boolean).length;
  return Math.round((completedNodes / totalLeafNodes) * 100);
}; 
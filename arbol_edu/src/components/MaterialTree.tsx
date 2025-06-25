import React from 'react';
import TreeNode from './TreeNode';
import { TreeNode as TreeNodeType } from '../types/TreeTypes';

interface MaterialTreeProps {
  data: TreeNodeType;
  className?: string;
  userProgress?: Record<string, boolean>;
  onNodeToggle?: (nodeId: string, completed: boolean) => void;
  userId?: string;
}

const MaterialTree: React.FC<MaterialTreeProps> = ({ 
  data, 
  className = '',
  userProgress = {},
  onNodeToggle,
  userId
}) => {
  return (
    <div className={`material-tree ${className}`}>
      <TreeNode 
        node={data} 
        level={0} 
        isLastChild={false}
        userProgress={userProgress}
        onNodeToggle={onNodeToggle}
        userId={userId}
      />
    </div>
  );
};

export default MaterialTree;
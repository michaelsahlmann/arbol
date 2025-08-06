import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ExternalLink, CheckSquare, Square } from 'lucide-react';
import { TreeNode as TreeNodeType } from '../types/TreeTypes';

interface TreeNodeProps {
  node: TreeNodeType;
  level: number;
  isLastChild: boolean;
  userProgress?: Record<string, boolean>;
  onNodeToggle?: (nodeId: string, completed: boolean) => void;
  userId?: string;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  level, 
  isLastChild, 
  userProgress = {},
  onNodeToggle,
  userId
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren || node.children?.length === 0;
  const isCompleted = userProgress[node.id] || false;
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  const handleLinkClick = (e: React.MouseEvent, link?: string) => {
    e.stopPropagation();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStrikethrough(!isStrikethrough);
    if (onNodeToggle && userId) {
      onNodeToggle(node.id, !isCompleted);
    }
  };

  const indent = level * 28;
  
  return (
    <div className="relative tree-branch">
      {level > 0 && (
        <>
          <div
            className="tree-connector-vertical"
            style={{
              left: (level - 1) * 28 + 13,
              top: 0,
              height: isLastChild ? '24px' : '100%'
            }}
          />
          <div
            className="tree-connector-horizontal"
            style={{
              left: (level - 1) * 28 + 13,
              width: 16,
              top: '22px'
            }}
          />
          <div
            className="tree-node-pulse"
            style={{
              left: (level - 1) * 28 + 11,
              top: '21px'
            }}
          />
        </>
      )}
      
      <div
        className={`flex items-center py-2 px-3 rounded-xl transition-all duration-300 relative group ${
          isCompleted ? 'bg-emerald-500/10 border border-emerald-500/20' : ''
        }`}
        style={{ paddingLeft: `${indent}px` }}
      >
        {hasChildren ? (
          <button 
            onClick={handleToggle}
            className="mr-2 p-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20
                     shadow-lg shadow-emerald-500/5 hover:shadow-emerald-500/10 
                     transition-all duration-300 group-hover:scale-110"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown size={16} className="text-emerald-400" />
            ) : (
              <ChevronRight size={16} className="text-emerald-400" />
            )}
          </button>
        ) : (
          <div className="w-[40px]" />
        )}
        
        <div 
          onClick={(e) => handleLinkClick(e, node.link)}
          className={`flex items-center transition-all duration-300 ${
            node.link ? 'cursor-pointer hover:text-emerald-300' : ''
          } ${level === 0 ? 'text-xl font-medium tracking-tight text-emerald-200' : 'text-base text-emerald-100/90'}`}
        >
          <span className={`relative ${isStrikethrough ? 'line-through text-emerald-100/50' : ''}`}>
            {node.name}
            {node.link && (
              <ExternalLink 
                size={14} 
                className="ml-1.5 inline-block opacity-60 transition-opacity group-hover:opacity-100" 
              />
            )}
            {node.link && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/20 
                             scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </span>
        </div>

        {/* Checkbox para nodos finales */}
        {isLeaf && userId && (
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => handleCheckboxClick(e as unknown as React.MouseEvent)}
            className="ml-auto w-5 h-5 rounded-lg bg-emerald-500/10 border-emerald-500/20
                     checked:bg-emerald-500 checked:border-emerald-500
                     transition-all duration-300 cursor-pointer"
            aria-label={isCompleted ? "Marcar como incompleto" : "Marcar como completo"}
          />
        )}
      </div>
      
      {hasChildren && isExpanded && (
        <div className="tree-children ml-2">
          {node.children?.map((childNode, index) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              level={level + 1}
              isLastChild={index === (node.children?.length || 0) - 1}
              userProgress={userProgress}
              onNodeToggle={onNodeToggle}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
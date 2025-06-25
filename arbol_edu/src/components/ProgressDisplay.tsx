import React from 'react';
import { BarChart3, CheckCircle, Circle } from 'lucide-react';

interface ProgressDisplayProps {
  userProgress: Record<string, boolean>;
  totalLeafNodes: number;
  userId: string;
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({
  userProgress,
  totalLeafNodes,
  userId
}) => {
  const completedNodes = Object.values(userProgress).filter(Boolean).length;
  const progressPercentage = totalLeafNodes > 0 ? Math.round((completedNodes / totalLeafNodes) * 100) : 0;

  return (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <BarChart3 className="text-emerald-400" size={20} />
        <h3 className="text-lg font-medium text-emerald-50">
          Progreso del Usuario
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
          <div className="text-2xl font-bold text-emerald-400">{completedNodes}</div>
          <div className="text-sm text-emerald-200">Completados</div>
        </div>
        
        <div className="text-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
          <div className="text-2xl font-bold text-emerald-400">{totalLeafNodes - completedNodes}</div>
          <div className="text-sm text-emerald-200">Pendientes</div>
        </div>
        
        <div className="text-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
          <div className="text-2xl font-bold text-emerald-400">{progressPercentage}%</div>
          <div className="text-sm text-emerald-200">Progreso</div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-emerald-200 mb-2">
          <span>Progreso General</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-emerald-500/10 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Estado de autoguardado */}
      <div className="flex items-center space-x-2 text-sm text-emerald-300/80">
        <CheckCircle size={14} className="text-emerald-400" />
        <span>Autoguardado activo - Progreso sincronizado</span>
      </div>
    </div>
  );
};

export default ProgressDisplay; 
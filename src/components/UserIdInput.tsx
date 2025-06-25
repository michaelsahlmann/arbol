import React, { useState } from 'react';
import { User, Save, Loader2 } from 'lucide-react';

interface UserIdInputProps {
  userId: string;
  onUserIdChange: (userId: string) => void;
  onLoadProgress: () => void;
  isLoading: boolean;
  lastSaved: string | null;
}

const UserIdInput: React.FC<UserIdInputProps> = ({
  userId,
  onUserIdChange,
  onLoadProgress,
  isLoading,
  lastSaved
}) => {
  const [inputValue, setInputValue] = useState(userId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onUserIdChange(inputValue.trim());
    }
  };

  const handleLoadProgress = () => {
    if (userId) {
      onLoadProgress();
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <User className="text-emerald-400" size={20} />
        <h3 className="text-lg font-medium text-emerald-50">
          Identificación de Usuario
        </h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-emerald-200 mb-2">
            ID de Usuario
          </label>
          <div className="flex space-x-3">
            <input
              id="userId"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ingresa tu ID de usuario"
              className="flex-1 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 
                       rounded-lg text-emerald-100 placeholder-emerald-300/50
                       focus:outline-none focus:ring-2 focus:ring-emerald-500/50 
                       focus:border-emerald-500/50 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 
                       border border-emerald-500/30 rounded-lg text-emerald-100
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              <span>Guardar ID</span>
            </button>
          </div>
        </div>
      </form>

      {userId && (
        <div className="mt-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-200">
                <span className="font-medium">Usuario actual:</span> {userId}
              </p>
              {lastSaved && (
                <p className="text-xs text-emerald-300/70 mt-1">
                  Último guardado: {new Date(lastSaved).toLocaleString()}
                </p>
              )}
            </div>
            <button
              onClick={handleLoadProgress}
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 
                       border border-emerald-500/30 rounded-lg text-emerald-100
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Save size={14} />
              )}
              <span>Cargar Progreso</span>
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
        <p className="text-xs text-blue-300/80">
          💡 <strong>Autoguardado:</strong> Tu progreso se guarda automáticamente cada 5 minutos.
        </p>
      </div>
    </div>
  );
};

export default UserIdInput; 
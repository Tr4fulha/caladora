import React from 'react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => void;
  onDeleteEntry: (id: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  history, 
  isOpen, 
  onClose, 
  onClearHistory,
  onDeleteEntry 
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Falha ao copiar:', err);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 bg-[#1a1a1a]/95 backdrop-blur-md flex flex-col text-white rounded-3xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-black/20">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300">Histórico</h2>
        <div className="flex gap-3 items-center">
            {history.length > 0 && (
                <button 
                    onClick={onClearHistory}
                    className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded transition-colors"
                >
                    Limpar Tudo
                </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-light">Nenhum cálculo recente</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors group relative flex flex-col gap-1">
              
              <div className="flex justify-between items-start">
                 <span className="text-[10px] text-gray-500 font-mono">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
                 <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteEntry(item.id); }}
                    className="text-gray-600 hover:text-red-400 p-1 -mr-1"
                    title="Excluir"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                 </button>
              </div>

              <div className="text-right">
                  <div className="text-sm text-gray-400 mb-1 font-mono break-all">{item.expression} =</div>
                  <div 
                    className="text-xl text-white font-medium cursor-pointer active:scale-95 transition-transform inline-block"
                    onClick={() => copyToClipboard(item.result)}
                    title="Clique para copiar o resultado"
                  >
                      {item.result}
                  </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
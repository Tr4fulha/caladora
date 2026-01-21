import React, { useState } from 'react';
import { ThemeConfig } from '../types';

interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onThemeChange: (theme: ThemeConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange, isOpen, onClose }) => {
  const [customUrl, setCustomUrl] = useState('');

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 w-72 border border-gray-200 dark:border-gray-700 animate-fade-in-down">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Personalizar</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => onThemeChange({ mode: 'light' })}
          className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
            currentTheme.mode === 'light' 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300"></div>
          <span className="text-xs font-medium">Claro</span>
        </button>

        <button
          onClick={() => onThemeChange({ mode: 'dark' })}
          className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${
            currentTheme.mode === 'dark' 
            ? 'border-indigo-500 bg-gray-700 text-white' 
            : 'border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-gray-900 border border-gray-600"></div>
          <span className="text-xs font-medium">Escuro</span>
        </button>
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-500 mb-2">Papel de Parede (URL)</label>
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="https://..." 
                className="w-full text-xs p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button 
                onClick={() => {
                    if(customUrl) onThemeChange({ mode: 'custom', backgroundImage: customUrl })
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700"
            >
                OK
            </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 leading-tight">
          Cole um link de imagem para usar como fundo. O visual da calculadora ficará translúcido.
        </p>
      </div>
    </div>
  );
};

export default ThemeSelector;
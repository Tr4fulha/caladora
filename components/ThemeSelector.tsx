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

  // Função para processar o upload da imagem e converter para Base64
  // Isso permite que o app funcione offline sem precisar enviar a imagem para um servidor
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onThemeChange({ mode: 'custom', backgroundImage: base64String });
        onClose(); // Fecha o seletor após escolher a imagem para ver o resultado imediato
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-72 border border-gray-200 dark:border-gray-700 animate-fade-in-down origin-top-right">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Aparência</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => onThemeChange({ mode: 'light' })}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            currentTheme.mode === 'light' 
            ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200' 
            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-300 shadow-sm"></div>
          <span className="text-xs font-semibold">Claro</span>
        </button>

        <button
          onClick={() => onThemeChange({ mode: 'dark' })}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
            currentTheme.mode === 'dark' 
            ? 'border-indigo-500 bg-gray-700 text-white ring-2 ring-indigo-500/50' 
            : 'border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-600 shadow-sm"></div>
          <span className="text-xs font-semibold">Escuro</span>
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
          Personalizar Fundo
        </label>
        
        {/* Opção 1: Upload da Galeria (Prioritário para Mobile) */}
        <label className="flex items-center justify-center w-full p-3 mb-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700/50 group">
            <div className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-medium">Escolher da Galeria</span>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </label>

        {/* Separador */}
        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="flex-shrink mx-2 text-[10px] text-gray-400">OU URL</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        {/* Opção 2: URL (Fallback) */}
        <div className="flex gap-2 mt-2">
            <input 
                type="text" 
                placeholder="https://exemplo.com/img.jpg" 
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button 
                onClick={() => {
                    if(customUrl) {
                        onThemeChange({ mode: 'custom', backgroundImage: customUrl });
                        onClose();
                    }
                }}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
                OK
            </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
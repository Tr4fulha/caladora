import React, { useReducer, useState, useEffect } from 'react';
import { THEMES, BUTTON_LAYOUT } from './constants';
import { calculatorReducer, formatOperand, evaluate } from './services/calculatorLogic';
import ThemeSelector from './components/ThemeSelector';
import HistoryPanel from './components/HistoryPanel';
import { ThemeConfig, CalculatorActionType, HistoryItem } from './types';

function App() {
  const [theme, setTheme] = useState<ThemeConfig>({ mode: 'dark' }); // Padrão Dark Mode
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // Inicializar histórico do localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
        const saved = localStorage.getItem('eduCalcHistory');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
  });

  // Salvar histórico no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('eduCalcHistory', JSON.stringify(history));
  }, [history]);

  const [state, dispatch] = useReducer(
    calculatorReducer,
    { currentOperand: '0', previousOperand: null, operation: null, overwrite: false }
  );

  const { currentOperand, previousOperand, operation } = state;

  // Lógica para interceptar o cálculo e salvar no histórico
  const handleEvaluate = () => {
    if (operation && previousOperand && currentOperand) {
        const result = evaluate(state);
        // Só salva se o resultado for válido e não vazio
        if (result && result !== 'Erro') {
            const formattedExpression = `${formatOperand(previousOperand)} ${operation} ${formatOperand(currentOperand)}`;
            const formattedResult = formatOperand(result);
            
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                expression: formattedExpression,
                result: formattedResult,
                timestamp: Date.now()
            };
            
            // Adiciona no topo da lista
            setHistory(prev => [newItem, ...prev].slice(0, 50)); // Mantém apenas os últimos 50
        }
    }
    dispatch({ type: CalculatorActionType.EVALUATE });
  };

  const handleClearHistory = () => setHistory([]);
  const handleDeleteEntry = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  // Derive styles from constants based on current mode
  const currentStyles = THEMES[theme.mode];

  // Dynamic style for background image if custom
  const backgroundStyle = theme.mode === 'custom' && theme.backgroundImage
    ? { backgroundImage: `url(${theme.backgroundImage})` }
    : {};

  return (
    <div 
        className={`w-full h-screen flex items-center justify-center p-4 transition-colors duration-500 ease-in-out ${currentStyles.bg} relative overflow-hidden`}
        style={backgroundStyle}
    >
      {/* Overlay for readability on custom backgrounds */}
      {theme.mode === 'custom' && <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>}

      <div className={`relative w-full max-w-[360px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${currentStyles.appBg} backdrop-blur-2xl border border-white/5`}>
        
        {/* Painéis Sobrepostos (History) */}
        <HistoryPanel 
            history={history}
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
            onClearHistory={handleClearHistory}
            onDeleteEntry={handleDeleteEntry}
        />

        {/* Header / Actions */}
        <div className="flex justify-between items-center p-4 pb-2 z-10">
            {/* Botão de Histórico */}
            <button 
                onClick={() => setShowHistory(true)}
                className={`p-2 rounded-full transition-colors ${theme.mode === 'light' ? 'hover:bg-gray-200 text-gray-600' : 'hover:bg-white/10 text-white'}`}
                aria-label="Abrir Histórico"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
            </button>

            <h1 className={`text-sm font-semibold tracking-widest uppercase ${currentStyles.text} opacity-80 select-none`}>
                EduCalc
            </h1>
            
            {/* Botão de Tema */}
            <button 
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`p-2 rounded-full transition-colors ${theme.mode === 'light' ? 'hover:bg-gray-200 text-gray-600' : 'hover:bg-white/10 text-white'}`}
                aria-label="Mudar Tema"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            </button>
            <ThemeSelector 
                currentTheme={theme} 
                onThemeChange={setTheme} 
                isOpen={showThemeSelector} 
                onClose={() => setShowThemeSelector(false)} 
            />
        </div>

        {/* Display Area */}
        <div className="flex flex-col items-end justify-end p-6 h-40 break-all relative">
            <div className={`text-sm mb-2 h-6 transition-colors ${currentStyles.displaySub} font-mono`}>
                {formatOperand(previousOperand)} {operation}
            </div>
            <div className={`text-5xl font-light tracking-tight transition-colors ${currentStyles.text} font-sans`}>
                {formatOperand(currentOperand)}
            </div>
        </div>

        {/* Keypad */}
        <div className={`p-4 grid grid-cols-4 gap-3 ${theme.mode === 'custom' ? 'bg-white/5' : 'bg-transparent'}`}>
            {BUTTON_LAYOUT.map((btn, index) => {
                let btnClass = '';
                if (btn.style === 'accent') btnClass = currentStyles.btnAccent;
                else if (btn.style === 'func') btnClass = currentStyles.btnFunc;
                else btnClass = currentStyles.btn;

                const spanClass = btn.label === '=' ? 'col-span-1' : '';

                return (
                    <button
                        key={index}
                        onClick={() => {
                            if (btn.type === CalculatorActionType.EVALUATE) {
                                handleEvaluate();
                            } else {
                                dispatch({ type: btn.type, payload: btn.payload });
                            }
                        }}
                        className={`
                            ${btnClass} 
                            ${spanClass}
                            h-16 rounded-2xl text-xl font-medium transition-all duration-200 
                            active:scale-95 flex items-center justify-center select-none outline-none
                        `}
                    >
                        {btn.label}
                    </button>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
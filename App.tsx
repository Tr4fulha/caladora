import React, { useReducer, useState, useEffect } from 'react';
import { THEMES, BUTTON_LAYOUT, TOOLS } from './constants';
import { calculatorReducer, formatOperand, evaluate } from './services/calculatorLogic';
import ThemeSelector from './components/ThemeSelector';
import HistoryPanel from './components/HistoryPanel';
import { ThemeConfig, CalculatorActionType, HistoryItem } from './types';

function App() {
  const [view, setView] = useState<'home' | 'calculator'>('home');
  const [theme, setTheme] = useState<ThemeConfig>({ mode: 'dark' });
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
        const saved = localStorage.getItem('eduCalcHistory');
        return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('eduCalcHistory', JSON.stringify(history));
  }, [history]);

  const [state, dispatch] = useReducer(
    calculatorReducer,
    { currentOperand: '0', previousOperand: null, operation: null, overwrite: false }
  );

  const { currentOperand, previousOperand, operation } = state;

  const handleEvaluate = () => {
    if (operation && previousOperand && currentOperand) {
        const result = evaluate(state);
        if (result && result !== 'Erro') {
            const newItem: HistoryItem = {
                id: Date.now().toString(),
                expression: `${formatOperand(previousOperand)} ${operation} ${formatOperand(currentOperand)}`,
                result: formatOperand(result),
                timestamp: Date.now()
            };
            setHistory(prev => [newItem, ...prev].slice(0, 50));
        }
    }
    dispatch({ type: CalculatorActionType.EVALUATE });
  };

  const currentStyles = THEMES[theme.mode];
  const backgroundStyle = theme.mode === 'custom' && theme.backgroundImage
    ? { backgroundImage: `url(${theme.backgroundImage})` }
    : {};

  const renderDashboard = () => (
    <div className="flex flex-col h-full w-full max-w-md mx-auto p-4 animate-fade-in relative">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center text-xl">👤</div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conta</p>
            <p className={`text-lg font-bold ${currentStyles.text}`}>Login</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className={`p-2 ${currentStyles.text} opacity-60`}><span className="text-xl">🏆</span></button>
          <button 
            onClick={() => setShowThemeSelector(true)}
            className={`p-2 ${currentStyles.text} opacity-60`}
          >
            <span className="text-xl">⚙️</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className={`flex items-center gap-3 ${currentStyles.cardBg} p-4 rounded-2xl mb-8`}>
        <span className="opacity-40">🔍</span>
        <input 
            type="text" 
            placeholder="Pesquisar" 
            className="bg-transparent border-none outline-none w-full text-gray-400 placeholder-gray-600"
        />
      </div>

      {/* Favorites */}
      <div className="mb-8 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 px-1">
          <h2 className={`text-sm font-bold uppercase tracking-widest ${currentStyles.text} opacity-80 flex items-center gap-2`}>
            Favoritos <span className="text-[10px] rotate-90">›</span>
          </h2>
          <button className="text-gray-500">✏️</button>
        </div>

        <div className="grid grid-cols-3 gap-y-8 gap-x-4">
          {TOOLS.map((tool) => (
            <div key={tool.id} className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-3xl shadow-lg shadow-black/20`}>
                {tool.icon}
              </div>
              <div className="text-center">
                <p className={`text-[11px] font-bold ${currentStyles.text}`}>{tool.name}</p>
                <p className="text-[9px] text-gray-500 font-medium">{tool.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Calculator Button */}
      <button 
        onClick={() => setView('calculator')}
        className="absolute bottom-24 right-4 bg-[#c0cadf] text-[#1a1a1a] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold active:scale-95 transition-all"
      >
        <span className="text-xl">🔢</span>
        Calculadora
      </button>

      {/* Bottom Nav */}
      <div className="flex justify-around items-center pt-4 border-t border-white/5 pb-2">
        <button className="flex flex-col items-center gap-1">
          <div className="p-2 bg-white/10 rounded-xl">🏠</div>
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 opacity-50">
          <div className="p-2">📐</div>
          <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Categorias</span>
        </button>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className={`relative w-full max-w-[360px] h-full sm:h-auto sm:rounded-3xl rounded-xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${currentStyles.appBg} backdrop-blur-2xl border border-white/5 animate-slide-up`}>
        <HistoryPanel 
            history={history}
            isOpen={showHistory}
            onClose={() => setShowHistory(false)}
            onClearHistory={() => setHistory([])}
            onDeleteEntry={(id) => setHistory(prev => prev.filter(i => i.id !== id))}
        />

        <div className="flex justify-between items-center p-4 pb-2 z-10 shrink-0">
            <button onClick={() => setView('home')} className="p-3 text-white">←</button>
            <h1 className={`text-sm font-semibold tracking-widest uppercase ${currentStyles.text} opacity-80`}>EduCalc</h1>
            <button onClick={() => setShowHistory(true)} className="p-3 text-white">🕒</button>
        </div>

        <div className="flex flex-col items-end justify-end p-6 grow break-all min-h-[140px]">
            <div className={`text-sm mb-2 h-6 ${currentStyles.displaySub} font-mono`}>
                {formatOperand(previousOperand)} {operation}
            </div>
            <div className={`text-6xl font-light tracking-tight ${currentStyles.text} font-sans`}>
                {formatOperand(currentOperand)}
            </div>
        </div>

        <div className={`p-4 grid grid-cols-4 gap-3 ${theme.mode === 'custom' ? 'bg-white/5' : 'bg-transparent'} shrink-0`}>
            {BUTTON_LAYOUT.map((btn, index) => (
                <button
                    key={index}
                    onClick={() => btn.type === CalculatorActionType.EVALUATE ? handleEvaluate() : dispatch({ type: btn.type, payload: btn.payload })}
                    className={`
                        ${btn.style === 'accent' ? currentStyles.btnAccent : btn.style === 'func' ? currentStyles.btnFunc : currentStyles.btn} 
                        h-[12vw] max-h-20 rounded-2xl text-2xl font-medium transition-all active:scale-95 touch-manipulation
                    `}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    </div>
  );

  return (
    <div 
        className={`w-full h-[100dvh] flex items-center justify-center p-0 transition-colors duration-500 ease-in-out ${currentStyles.bg} relative overflow-hidden`}
        style={backgroundStyle}
    >
      {theme.mode === 'custom' && <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>}
      
      {view === 'home' ? renderDashboard() : renderCalculator()}

      <ThemeSelector 
          currentTheme={theme} 
          onThemeChange={setTheme} 
          isOpen={showThemeSelector} 
          onClose={() => setShowThemeSelector(false)} 
      />
    </div>
  );
}

export default App;
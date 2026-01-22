import { CalculatorActionType } from './types';

export const THEMES = {
  light: {
    bg: 'bg-gray-50',
    appBg: 'bg-white',
    cardBg: 'bg-gray-100/50',
    text: 'text-gray-900',
    displaySub: 'text-gray-500',
    btn: 'bg-white hover:bg-gray-50 active:bg-gray-200 text-gray-800 shadow-sm border border-gray-200',
    btnAccent: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md shadow-blue-500/20',
    btnFunc: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900',
    iconColor: 'text-gray-600'
  },
  dark: {
    bg: 'bg-[#0f0f0f]',
    appBg: 'bg-[#1a1a1a]',
    cardBg: 'bg-[#242424]',
    text: 'text-white',
    displaySub: 'text-gray-400',
    btn: 'bg-[#2C2C2C] hover:bg-[#383838] active:bg-[#404040] text-gray-100 border-none',
    btnAccent: 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 font-bold',
    btnFunc: 'bg-[#424242] hover:bg-[#505050] active:bg-[#606060] text-white',
    iconColor: 'text-gray-300'
  },
  custom: {
    bg: 'bg-cover bg-center bg-no-repeat',
    appBg: 'bg-black/70 backdrop-blur-md border border-white/10 shadow-2xl',
    cardBg: 'bg-white/10 backdrop-blur-sm',
    text: 'text-white drop-shadow-md',
    displaySub: 'text-gray-300',
    btn: 'bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/10 backdrop-blur-sm',
    btnAccent: 'bg-white/30 hover:bg-white/40 active:bg-white/50 text-white shadow-lg border border-white/20 backdrop-blur-md font-bold',
    btnFunc: 'bg-black/40 hover:bg-black/50 active:bg-black/60 text-white border border-white/5',
    iconColor: 'text-white'
  }
};

export const TOOLS = [
  { id: 'pct', name: 'Porcentagem', category: 'Álgebra', icon: '📊', color: 'from-orange-400 to-red-500' },
  { id: 'geo', name: 'Formas', category: 'Geometria', icon: '📐', color: 'from-yellow-400 to-orange-500' },
  { id: 'body', name: 'Corpos', category: 'Geometria', icon: '📦', color: 'from-yellow-500 to-yellow-600' },
  { id: 'len', name: 'Comprimento', category: 'Conversores', icon: '📏', color: 'from-yellow-200 to-yellow-400' },
  { id: 'wgt', name: 'Peso', category: 'Conversores', icon: '⚖️', color: 'from-gray-400 to-gray-600' },
  { id: 'vol', name: 'Volume', category: 'Conversores', icon: '🪣', color: 'from-blue-400 to-blue-600' },
  { id: 'curr', name: 'Moeda', category: 'Finanças', icon: '💰', color: 'from-yellow-400 to-yellow-500' },
  { id: 'temp', name: 'Temperatura', category: 'Conversores', icon: '🌡️', color: 'from-red-400 to-orange-500' },
  { id: 'vel', name: 'Velocidade', category: 'Conversores', icon: '🚗', color: 'from-red-500 to-red-600' },
];

export const BUTTON_LAYOUT = [
  { label: 'C', type: CalculatorActionType.CLEAR, style: 'func' },
  { label: '±', type: CalculatorActionType.TOGGLE_SIGN, style: 'func' },
  { label: '%', type: CalculatorActionType.PERCENTAGE, style: 'func' },
  { label: '÷', type: CalculatorActionType.CHOOSE_OPERATION, payload: '÷', style: 'accent' },
  { label: '7', type: CalculatorActionType.ADD_DIGIT, payload: '7', style: 'normal' },
  { label: '8', type: CalculatorActionType.ADD_DIGIT, payload: '8', style: 'normal' },
  { label: '9', type: CalculatorActionType.ADD_DIGIT, payload: '9', style: 'normal' },
  { label: '×', type: CalculatorActionType.CHOOSE_OPERATION, payload: '×', style: 'accent' },
  { label: '4', type: CalculatorActionType.ADD_DIGIT, payload: '4', style: 'normal' },
  { label: '5', type: CalculatorActionType.ADD_DIGIT, payload: '5', style: 'normal' },
  { label: '6', type: CalculatorActionType.ADD_DIGIT, payload: '6', style: 'normal' },
  { label: '-', type: CalculatorActionType.CHOOSE_OPERATION, payload: '-', style: 'accent' },
  { label: '1', type: CalculatorActionType.ADD_DIGIT, payload: '1', style: 'normal' },
  { label: '2', type: CalculatorActionType.ADD_DIGIT, payload: '2', style: 'normal' },
  { label: '3', type: CalculatorActionType.ADD_DIGIT, payload: '3', style: 'normal' },
  { label: '+', type: CalculatorActionType.CHOOSE_OPERATION, payload: '+', style: 'accent' },
  { label: '.', type: CalculatorActionType.ADD_DIGIT, payload: '.', style: 'normal' },
  { label: '0', type: CalculatorActionType.ADD_DIGIT, payload: '0', style: 'normal' },
  { label: '⌫', type: CalculatorActionType.DELETE, style: 'normal' },
  { label: '=', type: CalculatorActionType.EVALUATE, style: 'accent' },
];
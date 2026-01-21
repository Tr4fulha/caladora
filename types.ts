export type ThemeMode = 'light' | 'dark' | 'custom';

export interface ThemeConfig {
  mode: ThemeMode;
  backgroundImage?: string; // URL or Base64 for custom wallpaper
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export enum CalculatorActionType {
  ADD_DIGIT = 'ADD_DIGIT',
  CHOOSE_OPERATION = 'CHOOSE_OPERATION',
  CLEAR = 'CLEAR',
  DELETE = 'DELETE',
  EVALUATE = 'EVALUATE',
  PERCENTAGE = 'PERCENTAGE',
  TOGGLE_SIGN = 'TOGGLE_SIGN'
}

export interface CalculatorState {
  currentOperand: string;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean; // Flag to check if we just finished a calculation
}

export interface CalculatorAction {
  type: CalculatorActionType;
  payload?: string;
}
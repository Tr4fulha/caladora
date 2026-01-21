import { CalculatorState, CalculatorAction, CalculatorActionType } from '../types';

// Pure function helper for formatting numbers
const INTEGER_FORMATTER = new Intl.NumberFormat('pt-BR', {
  maximumFractionDigits: 0,
});

export const formatOperand = (operand: string | null): string => {
  if (operand == null) return '';
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))},${decimal}`;
};

// Exported so App.tsx can use it to generate history entries before dispatching
export const evaluate = ({ currentOperand, previousOperand, operation }: CalculatorState): string => {
  const prev = parseFloat(previousOperand || '0');
  const current = parseFloat(currentOperand || '0');
  if (isNaN(prev) || isNaN(current)) return '';

  let computation = 0;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
      computation = prev * current;
      break;
    case '÷':
      if (current === 0) return 'Erro'; // Handle division by zero
      computation = prev / current;
      break;
  }

  return computation.toString();
};

export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case CalculatorActionType.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload || '',
          overwrite: false,
        };
      }
      if (action.payload === '0' && state.currentOperand === '0') return state;
      if (action.payload === '.' && state.currentOperand.includes('.')) return state;
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.payload}`,
      };

    case CalculatorActionType.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload || null,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload || null,
          previousOperand: state.currentOperand,
          currentOperand: '',
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload || null,
        currentOperand: '',
      };

    case CalculatorActionType.CLEAR:
      return {
        currentOperand: '0',
        previousOperand: null,
        operation: null,
        overwrite: false,
      };

    case CalculatorActionType.DELETE:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: '0',
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: '0' };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case CalculatorActionType.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case CalculatorActionType.PERCENTAGE:
        if (state.currentOperand == null) return state;
        return {
            ...state,
            currentOperand: (parseFloat(state.currentOperand) / 100).toString(),
            overwrite: true
        }
    
    case CalculatorActionType.TOGGLE_SIGN:
        if (!state.currentOperand) return state;
        const current = parseFloat(state.currentOperand);
        if (current === 0) return state;
        return {
            ...state,
            currentOperand: (current * -1).toString()
        }

    default:
      return state;
  }
};
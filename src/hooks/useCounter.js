import { useEffect, useReducer, useCallback } from 'react';

const counterReducer = (state, action) => {
  const { type, payload } = action;
  const { value, minValue, maxValue, step } = state;

  switch (type) {
    case 'DEC':
      return { ...state, value: value - step < minValue ? minValue : value - step };
    case 'INC':
      return { ...state, value: value + step > maxValue ? value : value + step };
    case 'CHANGE':
      return { ...state, value: payload };
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export default function useCounter({ setQuantity, id, step, minValue, maxValue, initialValue }) {
  const [{ value }, dispatch] = useReducer(counterReducer, {
    value: initialValue,
    id,
    minValue,
    maxValue,
    step,
  });

  const increment = useCallback(() => {
    dispatch({ type: 'INC' });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: 'DEC' });
  }, []);

  const onChangeValue = useCallback((e) => {
    const val = e.target.value;
    const sanitized = val.replace(/[^0-9]/g, '');
    dispatch({ type: 'CHANGE', payload: sanitized });
  }, []);

  useEffect(() => {
    if (value > 0) {
      setQuantity((prevState) => ({ ...prevState, ...{ [id]: value } }));
    } else {
      setQuantity((prevState) => {
        return Object.entries(prevState)
          .filter(([key, _]) => key !== id.toString())
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      });
    }
  }, [value, id, setQuantity]);

  return { increment, decrement, onChangeValue, value };
}

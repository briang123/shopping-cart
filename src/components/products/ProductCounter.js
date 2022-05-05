import React from 'react';
import { useCounter } from '../../hooks';
import { CounterButton } from '../../App.styles';

export const ProductCounter = ({ productId, setProductQuantity }) => {
  const { decrement, increment, onChangeValue, value } = useCounter({
    setQuantity: setProductQuantity,
    id: productId,
    step: 1,
    minValue: 0,
    maxValue: 10,
    initialValue: 1,
  });

  return (
    <div>
      <CounterButton onClick={decrement}>-</CounterButton>
      <input type="text" onChange={onChangeValue} value={value} />
      <CounterButton onClick={increment}>+</CounterButton>
    </div>
  );
};

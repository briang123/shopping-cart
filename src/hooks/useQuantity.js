import { useState } from 'react';

export default function useQuantity() {
  const [quantity, setQuantity] = useState({});

  const getQuantity = (key) => {
    const [value] = Object.entries(quantity)
      .filter(([k, _]) => k === key.toString())
      .map(([_, value]) => value);

    return value ?? 0;
  };

  return { setQuantity, getQuantity };
}

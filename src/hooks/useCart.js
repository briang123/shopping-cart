import { useState } from 'react';
import { convertToUSD } from './../common/utils';
import useQuantity from './useQuantity';

export default function useCart({ data = [] }) {
  const [cart, setCart] = useState([]);

  const { setQuantity, getQuantity } = useQuantity();

  const updateProductForCart = (products, productId) => {
    const quantity = getQuantity(productId);
    return products?.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity, amount: quantity * product.price };
      }
      return product;
    });
  };

  const getProductToAddToCart = (productId) => {
    const quantity = getQuantity(productId);
    return data
      .filter((product) => product.id === productId)
      .map((product) => {
        return { ...product, quantity, amount: quantity * product.price };
      });
  };

  const isInCart = (productId) => cart.findIndex(({ id }) => id === productId) > -1;

  const removeCartItem = (productId) => cart?.filter(({ id }) => id !== productId);

  const updateCartItem = (productId) => {
    setCart((prevCart) => {
      updateProductForCart(prevCart || [], productId);
    });
  };

  const addToCart = (productId) => {
    const quantity = getQuantity(productId);
    if (quantity > 0) {
      const existsInCart = isInCart(productId);
      if (existsInCart) {
        const updates = updateCartItem(productId);
        setCart(updates);
        return;
      }
      setCart((prevCart) =>
        prevCart
          ? [...prevCart, ...getProductToAddToCart(productId)]
          : getProductToAddToCart(productId),
      );
    } else {
      const newCartItems = removeCartItem(productId);
      setCart(newCartItems);
    }
  };

  const removeFromCart = (productId) => {
    setCart(removeCartItem(productId));
  };

  const getCartSubTotal = () => {
    const total = cart.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
    return convertToUSD(total);
  };

  return {
    addToCart,
    cartData: cart,
    cartIsEmpty: cart?.length === 0,
    convertToUSD,
    getProductQuantity: getQuantity,
    isInCart,
    removeFromCart,
    setCart,
    setProductQuantity: setQuantity,
    subTotal: getCartSubTotal(),
  };
}

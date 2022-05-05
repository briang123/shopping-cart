import React from 'react';
import { useFetch, useCart } from '../../hooks';
import { ProductsContainer } from './Products.styles';
import { LoadingIndicator } from '../Loader/LoadingIndicator';
import { ShoppingCart } from './ShoppingCart';
import { ProductCard } from './ProductCard';

export const ProductsWithCart = () => {
  const { results: products, isLoading } = useFetch('https://fakestoreapi.com/products');

  const {
    addToCart,
    cartData,
    cartIsEmpty,
    convertToUSD,
    getProductQuantity,
    isInCart,
    removeFromCart,
    setProductQuantity,
    subTotal,
  } = useCart({ data: products });

  return (
    <>
      <ProductsContainer>
        <LoadingIndicator isLoading={isLoading || !products} />
        {products?.map((product) => {
          return (
            <ProductCard
              product={product}
              convertToUSD={convertToUSD}
              isInCart={isInCart}
              setProductQuantity={setProductQuantity}
              addToCart={addToCart}
              getProductQuantity={getProductQuantity}
            />
          );
        })}
      </ProductsContainer>
      <ShoppingCart
        cartData={cartData}
        convertToUSD={convertToUSD}
        removeFromCart={removeFromCart}
        cartIsEmpty={cartIsEmpty}
        subTotal={subTotal}
      />
    </>
  );
};

export default ProductsWithCart;

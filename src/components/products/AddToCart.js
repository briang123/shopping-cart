import React from 'react';
import { AddToCheckoutContainer, InCartLabel, AddToCartButton } from './Products.styles';
import { ProductCounter } from './ProductCounter';

export function AddToCart({ id, isInCart, setProductQuantity, addToCart, getProductQuantity }) {
  return isInCart(id) ? (
    <InCartLabel>Added to Cart</InCartLabel>
  ) : (
    <AddToCheckoutContainer>
      <ProductCounter productId={id} setProductQuantity={setProductQuantity} />
      <AddToCartButton onClick={() => addToCart(id)} disabled={!getProductQuantity(id)}>
        Add to Cart
      </AddToCartButton>
    </AddToCheckoutContainer>
  );
}

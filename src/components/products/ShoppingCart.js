import React from 'react';
import {
  CartContainer,
  ProductDetailsAndControls,
  Image,
  CartProductRow,
  CartImageContainer,
  CartProductDetails,
  CartProductTitle,
  CartTotalPriceContainer,
  RemoveCartButton,
  SubTotalRow,
  CheckoutButton,
  CartEmptyMessage,
} from './Products.styles';

export function ShoppingCart({ cartData, convertToUSD, removeFromCart, cartIsEmpty, subTotal }) {
  return (
    <CartContainer>
      <h1>Shopping Cart</h1>
      {cartData?.map(({ id, image, title, quantity, amount }) => (
        <CartProductRow key={id}>
          <CartImageContainer>
            <Image src={image} alt="" />
          </CartImageContainer>
          <ProductDetailsAndControls>
            <CartProductDetails>
              <CartProductTitle>{title}</CartProductTitle>
              <CartTotalPriceContainer>
                <label>Total Price:</label>
                <label>
                  {convertToUSD(amount)} - Qty: {quantity}
                </label>
                <RemoveCartButton onClick={() => removeFromCart(id)}>
                  &times; Delete
                </RemoveCartButton>
              </CartTotalPriceContainer>
            </CartProductDetails>
          </ProductDetailsAndControls>
        </CartProductRow>
      ))}
      {cartIsEmpty ? (
        <CartEmptyMessage>Cart is Empty</CartEmptyMessage>
      ) : (
        <>
          <SubTotalRow>
            <h3>Order Total:</h3>
            <h3>{subTotal}</h3>
          </SubTotalRow>
          <CheckoutButton>CHECKOUT</CheckoutButton>
        </>
      )}
    </CartContainer>
  );
}

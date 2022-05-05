import React from 'react';
import {
  ProductRow,
  ProductDetailsAndControls,
  ProductDetails,
  ImageContainer,
  Title,
  Price,
  Description,
  Category,
  BottomRow,
  TopRow,
  Controls,
  Image,
  RatingContainer,
  RatingFill,
} from './Products.styles';
import { AddToCart } from './AddToCart';

export function ProductCard({
  product,
  convertToUSD,
  isInCart,
  setProductQuantity,
  addToCart,
  getProductQuantity,
}) {
  const { id, image, price, title, description, category, rating } = product;

  return (
    <ProductRow key={id}>
      <ImageContainer>
        <Image src={image} alt="" />
      </ImageContainer>
      <ProductDetailsAndControls>
        <ProductDetails>
          <TopRow>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </TopRow>
          <BottomRow>
            <Category>{category}</Category>
            <RatingContainer>
              <RatingFill rating={rating.rate}>{rating.count}</RatingFill>
            </RatingContainer>
          </BottomRow>
        </ProductDetails>
        <Controls>
          <Price>{convertToUSD(price)}</Price>
          <AddToCart
            id={id}
            isInCart={isInCart}
            setProductQuantity={setProductQuantity}
            addToCart={addToCart}
            getProductQuantity={getProductQuantity}
          />
        </Controls>
      </ProductDetailsAndControls>
    </ProductRow>
  );
}

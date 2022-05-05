import styled, { css } from 'styled-components';

export const ProductRow = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--shade3);
  margin-right: 30px;
  display: flex;
  justify-content: flex-start;
  height: auto;
`;

export const ProductsContainer = styled.section`
  border: var(--debug-border);
  width: calc(100% - 450px);
  ${ProductRow}:nth-child(1) {
    border-top: 1px solid var(--shade3);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
`;

export const ImageContainer = styled.div`
  width: 150px;
  min-width: 150px;
  padding: 20px;
  background-color: var(--white);
  border-radius: 10px;
`;

export const RatingContainer = styled.div`
  width: 75px;
  height: 20px;
  border-radius: 10px;
  margin-left: 40px;
  padding: 0px;
  border: 1px solid var(--checkout);
  overflow: hidden;
  position: relative;
`;

export const RatingFill = styled.div`
  ${({ rating }) => css`
    height: 100%;
    display: block;
    width: ${(rating / 5) * 100}%;
    color: var(--white);
    line-height: 1.6rem;
    font-size: 0.8em;
    font-weight: 500;
    position: absolute;
    text-align: end;
    padding-right: 5px;
    background-color: var(--checkout);
  `}
`;

export const ProductDetailsAndControls = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 30px;
  width: 60%;
`;

export const TopRow = styled.div`
  margin-bottom: 20px;
`;
export const Title = styled.h3`
  margin-bottom: 1.2rem;
`;
export const Price = styled.h4``;
export const Description = styled.div``;
export const BottomRow = styled.div`
  display: flex;
  gap: 50;
  align-items: center;
`;

export const Category = styled.span`
  font-size: 0.8em;
  letter-spacing: 1.2px;
  background-color: var(--shade3);
  padding: 4px 8px;
  border-radius: 8px;
`;

export const Controls = styled.div`
  width: auto;
  min-width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
`;

export const AddToCheckoutContainer = styled.div`
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & input {
    width: 50px;
    border-radius: 8px;
    font-weight: 700;
    text-align: center;
    height: 30px;
    border: none;
    margin: 0px 5px;
  }
`;

export const Button = styled.button`
  text-align: center;
  border: none;
  margin: 0px 5px;
  padding: 8px 12px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const InCartLabel = styled.h3`
  margin: 10px 0;
  color: var(--checkout);
`;

export const AddToCartButton = styled(Button)`
  background-color: var(--primary);
  margin: 20px 0px;
  &:disabled {
    cursor: default;
  }
`;

export const CounterButton = styled(Button)`
  text-align: center;
  height: 30px;
  border: none;
  margin: 0px 5px;
  background: none;
  font-size: 1.5em;
`;

export const CartContainer = styled.section`
  top: 25px;
  width: 450px;
  height: 100%;
  background-color: var(--shade3);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
`;

export const CartProductRow = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid var(--shade4);
  display: flex;
  justify-content: flex-start;
  height: auto;
`;

export const CartImageContainer = styled.div`
  width: 50px;
  min-width: 50px;
  padding: 5px;
  background-color: var(--white);
  border-radius: 10px;
`;

export const CartProductDetails = styled.div`
  padding: 0px 15px;
  width: 100%;
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const CartProductTitle = styled.div`
  font-weight: 600;
  text-align: left;
`;

export const CartTotalPriceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & label {
    font-weight: bold;
  }
`;

export const RemoveCartButton = styled(Button)`
  background-color: var(--danger);
  color: var(--white);
  font-size: 0.9em;
  height: 1.5rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
`;

export const SubTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0px 50px;
  font-size: 1.2rem;
`;

export const CheckoutButton = styled(Button)`
  background-color: var(--checkout);
  color: var(--white);
  margin: 20px 0px;
  &:disabled {
    cursor: default;
  }
`;

export const CartEmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px;
  font-size: 2rem;
  color: var(--shade4);
  font-weight: 600;
`;

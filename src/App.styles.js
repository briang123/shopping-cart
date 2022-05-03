import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 75px;
  height: 100vh;
  width: 100vw;
`;

export const Wrapper = styled.section`
  width: 80vw;
  background-color: var(--shade1);
  border-radius: 8px;
  padding: 40px;
  display: flex;
`;

export const ProductRow = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--shade3);
  margin-right: 30px;
  display: flex;
  justify-content: flex-start;
  height: auto;
  /* align-items: center; */
`;

export const Products = styled.section`
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
export const BottomRow = styled.div``;

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

export const CheckoutButton = styled(Button)`
  background-color: var(--shade3);
  margin: 20px 0px;
`;

export const CounterButton = styled(Button)`
  text-align: center;
  height: 30px;
  border: none;
  margin: 0px 5px;
  background: none;
  font-size: 1.5em;
`;

export const Checkout = styled.section`
  position: sticky;
  top: 50px;
  width: 450px;
  min-height: 600px;
  height: 80vh;
  background-color: var(--shade3);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

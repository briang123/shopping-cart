import React, { useReducer, useCallback } from 'react';
import useFetch from './hooks/useFetch';
import {
  Checkout,
  Container,
  Wrapper,
  Products,
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
  AddToCheckoutContainer,
  CounterButton,
  CheckoutButton,
  Image,
} from './App.styles';

const convertToUSD = (someNumber) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(someNumber);
};

function App() {
  const { results, isLoading } = useFetch('https://fakestoreapi.com/products');

  let categories = [];
  if (results && !isLoading) {
    categories = [...new Set(results.map(({ category }) => category))];
  }

  return (
    <>
      <h1>Shopping Cart</h1>
      <Container>
        <Wrapper>
          <Products>
            <LoadingIndicator isLoading={isLoading || !results} />
            <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
              {categories.map((cat) => (
                <CheckoutButton style={{ margin: '0px 10px' }} key={cat}>
                  {cat}
                </CheckoutButton>
              ))}
            </div>
            {results?.map(({ id, title, price, category, description, image }) => {
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
                      </BottomRow>
                    </ProductDetails>
                    <Controls>
                      <Price>{convertToUSD(price)}</Price>
                      <AddToCheckoutContainer>
                        <ProductCounter />
                        <CheckoutButton onClick={() => null}>Add to Checkout</CheckoutButton>
                      </AddToCheckoutContainer>
                    </Controls>
                  </ProductDetailsAndControls>
                </ProductRow>
              );
            })}
          </Products>
          <Checkout>
            <h1>Checkout</h1>
            <div>hellow</div>
            <div>hello</div>
          </Checkout>
        </Wrapper>
      </Container>
    </>
  );
}

export default App;

const productCounterReducer = (state, action) => {
  const { type, payload } = action;
  const { value } = state;

  const MAX_CART_ITEMS = 50;
  switch (type) {
    case 'DEC':
      return { ...state, value: value - 1 < 0 ? 0 : value - 1 };
    case 'INC':
      return { ...state, value: value + 1 > MAX_CART_ITEMS ? value : value + 1 };
    case 'CHANGE':
      return { ...state, value: payload };
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

export const ProductCounter = ({ productId }) => {
  const [{ value }, dispatch] = useReducer(productCounterReducer, {
    value: 0,
    productId,
  });

  const increment = useCallback(() => {
    dispatch({ type: 'INC' });
  }, []);

  const decrement = useCallback(() => {
    dispatch({ type: 'DEC' });
  }, []);

  const onChange = useCallback((e) => {
    const val = e.target.value;
    const sanitized = val.replace(/[^0-9]/g, '');
    dispatch({ type: 'CHANGE', payload: sanitized });
  }, []);

  return (
    <div>
      <CounterButton onClick={decrement}>-</CounterButton>
      <input type="text" onChange={onChange} value={value} />
      <CounterButton onClick={increment}>+</CounterButton>
    </div>
  );
};

export const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ color: 'var(--shade4)', fontWeight: 700, fontSize: '2.5rem' }}>
        Fetching Products...
      </div>
    </div>
  ) : null;
};

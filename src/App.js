import React from 'react';
import { Heading, Container, Wrapper } from './App.styles';
import ProductsWithCart from './components/products/ProductsWithCart';

function App() {
  return (
    <>
      <Heading>
        <h1>Brian's Demo Store</h1>
      </Heading>
      <Container>
        <Wrapper>
          <ProductsWithCart />
        </Wrapper>
      </Container>
    </>
  );
}

export default App;

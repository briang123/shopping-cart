import React, { useReducer, useState, useCallback, useContext } from 'react';
import CartStateContext from './CartStateContext';
import useFetch from './hooks/useFetch';
import {
  Heading,
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
  InCartLabel,
  AddToCartButton,
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
  RatingContainer,
  RatingFill,
} from './App.styles';

const convertToUSD = (someNumber) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(someNumber);
};

function App() {
  const { results, isLoading } = useFetch('https://fakestoreapi.com/products');
  const [cart, setCart] = useState([]);
  const [productQuantity, setProductQuantity] = useState({});

  // let categories = [];
  // if (results && !isLoading) {
  //   categories = [...new Set(results.map(({ category }) => category))];
  // }

  // const filterDataByCategory = useCallback(
  //   (cat) => {
  //     const data = cat ? results?.filter(({ category }) => category === cat) : results;
  //     setData(data);
  //   },
  //   [results],
  // );

  const getProductQuantity = (productId) => {
    const [value] = Object.entries(productQuantity)
      .filter(([key, _]) => key === productId.toString())
      .map(([_, value]) => value);

    return value ?? 0;
  };

  const productExistsInCart = (productId) => cart.findIndex(({ id }) => id === productId) > -1;

  const updateProductForCart = (products, productId) => {
    const quantity = getProductQuantity(productId);
    return products?.map((product) => {
      if (product.id === productId) {
        return { ...product, ...{ quantity, amount: quantity * product.price } };
      }
      return product;
    });
  };

  const getProductToAddToCart = (productId) => {
    const quantity = getProductQuantity(productId);
    return results
      .filter((product) => product.id === productId)
      .map((product) => {
        return { ...product, quantity, amount: quantity * product.price };
      });
  };

  const removeCartItem = (productId) => cart?.filter(({ id }) => id !== productId);

  const updateCartItem = (productId) => {
    setCart((prevCart) => {
      updateProductForCart(prevCart || [], productId);
    });
  };

  const handleAddToCart = (productId) => {
    const quantity = getProductQuantity(productId);
    if (quantity > 0) {
      const existsInCart = productExistsInCart(productId);
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

  const handleRemoveFromCart = (productId) => {
    setCart(removeCartItem(productId));
  };

  const getCartSubTotal = () => {
    const total = cart.reduce((prev, cur) => {
      return prev + cur.amount;
    }, 0);
    return convertToUSD(total);
  };

  return (
    <>
      <Heading>
        <h1>Digggz Apparel, Accessories, and Tek</h1>
      </Heading>
      <Container>
        <Wrapper>
          {/* <CartStateContext.Provider value={{ setCheckout, setProductQuantity }}> */}
          <Products>
            <LoadingIndicator isLoading={isLoading || !results} />
            {/* <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
              {categories.map((cat) => (
                <AddToCartButton
                  // onClick={() => filterDataByCategory(cat)}
                  style={{ margin: '0px 10px' }}
                  key={cat}
                >
                  {cat}
                </AddToCartButton>
              ))}
            </div> */}
            {results?.map(({ id, title, price, category, description, rating, image }) => {
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
                      {productExistsInCart(id) ? (
                        <InCartLabel>Added to Cart</InCartLabel>
                      ) : (
                        <AddToCheckoutContainer>
                          <ProductCounter productId={id} setProductQuantity={setProductQuantity} />
                          <AddToCartButton
                            onClick={() => handleAddToCart(id)}
                            disabled={!getProductQuantity(id)}
                          >
                            Add to Cart
                          </AddToCartButton>
                        </AddToCheckoutContainer>
                      )}
                    </Controls>
                  </ProductDetailsAndControls>
                </ProductRow>
              );
            })}
          </Products>
          <Checkout>
            <h1>Shopping Cart</h1>
            {cart?.map(({ id, image, title, description, quantity, amount, price }) => (
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
                      <RemoveCartButton onClick={() => handleRemoveFromCart(id)}>
                        &times; Delete
                      </RemoveCartButton>
                    </CartTotalPriceContainer>
                  </CartProductDetails>
                </ProductDetailsAndControls>
              </CartProductRow>
            ))}
            {cart?.length > 0 ? (
              <>
                <SubTotalRow>
                  <h3>Order Total:</h3>
                  <h3>{getCartSubTotal()}</h3>
                </SubTotalRow>
                <CheckoutButton>CHECKOUT</CheckoutButton>
              </>
            ) : (
              <CartEmptyMessage>Cart is Empty</CartEmptyMessage>
            )}
          </Checkout>
          {/* </CartStateContext.Provider> */}
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

export const ProductCounter = ({ productId, setProductQuantity }) => {
  const [{ value }, dispatch] = useReducer(productCounterReducer, {
    value: 1,
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

  React.useEffect(() => {
    if (value > 0) {
      setProductQuantity((prevState) => ({ ...prevState, ...{ [productId]: value } }));
    } else {
      setProductQuantity((prevState) => {
        return Object.entries(prevState)
          .filter(([key, _]) => key !== productId.toString())
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
      });
    }
  }, [value, productId, setProductQuantity]);

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

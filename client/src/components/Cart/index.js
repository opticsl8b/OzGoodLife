import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";
import { AddShoppingCart } from "@material-ui/icons";
import styled from "styled-components";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  min-width: 20%;
  max-width: 30%;
  max-height: 60%;
  background-color: #fafafa;
  overflow: auto;
  padding: 0.5rem;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 0.5rem;
`;

const Title = styled.h2`
  font-size: 24px;
  border-bottom: 1px solid #272f32;
  padding-bottom: 8px;
  margin: 16px 0;
`;

const Close = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: black;
`;

const CartDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CartSum = styled.strong``;
// const Container = styled.div``;

const CartIcon = styled.span`
  border: 2px solid teal;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1.5px solid gray;
  padding: 10px;
  cursor: pointer;
  background-color: Gray;
  color: White;
  font-weight: 600;
`;

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <CartIcon role="img" aria-label="trash">
          <AddShoppingCart style={{ fontSize: 30 }} />
        </CartIcon>
      </div>
    );
  }

  return (
    <Container>
      <Close onClick={toggleCart}>[close]</Close>
      <Title>Shopping Cart</Title>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <CartDetail className="flex-row space-between">
            <CartSum>Total: ${calculateTotal()}</CartSum>

            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout}>Checkout</Button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </CartDetail>
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </Container>
  );
};

export default Cart;

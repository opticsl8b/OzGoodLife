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
import { Link } from "react-router-dom";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CartClosed = styled.div`
  position: fixed;
  bottom: 4%;
  right: 3%;
  font-size: 40px;
  cursor: pointer;
  background-color: none;
  border-radius: 50%;
  padding: 10px;
  width: 50px;
  height: 50px;

  :hover {
    transition: all 2s;
    transform: rotate(-360deg);
  }
`;

const CartIcon = styled.div`
  /* background-color: white; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  min-width: 20%;
  max-width: 30%;
  max-height: 60%;
  background-color: #fafafa;
  overflow: auto;
  padding: 4px;
  box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 8px;
  z-index: 20;
`;

const Close = styled.div`
  position: absolute;
  top: 12px;
  right: 6px;
  cursor: pointer;
  color: black;
  font-size: 24px;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.p`
  font-size: 24px;
  border-bottom: 2px solid gray;
  padding-bottom: 8px;
  margin: 10px 0;
  padding-left: 12px;
`;

const CartDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 2px solid gray;
  align-items: center;
`;

const CartSum = styled.strong`
  font-size: 24px;
  margin-left: 20px;
`;

const Button = styled.button`
  border: 1px solid teal;
  background: none;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 8px;

  cursor: pointer;
  margin: 10px;
  transition: 0.8s;
  position: relative;
  overflow: hidden;
  color: #fff;
  &:hover {
    color: teal;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 0%;
    background: teal;
    z-index: -1;
    transition: 0.8s;

    top: 0;
    border-radius: 0 0 50% 50%;
    height: 180%;
  }
  &:hover::before {
    height: 0%;
  }
`;

const EmptyText = styled.p`
  font-size: 20px;
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
      <CartClosed onClick={toggleCart}>
        <CartIcon>
          <AddShoppingCart
            style={{
              fontSize: "45px",
              padding: "10px",
              border: "3px solid teal",
              borderRadius: "50%",
              color: "teal",
              boxShodow: "20px 20px 20px 10px black",
            }}
          />
        </CartIcon>
      </CartClosed>
    );
  }

  return (
    <Container>
      <Close onClick={toggleCart}>[X]</Close>
      <Title>Shopping Cart</Title>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <CartDetail>
            <CartSum>Total: $ {calculateTotal()}</CartSum>

            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout}>Checkout</Button>
            ) : (
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "16px",
                }}
              >
                <b>(log in to check out)</b>
              </Link>
            )}
          </CartDetail>
        </div>
      ) : (
        <EmptyText>
          🤷‍♀️🤷‍♂️ You haven't added anything to your cart yet!🤷‍♀️🤷‍♂
        </EmptyText>
      )}
    </Container>
  );
};

export default Cart;

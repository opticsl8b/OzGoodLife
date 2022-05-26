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
  background-color: whitesmoke;
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
  background-color: white;
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
  z-index: 3;
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

const Title = styled.h2`
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
  border-top: 2px solid gray; ;
`;

const CartSum = styled.strong`
  font-size: 24px;
  margin: 12px 12px 0 12px;
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
      <CartClosed className="cart-closed" onClick={toggleCart}>
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

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";
import styled from "styled-components";
import Annoucement from "../components/Annoucement";

const Container = styled.div`
  width: 25%;
  text-align: center;
  position: relative;
  margin: 16px;
  left: 25%;
`;

const Card = styled.div`
  border: 1px solid teal;
  border-radius: 8px;
  box-shadow: 6px 6px 2px 2px teal;
  position: relative;
  width: 640px;
  height: 450px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 16px;
  padding-bottom: 12px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #53c99e;
    clip-path: circle(150px at 80% 20%);
    transition: 0.5s ease-in-out;
  }

  &:hover:before {
    clip-path: circle(400px at 80% -20%);
  }

  &:after {
    content: "OzGoodLife";

    position: absolute;
    top: 30%;
    left: -10%;
    font-size: 9em;
    font-weight: 800;
    font-style: italic;
    color: rgba(189, 242, 223, 0.5);
  }
`;

const ImageBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  width: 100%;
  height: 2;
  height: 220px;
  transition: 0.5s;

  ${Card}:hover & {
    top: 0%;
    transform: translateY(10%);
  }
`;

const Img = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(25deg);
  width: 270px;
`;

const ContentBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  text-align: center;
  transition: 1s;
  z-index: 10;

  ${Card}:hover & {
    height: 170px;
  }
`;

const TitleH2 = styled.h2`
  position: relative;
  font-weight: 800;
  letter-spacing: 1;
  text-shadow: 1px 1px #b1c9c1;
  color: teal;
  margin-bottom: 6%;
  font-size: 24px;
`;

const Desc = styled.span`
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;

  width: 80%;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  background: white;
  margin: 0 5px;
  transition: 0.5s;
  color: teal;
  border-radius: 4px;

  ${Card}:hover & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
`;

const Price = styled.span`
  border: 1px solid teal;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 8px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;

  width: 42px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  display: inline-block;
  background: white;
  margin: 10px 5px;
  transition: 0.5s;
  color: teal;
  border-radius: 4px;

  ${Card}:hover & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.5s;
  }
`;

const AddButton = styled.a`
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  padding: 10px 20px;
  background: white;
  border: 1px solid teal;
  border-radius: 4px;
  margin-top: 10px;
  text-decoration: none;
  font-weight: 600;
  color: teal;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.75s;
  }

  &:hover {
    background-color: teal;
    color: white;
    transition: 0.3s;
  }
`;

const RemoveButton = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 10px 20px;
  background: white;
  border: 1px solid teal;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
  color: teal;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.9s;
  }

  &:hover {
    background-color: teal;
    color: white;
    transition: 0.3s;
  }
`;

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  return (
    <>
      <Annoucement />
      {/* {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart /> */}

      {currentProduct && cart ? (
        <Container>
          <Card>
            <ImageBox>
              <Img
                alt={currentProduct.name}
                src={`/images/${currentProduct.image}`}
              />
            </ImageBox>

            <ContentBox>
              <TitleH2>{currentProduct.name}</TitleH2>
              <Desc>{currentProduct.description}</Desc>
              <AddButton onClick={addToCart}>Add to cart</AddButton>
              <Price>$ {currentProduct.price}</Price>
              <RemoveButton
                disabled={!cart.find((p) => p._id === currentProduct._id)}
                onClick={removeFromCart}
              >
                Remove from Cart
              </RemoveButton>
            </ContentBox>
          </Card>
          <Link to="/" style={{ color: "teal" }}>
            ← Back to Products
          </Link>
        </Container>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
